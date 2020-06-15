const db = require('../models') ;
const utilities = require('../helpers/utilities');
const jwt = require('jsonwebtoken');
const uuid = require('uuid') ;
const { sequelize, Sequelize } = require('../models');
const { Op } = require("sequelize");


// returns array of blocked users by the user with userID as byUserID
exports.blockedBy = async ( byUserID , res ) =>{
    try{
        let rows = await db.blockedUsers.findAll({
            where :{
                blockerID : byUserID 
            },
            raw:true,
            attributes: [ 'blockedID'  ]
        });
        console.log(rows) ;
        let checker_const = uuid.v4();
        let IDs = [checker_const] ;
        for ( r in rows ){
            IDs.push(rows[r]["blockedID"]) ;
        }
        return IDs ;
    }
    catch(err){
        return err ;
    }
}

// Returns the valid users randomly
exports.randomly = async( req , res ) =>{
    try{
        let userID ;
        const token =  req.headers.authorization.split(' ')[1];
        const credentials = Buffer.from(token, 'base64').toString('ascii');
        jwt.verify(token, process.env.JWT_SECRET , (err, user) => {  
            userID = user.userID ;
        });
        const blockedUserIDs = await this.blockedBy ( userID , res ) ;
        const query = {
            order : [ [ sequelize.fn('RANDOM') ] ] ,
            where :{
                id : { [Op.notIn]: blockedUserIDs }
            },
            raw:true
        } ;
        let showUser = await db.user.findOne(query) ;
        
        return showUser ;
    }
    catch(err){
        utilities.sendError(err,res) ;
    }
}