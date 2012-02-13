
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.authenticate = function(req, res) {
    res.render('authenticate', {title: 'Authenticate'});
};