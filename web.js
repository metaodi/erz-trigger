var http = require('http');
var urlparse = require('url').parse;
var trigger = require('./trigger');

var API_TOKEN = process.env.API_TOKEN;

// simple page that acts as the OAuth endpoint
http.createServer(function(request, response) {
    var url = urlparse(request.url, true);
    if (url.query.api_token && url.query.api_token == API_TOKEN) {
        var zip = url.query.zip || null;
        trigger.triggerEvent(zip);
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('<html><head><title>Trigger successful | erz-trigger</title></head>');
        response.write('<body><h1>Successfully triggered event</h1>');
        response.end('</body></html>');
    } else {
        response.writeHead(401, {'Content-Type': 'text/html'});
        response.write('<html><head><title>Authentication failed | erz-trigger</title></head>');
        response.end('<h1>401 Not Authorized</h1></body></html>');
    }
}).listen(process.env.PORT || 5000);
