const jwt = require('jsonwebtoken') ;
// helper file to authorize session
module.exports.basicAuth = async function (req, res, next) {
    if (!req.headers.authorization ) {
        return res.status(401).json({ message: ' Missing Authorization Header' });
    }
    const token =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(token, 'base64').toString('ascii');
    jwt.verify(token, process.env.JWT_SECRET , (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        console.log(user);
        next();
    }); 
}