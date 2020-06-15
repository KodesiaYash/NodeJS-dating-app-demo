const db = require('../../models') ;
const utilities = require('../../helpers/utilities');
const jwt = require('jsonwebtoken');
const getJwtCred = require('../../helpers/get_jwt_credentials') ;
const uuid = require('uuid') ;

exports.byUserID = async ( req , res ) =>{
    try{
        let newBlockerID ;
        const token =  req.headers.authorization.split(' ')[1];
        const credentials = Buffer.from(token, 'base64').toString('ascii');
        // getting current usedID from JWT
        jwt.verify(token, process.env.JWT_SECRET , (err, user) => {
            console.log(user) ;  
            newBlockerID = user.userID ;
        });

        let newBlockedID = req.params.blockedID ;
        let blockedExist = await db.user.findOne( {where:{
            id:newBlockedID , 
        }}) ;
        if (!blockedExist)
            throw "User to be blocked does not exist anymore" ;
        let blockEntry =  await db.blockedUsers.findOne( {where:{
            blockerID : newBlockerID ,
            blockedID : newBlockedID 
        }}) ;
        if (blockEntry)
            throw "User already blocked" ;    
        let newBlockEntry = db.blockedUsers.build({
            id : uuid.v4() ,
            blockerID : newBlockerID ,
            blockedID : newBlockedID
        }) ;
        await newBlockEntry.save() ;
        utilities.sendSuccess(newBlockEntry,res) ;    
    }
    catch(err){
        utilities.sendError(err,res) ;
    }
}