const LocalStrategy=require('passport-local').Strategy
const mysqlConnection = require('../connection')

module.exports = function(passport){


    passport.use('local-login',new LocalStrategy({ 
        usernameField: 'Email', passwordField : 'Password',passReqToCallback : true},(req,email,password,done)=>{

            mysqlConnection.query('Select * from User where Email=?',[email],(err,rows,fields)=>
            {
                if(err)
                {
                    return done(err)
                }
                if(!rows.length)
                {
                    return done(null,false,{message: "No User found"});
                }

                if(!(rows[0].Password == password))
                {
                    return done(null,false,{message: "Password Incorrect"})
                }
                    return done(null,rows[0])
            })

        }))



    passport.serializeUser(function(user, done) {
        console.log('IN seriaize')
        console.log(user)
        done(null, user.Id)
      })
    
    passport.deserializeUser(function(id, done) {
        console.log('IN deserialize')
        console.log("Id is:",id)
        mysqlConnection.query("select * from User where Id = ?",[id],(err,rows,fields)=>{

                if(err)
                {
                    console.log(err)
                }
                else{
                    console.log(rows)
                } 
                done(err,rows[0])
        })

      })

}