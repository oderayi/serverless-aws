const AWS = require('aws-sdk');
const Responses = require('../common/API_responses');
const Axios = require('axios');

const SES = new AWS.SES();

const newsURL = 'https://newsapi.org';

exports.handler = async event => {
    console.log('event', event);

    const techNews = await getNews();

    const emailHTML = createEmailHTML(techNews);

    const params = {
        Destination: {
            ToAddresses: ['evets1983@gmail.com']
        },
        Message: {
            Body: {
                Html: { Data: emailHTML }
            },
            Subject: { Data: 'Morning Tech News' }
        },
        Source: 'evets1983@gmail.com',
    };

    try {
        await SES.sendEmail(params).promise();
        return Responses._200({ message: 'email sent' });
    } catch (error) {
        console.log('error', error);
        return Responses._400({ message: 'failed to send the email' });
    }
}

const createEmailHTML = techNews => {
    return `<html>
    <body>
        <h1>Top Tech News</h1>
        ${techNews.map(article => {
            return `
                <h3>${article.title}</h3>
                <p>${article.description}</p>
                <a href=${article.url}><button>Read More</button></a>
                `;
        })}
    </body>
    </html>
    `;
}

const getNews = async () => {
    const options = {
        params: {
            q: 'technology',
            language: 'en'
        },
        headers: {
            'X-Api-Key': '85cef6360ef143abafe997c2dbb56824'
        }
    }

    const { data: newsData } = await Axios.get(`${newsURL}/v2/top-headlines`, options); 
    if (!newsData) {
        throw Error('no data from the news API');
    }

    return newsData.articles.slice(0, 5);
}