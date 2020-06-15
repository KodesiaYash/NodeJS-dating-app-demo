const db = require('../../models') ;
const utilities = require('../../helpers/utilities');
const jwt = require('jsonwebtoken');
const getJwtCred = require('../../helpers/get_jwt_credentials') ;
const uuid =
exports.byUserID = async ( req , res ) => {
    try{
        let userLikedID = req.params.likedID ;
        let userNotif = await db.likedNotif.findOne({ where:{userID:userLikedID}}) ;
        if (userNotif){
            userNotif.likedCount = userNotif.likedCount + 1 ;
            await userNotif.save() ; 
        }
        else{
            console.log('here') ;
            let newUserNotif = db.likedNotif.build({userID:userLikedID , likedCount : 1 }) ;
            await newUserNotif.save() ;
        }    
        utilities.sendSuccess(' Liked Count updated' , res ) ;
    }
    catch(err){
        utilities.sendError(err,res) ;
    }
}