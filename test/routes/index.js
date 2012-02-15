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
    req.session.code = code;

    if (req.session.code) {
        var hg = new HealthGraph(opts);

        hg.getOAuthAccessToken(code, function (error, accessToken) {
            if (error) {
                res.send(error);
            }
            else {
                req.session.accessToken = accessToken;
                res.redirect('/user', {title:'Authenticated', accessToken:req.session.accessToken});
            }
        });
    }
    else {
        res.send("You need teh coadz!");
    }
};

exports.user = function(req, res) {
    if(req.session.accessToken) {
        opts.token = req.session.accessToken;
        console.log(opts);
        var hg = new HealthGraph(opts);
        hg.getUser(function(error, user) {
            if(error) {
                res.send(error);
            }
            else {
                res.send(user);
            }
        });
    }
    else {
        res.send("omg, no token");
    }
};