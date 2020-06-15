const db = require('../../models') ;
const utilities = require('../../helpers/utilities');
const jwt = require('jsonwebtoken');
const getJwtCred = require('../../helpers/get_jwt_credentials') ;
const uuid = require('uuid') ;
const getValidUser = require('../../helpers/get_valid_user') ;

// gets the profile card and link to the image which can be stored on s3 instance in production
exports.ofNonBlockedUser = async (req,res) =>{
    try{
        let validUser = await getValidUser.randomly(req,res) ;
        console.log(validUser) ;
        utilities.sendSuccess(validUser,res) ;
    }
    catch(err){
        utilities.sendError(err,res) ;
    }
}