const Responses = require('../common/API_responses');

exports.handler = async event => {
    console.log('evevnt', event);

    return Responses._200({ message: 'default' });
}