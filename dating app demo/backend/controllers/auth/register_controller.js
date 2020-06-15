const db = require('../../models') ;
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const passwordHelper = require('../../helpers/password');
const utilities = require('../../helpers/utilities');



module.exports.addUser = async( req , res  ) => {
    try{    
        let name = req.body.name ;
        let email = req.body.email ;
        let sex = req.body.sex ;
        let password = req.body.password;
        let userID = uuid.v4();
        let hashed_password = await passwordHelper.hash_password( password ) ;
        let dateOfBirth = req.body.dateOfBirth ;
        await passwordHelper.validate_fields( req ) ;
        let newUser = db.user.build({name , email , password:hashed_password , sex, id:userID , dateOfBirth}) ;
        await newUser.save() ;
        // adds userID and sex for instant access to avoid DB calls as they are most frequent
        let accessToken = jwt.sign({userID:newUser.id, sex: newUser.sex } , process.env.JWT_SECRET , {
            expiresIn : "1d"
        }) ;
        let data = {
            data : newUser ,
            accessToken
        };
        utilities.sendSuccess(newUser, res);
    }catch(err){
        console.log( '401 ' + err  ) ;
        utilities.sendError(err, res);
    }
}

// {
//     "name" : "Yash" ,
//     "email" : "Simpson@oppa.com" ,
//     "password" : "ishere" ,
//     "sex" : "male" ,
//     "dateOfBirth" : "today"
// }