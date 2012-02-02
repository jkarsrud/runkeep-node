var api = require(__dirname + '/lib/runkeeperapi').RunKeeperApi,
    HealthGraph = require(__dirname + '/lib/HealthGraph');

var opts = {
    clientId: '9e28e72bee7d44359f89af8e308a2abe',
    clientSecret: '2fc22946a58d441792fa92d80f48c887'

};

var client = new HealthGraph(opts);

//client.connectUser();
client.getAccessToken('b869b75486f848fe84c7b80b079d40a9', function(token) {
    console.log(token);
});