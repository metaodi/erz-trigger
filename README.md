erz-trigger
===========

This project is a small connector between the [OpenERZ API](http://openerz.herokuapp.com) and [IFTTT](https://ifttt.com).
The goal is to create push notifications for all upcoming waste collections in your ZIP code for your convenience.

On IFTTT there is a channel called "Maker", that can be used to either make web requests or receive them (web hook).

## Push notifications

## Web request

Create a new recipe with a timer as the triggering event.
This helps you to make a daily request to a given URL, basically this is a cron job.

The URL in this case is http://erz-trigger.herokuapp.com?api_key=<key>&zip=8001

This is where this application is deployed to.

## Web hook

Create a new recipe with the maker channel of IFTTT as a webhook with an event called `erz_collection`.
To receive push notifications on your phone, you need to configure a service (called "channel" in IFTTT) that enables you to do that (e.g. [Pushover](https://pushover.net/)).
Once you have that service, make sure it is connected in your IFTTT account.

Finally you can use this service as the "THEN" part, and receive notifications for the called web hooks.

## Configuration

This application needs to environment variables to work, both must be configured on the heroku instance:

* API_KEY: this adds a little safety, so that not everybody can trigger push notifcations on your phone.
* IFTTT_KEY: this is they API key for the maker channel of IFTTT, you can find yours here: https://ifttt.com/maker
