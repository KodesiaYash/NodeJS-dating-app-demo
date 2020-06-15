const express = require('express') ;
const cors = require('cors');
require('dotenv').config() ;
var io = require('socket.io')();
var jwt = require('jsonwebtoken');
const uuid =  require('uuid') ;
const app = express() ;
const db = require('./models') ;


const port = process.env.PORT || 5000 ;

app.use(cors()) ;
app.use(express.json()) ;


// connecting ORM

db.sequelize.sync({force:false}).then( () =>{
  console.log('Database works fine') ;
}).catch( (err) =>{
  console.log('Error' + err ) ;
}) ;

// import routers
let authRouter = require('./routes/auth') ;
let userRouter = require('./routes/user') ;
app.use('/auth' , authRouter ) ;
app.use('/user' , userRouter ) ;

app.listen(port,() => 
    {console.log(`Server is running on port : ${port}`)}) ;

// for push notifications when user logs in  
io.use( (socket,next)=> {
  console.log('Incoming connection') ;
  // verify if the incoming connection is an authentic user via JWT
  if ( socket.handshake.query && socket.handshake.query.token){
    const token =  socket.handshake.query.token; 
    const credentials = Buffer.from(token, 'base64').toString('ascii');
    console.error(credentials) ;
    jwt.verify(token, process.env.JWT_SECRET , (err, user) => {
        if (err) {
          next( new Error ('Authentication Error' ) ) ;
        }
        console.log(user);
        next();
    }); 
  }
  else{
    next( new Error ('Authentication Error' ) ) ;
  }}).on('connection' , socket =>{
      console.log('User Connected') ;
      try{
        let userID  ;
        const token =  socket.handshake.query.token; 
        const credentials = Buffer.from(token, 'base64').toString('ascii');
        // Get User ID from JWT to whom notifications needs to be pushed
        jwt.verify(token, process.env.JWT_SECRET , (err, user) => {
          userID = user.userID ;
        }); 
        // take out the number of notifications to be pushed for various users
        let sendNotif = db.likedNotif.findByPk(userID) ;
        if ( sendNotif ){
          for ( i = 0 ; i < sendNotif.likedCount ; i++ ){
            socket.emit('Someone like your profile') ;
          }
          let del =  db.likedNotif.destroy({where : {userID:sendNotif.userID}}) ;
        }
      }
      catch(err){
        console.log(err) ;
      }
  }) ;