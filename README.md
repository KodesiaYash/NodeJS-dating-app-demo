## Available API`s 

### 1) Register API
Registers the new User and Signs the JWT <br/>
###'2) Login API'
Logs the new User and returns the JWT <br/>
###'3) Add Photo API'
After loggin in the user can add the photo<br/>
###'4) Block API'
Takes the blocker ID from JWT and the person to be blocked ID from parameters and adds the entry into a table blockedUsers<br/>
###'5) Like API'
Takes the liker ID from JWT and the person to be liked ID from parameters and adds the notification count of the parameter ID <br/>
###'6) Get Profile Card API'
It is assumed that each profile card will be visible on a page and when a user clicks next the get profile API will be fired again , it returns a random user and information after checking and not considering
the users blocked by this user from the blockedUsers table 
###'7) Various helper files present
Their code is self explanatory<br/> 

###'8) Notification Sysetm'
Socket keeps listening at the port and whenevcr a connection is established it authenticates with JWT and also extracts the userID and from the table likedNotif it sends it the total number of notifications equal to the number of people liked , then the entry is deleted from the table. This ensures that the user recieves notification whenever it comes online and no notification is lost. <br/>



