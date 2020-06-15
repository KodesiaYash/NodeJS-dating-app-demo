const bcrypt = require('bcrypt');
const db = require('../models') ;


// password helper file
 module.exports.hash_password = async ( password ) => {
    return await bcrypt.hash( password , 10 ) ;
}
module.exports.validate_password = async  ( plain_password, hashedPassword ) => {
    return bcrypt.compare(plain_password, hashedPassword);
}
module.exports.validate_fields = async ( req ) => {
    if ( req.body.name === "" )
        throw "Empty name " ;
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let email = req.body.email ;
    if(!re.test(email) || email === "" )
        throw "Invalid email" ;
    let searchObj = {email}
    let found_entry = await db.user.findOne({where:searchObj});
    if (found_entry) {
        console.log("Duplicate entry");
        throw "user already exists";
    }

}