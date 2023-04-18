const { useHooks, logEvent, parseEvent, handleUnexpectedError} = require('lambda-hooks');

const withhooks = useHooks({
    before: [logEvent, parseEvent],
    after: [],
    onError: [handleUnexpectedError]
});

module.exports = {
    withhooks
}
