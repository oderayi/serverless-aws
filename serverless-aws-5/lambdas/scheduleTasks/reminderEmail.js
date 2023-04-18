const AWS = require('aws-sdk');
const Responses = require('../common/API_responses');

const SES = new AWS.SES();

exports.handler = async event => {
    console.log('event', event);

    const message = `Hey Steven

Dont't forget to film next weeks serverless video.`;

    const params = {
        Destination: {
            ToAddresses: ['evets1983@gmail.com']
        },
        Message: {
            Body: {
                Text: { Data: message }
            },
            Subject: { Data: 'reminder email' }
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