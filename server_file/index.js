//const express = require('express')
//const app = express()

//app.get('/', (req, res) => {
  //  res.send('this course sucks? yes');
//})

//app.listen(3001, () => {
  //  console.log("running on port 3001")
//})

const express = require("express")
const app = express()
const mysql = require("mysql")
const bodyParser = require("body-parser")
const cors = require("cors")
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use(express.json())
const db = mysql.createPool({
    host: "34.132.145.100",
    user: "root",
    password: "anti996",
    database: 'workshop3_tables'
})
app.post("/api/insert", (req, res)=> {
    const UserName = req.body.UserName
    const UserPassword = req.body.UserPassword
    const sqlInsert = "INSERT INTO userinfo Values (?,?)"
    db.query(sqlInsert, [UserName, UserPassword], (err, result) => {
        console.log(res)
    })
})
app.get("/api/get", (req, res)=> {
    const UserName = req.body.UserName
    const UserPassword = req.body.UserPassword
    const sqlSelect = "Select * from userinfo"
    db.query(sqlSelect, [UserName, UserPassword], (err, result) => {
        res.send(result)
    })
})

app.delete("/api/delete/:userName", (req, res)=> {
    const userName = req.params.userName
    const sqlDelete = "DELETE FROM userinfo WHERE UserName = ?"
    db.query(sqlDelete, userName, (err,result) => {
        if(err) console.log(err)
    })
})

app.put("/api/update", (req, res)=> {
    const userName = req.body.UserName
    const passWord = req.body.UserPassword
    const sqlUpdate = "UPDATE userinfo SET UserPassword = ? WHERE UserName = ?"
    db.query(sqlUpdate, [passWord, userName], (err,result) => {
        if(err) console.log(err)
    })
})

app.listen(3001, ()=>{
    console.log("running on port")
})