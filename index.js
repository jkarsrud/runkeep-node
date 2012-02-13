var HealthGraph = require(__dirname + '/lib/HealthGraph');

var opts = {
    clientId: '9e28e72bee7d44359f89af8e308a2abe',
    clientSecret: '2fc22946a58d441792fa92d80f48c887',
    redirectUrl: 'http://strengthapp.jit.su/authComplete'
};

var client = new HealthGraph(opts);

client.getOAuthAccessToken('e29c349ffde641ce94f319eb9b9b3e05', function(error, auth_token, refresh_token) {
    console.log(error);
    console.log(auth_token);
    console.log(refresh_token);
});
