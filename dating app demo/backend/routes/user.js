const db = require('../models') ;
const express = require('express') ;
const router = express.Router() ;
const sess_auth = require('../helpers/session_authorize') ;
const blockUserController = require('../controllers/user/block_user' ) ;
const likedUserController = require('../controllers/user/like_user' ) ;
const getProfileCardController = require('../controllers/user/get_profile_card.') ;

// user action routers after session authentication
router.post('/block/:blockedID' , sess_auth.basicAuth , blockUserController.byUserID ) ;
router.post('/like/:likedID' , sess_auth.basicAuth , likedUserController.byUserID ) ;
router.get('/getProfileCard' , sess_auth.basicAuth , getProfileCardController.ofNonBlockedUser ) ;
// router.get('/test' , sess_auth.basicAuth , async (req,res) => {
//     let blocklist = await db.blockedUsers.findAll() ;
//     res.send(blocklist) ;
// })
module.exports = router ;

