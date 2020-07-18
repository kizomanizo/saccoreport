const User = require('../models').User;

exports.getUser = async function(req, res, next) {
    const username = req.body.username ? req.body.username : req.params.username
    try {
        // user = await User.findById(id)
        user = await User.findOne({ where: { username: username } });
        if (user == null) {
            return res.status(404).render('users/error', {error: 'User not found'});
      }
    }   catch(err){
            return res.status(500).render('users/error', {error: {message: 'Internal server error'}});
    }
    res.user = user
    next()
}