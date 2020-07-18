var express = require('express');
var router = express.Router();
const userController = require('../controllers/users')
const middlewareUser = require('../middlewares/getUser')
const session = require('express-session');
const variables = require('../config/variables')
const multer  = require('multer')
const upload = multer({ dest: './public/uploads/' })


// For express-session usage
router.use(session({
	secret: variables.secret,
	resave: true,
	saveUninitialized: true
}));

/* GET users listing. */
router.post('/login', middlewareUser.getUser, userController.login)
router.get('/logout', userController.logout)
router.get('/upload', userController.upload)
router.post('/add', upload.single('csv'), userController.add)
router.get('/dump', userController.dump)

module.exports = router;
