const multer = require('multer') ;
const utilities = require('../../helpers/utilities');
const db = require('../../models') ;
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

const storage = multer.diskStorage({
    destination : ( req , file , cb ) =>{
        cb(null,'uploads')
    },
    filename: (req,file,cb) =>{
        cb(null,file.fieldname) ;
    }
}) ;
// gets photo from the user after verifying its JWT

exports.ofUser = async( req , res ) => {
    try{
        const upload = multer({storage:storage}).single('photo') ;
        upload(req,res , async(err) => {
            if (err){
                utilities.sendError("Something went wrong while uploading") ;
            }else{
                console.log(req.file) ;
                let userID ;
                const token =  req.headers.authorization.split(' ')[1];
                const credentials = Buffer.from(token, 'base64').toString('ascii');
                jwt.verify(token, process.env.JWT_SECRET , (err, user) => {
                    console.log(user) ;  
                    userID = user.userID ;
                });
                let user = await db.user.findOne({where:{id:userID}}) ;
                if (!user)
                    throw "User does not exist" ;
                let newFileName = user.id + "" + req.file.fieldname ;
                let path = "/uploads/" + newFileName ;
                user.imgPath = path ;
                await user.save() ;
                utilities.sendSuccess(user,res);
            }
        }) ;
    }
    catch(err){
        utilities.sendError(err,res) ;
    }
} 