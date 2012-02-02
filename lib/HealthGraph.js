/* THE API ITSELF */

var underscore = require('underscore')._,
    req = require('request');

var HealthGraph = function (opts) {
    this.clientId = opts.clientId || null;
    this.clientSecret = opts.clientSecret || null;
    this.authorizationUrl = opts.authorizationUrl || 'https://runkeeper.com/apps/authorize';
    this.accessTokenUrl = opts.accessTokenUrl || 'https://runkeeper.com/apps/token';
    this.redirectUrl = opts.redirectUrl || 'http://strenghtapp.jit.su';
    this.token = opts.token || null;
    this.apiDomain = opts.apiDomain || 'api.runkeeper.com';
};

HealthGraph.prototype.connectUser = function () {
    var reqParams = {
        client_id:this.clientId,
        response_type:'code',
        redirect_uri:this.redirectUrl
    };

    var reqBody = underscore.map(reqParams,
        function (val, key) {
            return key + "=" + val;
        }).join('&');

    var reqDetails = {
        method:'GET',
        uri:this.authorizationUrl + '?' + reqBody
    };

    console.log('\nRequest details:\nmethod: ' + reqDetails['method'] + '\nuri: ' + reqDetails['uri'] + '\nbody: ' + reqBody + '\n\n\n');

    req(reqDetails,
        function (error, response, body) {
            console.log(reqDetails['method'] + " " + reqDetails['uri'] + "\n");
            console.log("ERROR\n" + error);
            console.log("RESPONSE\n" + response);
            console.log("BODY\n" + body);
            console.log(JSON.parse(body));
//            callback(JSON.parse(body)['access_token']);
        });
};

HealthGraph.prototype.getAccessToken = function (authorizationCode, callback) {
    var reqParams = {
        grant_type:'authorization_code',
        code:authorizationCode,
        client_id:this.clientId,
        client_secret:this.clientSecret,
        redirect_url:this.redirectUrl
    };

    var reqBody = underscore.map(reqParams,
        function (val, key) {
            return key + "=" + val;
        }).join('&');

    var reqDetails = {
        method:'POST',
        headers:{'content-type':'application/x-www-form-encoded'},
        uri:this.accessTokenUrl,
        body:reqBody
    };

    console.log('\nRequest details:\nmethod: ' + reqDetails['method'] + '\nuri: ' + reqDetails['uri'] + '\nbody: ' + reqBody + '\n\n\n');

    req(reqDetails,
        function (error, response, body) {
            console.log(reqDetails['method'] + " " + reqDetails['uri'] + "\n");
            console.log("ERROR\n" + error);
            console.log("RESPONSE\n" + response);
            console.log("BODY\n" + body);
            callback(JSON.parse(body)['access_token']);
        });
};

exports = module.exports = HealthGraph;