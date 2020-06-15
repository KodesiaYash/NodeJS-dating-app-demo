const jwt = require('jsonwebtoken');
const utilities = require('../helpers/utilities');

exports.userID = ( req  ) => {
    const token =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(token, 'base64').toString('ascii');
    console.log(credentials) ;
    jwt.verify(token, process.env.JWT_SECRET , (err, user) => {
        console.log(user) ;  
        return user ;
    });
}

exports.sex = async ( req , res ) => {
    const token =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(token, 'base64').toString('ascii');
    console.log(credentials) ;
    jwt.verify(token, process.env.JWT_SECRET , (err, user) => {
        if(err){
            console.log('There was an error in getting the user sex from JWT') ;
            utilities.sendError(err, res);
        }    
        return user.agencyID ;
    });
}

exports.allFields = async ( req , res ) => {
    const token =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(token, 'base64').toString('ascii');
    console.log(credentials) ;
    jwt.verify(token, process.env.JWT_SECRET , (err, user) => {
        if(err){
            console.log('There was an error processing the JWT') ;
            utilities.sendError(err, res);
        }    
        return user ;
    });
}