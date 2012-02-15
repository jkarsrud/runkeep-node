
/* The API Object that contains all the important things for the API, like the Feeds' Media Types and request URLS */

var RunKeeperApi = {
    userFeed: {
        mediaType:'application/vnd.com.runkeeper.User+json',
        url: '/user'
    },
    strengthFeed: {
        mediaType:'application/vnd.com.runkeeper.StrengthTrainingActivityFeed+json',
        url: '/strengthTrainingActivities'
    }
};

exports = module.exports = RunKeeperApi;