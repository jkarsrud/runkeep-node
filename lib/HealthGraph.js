/* THE API ITSELF */

var OAuth = require('OAuth').OAuth2;


var HealthGraph = function (opts) {
    this.clientId = opts.clientId || null;
    this.clientSecret = opts.clientSecret || null;
    this.authorizationUrl = opts.authorizationUrl || 'apps/authorize';
    this.accessTokenUrl = opts.accessTokenUrl || 'apps/token';
    this.redirectUrl = opts.redirectUrl || null;
    this.token = opts.token || null;
    this.apiDomain = opts.apiDomain || 'api.runkeeper.com';
    this.baseSite = 'https://runkeeper.com/';

    console.log(this);


    this.oAuth = new OAuth(this.clientId,
                            this.clientSecret,
                            this.baseSite,
                            this.authorizationUrl,
                            this.accessTokenUrl);
};

HealthGraph.prototype.getOAuthAccessToken = function (authorizationCode, callback) {
    var reqParams = {
        grant_type:'authorization_code',
        code:authorizationCode,
        client_id:this.clientId,
        client_secret:this.clientSecret,
        redirect_uri:this.redirectUrl
    };

    console.log(reqParams);
    if(authorizationCode) {
        this.oAuth.getOAuthAccessToken(authorizationCode, reqParams, function(error, access_token, refresh_token) {
            if(error) callback(error);
            else callback(null, access_token, refresh_token);
        });
    }
};

exports = module.exports = HealthGraph;