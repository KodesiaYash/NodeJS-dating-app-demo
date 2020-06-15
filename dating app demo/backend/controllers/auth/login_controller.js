const db = require('../../models') ;
const sequelize = require('sequelize') ;
const jwt = require('jsonwebtoken');

const passwordHelper = require('../../helpers/password');
const utilities = require('../../helpers/utilities');

async function validate_password( plain_password , hashed_password ){
    return  await bcrypt.compare( plain_password , hashed_password ) ;
}

exports.login = async ( req , res ) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        let user = await db.user.findOne({where: {email}});
        if (!user) {
            console.log("User does not exist");
            utilities.sendNotAllowed("invalid user", res);
            return
        }
        let match_password = await passwordHelper.validate_password(password, user.dataValues.password);
          if (!match_password) {
            console.log("invalid password");
            utilities.sendNotAllowed("invalid password", res);
            return
        }
        let accessToken = jwt.sign({userID:user.id, sex: user.sex }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        utilities.sendSuccess( accessToken, res );
    }
    catch (err) {
        console.log(err);
        utilities.sendError(err,res);
    }
}