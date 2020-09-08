const mysql = require('mysql')

var mysqlConnection = mysql.createConnection({
    host : "localhost",
    user : 'root',
    password : 'password',
    database : 'stabletable',
    multipleStatements: true
})

mysqlConnection.connect((error)=>{

    if(!error)
    {
        console.log("Connection established")
    }
    else
    {
        console.log("Connection Failed")
    }
})

module.exports = mysqlConnection;