/* THE API ITSELF */

var request = require('request'),
    underscore = require('underscore'),
    api = require('./runkeeperapi');

var HealthGraph = function (opts) {
    this.clientId = opts.clientId || null;
    this.clientSecret = opts.clientSecret || null;
    this.authorizationUrl = opts.authorizationUrl || 'apps/authorize';
    this.accessTokenUrl = opts.accessTokenUrl || 'apps/token';
    this.redirectUrl = opts.redirectUrl || null;
    this.token = opts.token || null;
    this.apiDomain = opts.apiDomain || 'api.runkeeper.com';
};

HealthGraph.prototype.getOAuthAccessToken = function (authorizationCode, callback) {

    var reqParams = {
        grant_type:'authorization_code',
        code:authorizationCode,
        client_id:this.clientId,
        client_secret:this.clientSecret,
        redirect_uri:this.redirectUrl
    };

    var params = underscore.map(reqParams,
        function (val, key) {
            return key + '=' + val;
        }).join('&');

    var req = {
        method:"POST",
        headers:{'content-type':'application/x-www-form-urlencoded'},
        uri:this.accessTokenUrl,
        body:params
    };

    if (authorizationCode) {
        request(req, function (error, response, body) {
            callback(error, JSON.parse(body)['access_token']);
        });
    }
};

HealthGraph.prototype.getUser = function(callback) {

    var req = {
        method: api.userFeed.method || 'GET',
        headers: {
            'Accept': api.userFeed.mediaType,
            'Authorization': 'Bearer ' + this.token
        },
        uri: 'https://' + this.apiDomain + api.userFeed.url
    };

    console.log(req);

    request(req, function(error, resp, body) {
        if(error)
            callback(error);
        else
            callback(null, body);
    });
};

exports = module.exports = HealthGraph;