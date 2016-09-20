var Request = require('request-promise');
var Moment = require('moment-timezone');
var Async = require('async');
var _ = require('underscore');


exports.triggerEvent = triggerEvent;

function triggerEvent(zip) {
    var ifttt_key = process.env.IFTTT_KEY;
    if (!ifttt_key) {
        console.error("Your IFTTT maker key must be provided via the IFTTT_KEY env variable. Find your key here: https://ifttt.com/maker");
        process.exit(1);
    }

    // queue for all the ERZ entries
    var triggerUrl = 'https://maker.ifttt.com/trigger/erz_collection/with/key/' + ifttt_key;
    var queue = Async.queue(function(entry, callback) {
        var collType = entry.type.charAt(0).toUpperCase() + entry.type.slice(1);
        var collDate = Moment.tz(entry.date, 'Europe/Zurich').format('DD.MM.YYYY');
        var place = entry.station || entry.zip;
        var payload = {
            "value1": collType,
            "value2": collDate,
            "value3": place
        }

        var makerOptions = {
            method: 'POST',
            uri: triggerUrl,
            json: true,
            body: payload
        };
        Request(makerOptions).then(callback);
    }, 2);

    queue.drain = function() {
        console.log('All entries have been processed');
    };


    //get entries from OpenERZ API
    var queryDate = Moment().tz('Europe/Zurich').add(1, 'd').format('YYYY-MM-DD');
    var erzOptions = {
        method: 'GET',
        uri: 'http://openerz.herokuapp.com/api/calendar',
        qs: {
            start: queryDate,
            end: queryDate,
            sort: 'date',
            limit: 10,
            zip: zip
        },
        json: true,
    };
    Request(erzOptions)
        .then(function (results) {
            if (results && results.result) {
                _.each(results.result, function(entry, index, list) {
                    queue.push(entry, function(err) {
                        console.log('Finished processing entry ' + (index + 1) + '/' + list.length);
                    });
                });
            } else {
                console.log("No results found");
            }
        })
        .catch(function (err) {
            console.error(err);
        });
}
