const db = require('../models') ;
const express = require('express') ;
const router = express.Router() ;
const multer = require('multer') ;
const sess_auth = require('../helpers/session_authorize') ;
const registerController = require( '../controllers/auth/register_controller.js' ) ;
const loginController = require( '../controllers/auth/login_controller.js' ) ;
const addPhotoController = require('../controllers/auth/addphoto_controller') ;

router.post('/register' ,  registerController.addUser ) ;
router.post('/add_photo' , sess_auth.basicAuth , addPhotoController.ofUser ) ;
router.post('/login' , loginController.login ) ;


module.exports = router ;
