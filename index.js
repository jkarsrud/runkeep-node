var api = require(__dirname + '/lib/runkeeperapi').RunKeeperApi,
    connect = require('connect'),
    http = require('http'),
    HealthGraph = require(__dirname + '/lib/HealthGraph');

var opts = {
    clientId: '9e28e72bee7d44359f89af8e308a2abe',
    clientSecret: '2fc22946a58d441792fa92d80f48c887',
    redirectUrl: 'http://strengthapp.jit.su'
};

connect.createServer(function(req, res) {

});

var client = new HealthGraph(opts);



client.getOAuthAccessToken('1f6230e2beac4800b2f9653ecc99738c', function(error, auth_token, refresh_token) {
    console.log(error);
    console.log(auth_token);
    console.log(refresh_token);
});