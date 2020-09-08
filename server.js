const express = require('express');
const mysqlConnection = require('./connection');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user')
const managerRouter = require('./routes/manager')
const tableRouter = require('./routes/table')
const hotelRouter = require('./routes/hotel')


//auth imports
const session = require('express-session')
const passport = require('passport')
const initializePassport = require('./config/passport')
initializePassport(passport)


const app = express();

//maintain this order of app.use() 1. cookie , 2. session , 3.passport , 4.routes
app.use(bodyParser.json());

//cookie-parser
app.use(require('cookie-parser')());

// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  )


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use(userRouter);
app.use(managerRouter);
app.use(tableRouter);
app.use('/hotels',hotelRouter)

app.listen(3000,()=>{
    console.log("Listening on port 3000");
});