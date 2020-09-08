const express = require('express')
const mysqlConnection = require('../connection')
const router = express.Router();


//Get all hotels
router.get("/",(req,res)=>{

    mysqlConnection.query("SELECT * FROM Hotel", (err,rows,fields)=>{
        if(!err)
        {
            if(rows.length==0)
            {
                res.send({message:"No such hotel available"})
                return
            }
            res.send(rows)
            console.log(rows) 
        }
        
        else{
            console.log(err)
        }
    })
    
})

//Get hotel by id
router.get("/:id",(req,res)=>{

    mysqlConnection.query("Select * FROM Hotel where Id=?",[req.params.id],(err,rows,fields)=>{

        if(!err)
        {
            if(rows.length==0)
            {
                res.send({message:"No hotels in database"})
                return
            }
            res.send(rows)
            console.log(rows)
        }
        else
        {
            console.log(err)
        }
    })
})

//Add a new hotel
router.post('/',(req,res)=>{

    var value = req.body
    console.log(value)
    
    mysqlConnection.query("Insert into Hotel values(?,?,?,?,?,?,?,?)\
    ",[value.Id,value.hotel_name,value.manager_name,value.manager_id,value.address,value.contact,value.noftables,value.status],(err,results,fields)=>{

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

//Update hotel details
router.put('/:id',(req,res)=>{

    value = req.body

    mysqlConnection.query("Update Hotel set hotel_name=?,manager_name=?,manager_id=?,address=?,contact=?,noftables=?,status=?  where\
     Id=?",[value.hotel_name,value.manager_name,value.manager_id,value.address,value.contact,value.noftables,value.status,req.params.id] , (err,results,fields)=>{

        if(!err)
        {
            if(results.affectedRows==0)
            {
                res.send({message: "Hotel with this Id not found"})
                return
            }
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

//Update hotel status only
router.put('/status/:id',(req,res)=>{

    value = req.body

    mysqlConnection.query("Update Hotel set status=?  where\
     Id=?",[value.status,req.params.id] , (err,results,fields)=>{

        if(!err)
        {
            if(results.affectedRows==0)
            {
                res.send({message: "Hotel with this Id not found"})
                return
            }
            res.send({message:"Updated the status successfully"})
            console.log(results)
        }
        else
        {
            res.send({error:err})
            console.log(err)
        }
     })

})

//Delete all hotels
router.delete('/',(req,res)=>{

    mysqlConnection.query("Delete from Hotel",(err,results,fields)=>{
        
        if(!err)
        {
            if(results.affectedRows==0)
            {
                res.send({message: "No hotels in the table"})
                return
            }
            console.log(results)
            res.send({message:"ALl Rows deleted!"})
        }
        else{

            res.send({error:err})
            console.log(err)
        }
    })

})

//Delete a hotel by id
router.delete('/:id',(req,res)=>{

    mysqlConnection.query("Delete from Hotel where Id=?",[req.params.id],(err,results,fields)=>{
        
        if(!err)
        {
            if(results.affectedRows==0)
            {
                res.send({message: "Hotel with this Id not found"})
                return
            }
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

module.exports = router