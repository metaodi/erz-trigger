var Request = require('request-promise');
var secret = require('./ifttt_maker_credentials');

var triggerUrl = 'https://maker.ifttt.com/trigger/erz_collection/with/key/' + secret['key'];


var payload = {
    "value1": "Textile",
    "value2" : "21.09.2016",
    "value3" : "8038"
}

var options = {
    method: 'POST',
    uri: triggerUrl,
    form: payload
};

Request(options)
    .then(function (body) {
        console.log(body);
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
