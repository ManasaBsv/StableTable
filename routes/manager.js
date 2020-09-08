const express = require('express')
const mysqlConnection = require('../connection')
const router = express.Router();


//To get manager homepage
/* router.get('man/homepage',isLoggedIn,(req,res)=>{

    console.log("At Dashboard")
    res.send({message:"Welcome to the Dashboard"})
}) */

//GET manager login(control reaches here if not authenticated while accessing any other endpoint that needs authentication)
router.get('man/login',(req,res)=>{

    console.log("At Manager login page")
    res.send({message:"You are not authenticated"})
})

//Get all managers
router.get("/man",(req,res)=>{

    mysqlConnection.query("SELECT * FROM Manager", (err,rows,fields)=>{
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

//Get Manager by id
router.get("/man/:id",(req,res)=>{

    mysqlConnection.query("Select * FROM Manager where Id=?",[req.params.id],(err,rows,fields)=>{

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

//Delete manager by id
router.delete('/man/:id',(req,res)=>{

    mysqlConnection.query("Delete from Manager where Id=?",[req.params.id],(err,results,fields)=>{
        
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

//Delete all managers
router.delete('/man',(req,res)=>{

    mysqlConnection.query("Delete from Manager",(err,results,fields)=>{
        
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

//Add a new manager
router.post('/man',(req,res)=>{

    var value = req.body
    console.log(value)
    
    mysqlConnection.query("Insert into Manager values(?,?,?,?,?,?)",[value.Id,value.Name,value.Email,value.Password,value.Phone,value.HotelId],(err,results,fields)=>{

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

module.exports = router