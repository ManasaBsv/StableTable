const express = require('express')
const mysqlConnection = require('../connection')
const router = express.Router();
const passport = require('passport')

//to ensure if authenticated
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the login page
	res.redirect('users/login');
}

//To get user homepage
router.get('users/homepage',isLoggedIn,(req,res)=>{

    console.log("Control reached here")

    console.log("At Dashboard")
    res.send({message:"Welcome to the Dashboard"})
})

//GET user login(control reaches here if not authenticated while accessing any other endpoint that needs authentication)
router.get('users/login',(req,res)=>{

    console.log("At login page")
    res.send({message:"You are not authenticated"})
})

//Get all users
router.get("/users",(req,res)=>{

    mysqlConnection.query("SELECT * FROM User", (err,rows,fields)=>{
        if(!err)
        {
            res.send(rows)
            console.log(rows) 
        }
        else{

            console.log(err)
        }
    })
    
})

//Get User by id
router.get("/users/:id",(req,res)=>{

    mysqlConnection.query("Select * FROM User where Id=?",[req.params.id],(err,rows,fields)=>{

        if(!err)
        {
            res.send(rows)
            console.log(rows)
        }
        else
        {
            console.log(err)
        }
    })
})


//Delete user by id
router.delete('/users/:id',(req,res)=>{

    mysqlConnection.query("Delete from User where Id=?",[req.params.id],(err,results,fields)=>{
        
        if(!err)
        {
            res.send({message: "Row deleted successfully!"})
            console.log("Row deleted successfully")
            console.log(results)
        }
        else
        {
            res.send({error:err})
            console.log(err)
        }
    })
})

//Delete all users
router.delete('/users',(req,res)=>{

    mysqlConnection.query("Delete from User",(err,results,fields)=>{
        
        if(!err)
        {
            console.log(results)
            res.send({message:"ALl Rows deleted!"})
        }
        else{

            res.send({error:err})
            console.log(err)
        }
    })

})

//Add a new user
router.post('/users',(req,res)=>{

    var value = req.body
    console.log(value)
    
    mysqlConnection.query("Insert into User values(?,?,?,?,?)",[value.Id,value.Name,value.Email,value.Password,value.Phone],(err,results,fields)=>{

        if(!err)
        {
            console.log(results)
            res.send({message:"Row Inserted!"})
        }
        else{

            res.send({error:err})
            console.log(err)
        }

    })
})

//update user 
router.put('/users/:id',(req,res)=>{

    value = req.body

    mysqlConnection.query("Update User set Name=?,Email=?,Password=?,Phone=? where\
     Id=?",[value.Name,value.Email,value.Password,value.Phone,req.params.id] , (err,results,fields)=>{

        if(!err)
        {
            res.send({message:"Updated successfully"})
            console.log(results)
        }
        else
        {
            res.send({error:err})
            console.log(err)
        }
     })

})

//POST login 
router.post('/login',passport.authenticate('local-login', {
    successRedirect : '/users/homepage',
    failureRedirect : 'users/login', 
    failureFlash : false 
}),(req,res)=>{

    console.log('Logged in')
})

//logout user
router.get('/logout', (req, res)=> {
    req.logout();
    res.send({message: "Logout succesful"})
});

module.exports = router;

