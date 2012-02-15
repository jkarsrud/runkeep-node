/*
 * GET home page.
 */

var underscore = require('underscore'),
    HealthGraph = require('../../lib/HealthGraph');

var opts = {
    clientId:'9e28e72bee7d44359f89af8e308a2abe',
    clientSecret:'2fc22946a58d441792fa92d80f48c887',
    authorizationUrl:'https://runkeeper.com/apps/authorize',
    accessTokenUrl:'https://runkeeper.com/apps/token',
    redirectUrl:'http://localhost:3000/authcallback'
};

exports.index = function (req, res) {
    var params = {
        client_id:opts.clientId,
        response_type:'code',
        redirect_uri:opts.redirectUrl
    };

    var body = underscore.map(params,
        function (val, key) {
            return key + "=" + val;
        }).join('&');

    var authLink = opts.authorizationUrl + '?' + body;

    res.render('index', { title:'Express', authLink:authLink});
};

exports.authcallback = function (req, res) {
    var code = req.query.code;
    var hg = new HealthGraph(opts);

    hg.getOAuthAccessToken(code, function (error, accessToken, refreshToken) {
        if (error) {
            res.send(error);
        }
        else {
            req.session.accessToken = accessToken;
            req.session.refreshToken = refreshToken;

            res.render('callback', {title:'Authenticated', accessToken:req.session.accessToken, refreshToken: req.session.refreshToken});
        }
    });
};