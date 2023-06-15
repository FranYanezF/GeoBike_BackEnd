require('dotenv').config()
const express = require('express')
const app = express()
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const cors = require('cors')


app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.post("/api/usuario/insert",(req,res) =>{
    const userName = req.body.userName
    const isadmin = req.body.isadmin = "true" ? true:false
    const password = req.body.password
    const email = req.body.email
    const db = mysql.createConnection(process.env.DATABASE_URL)
    const sqlInsert="insert into USUARIO (NOMBRE_USUARIO,IS_ADMIN,PASSWORD,EMAIL_USUARIO) values (?,?,?,?) "
    db.query(sqlInsert,[userName,isadmin,password,email],(err,result) => {
        console.log(err);
        console.log(result)
    })
    db.end()
})

app.get("/api/usuario",(req,res) =>{
    const db = mysql.createConnection(process.env.DATABASE_URL)
    const sqlInsert="select ID_USUARIO , NOMBRE_USUARIO,IS_ADMIN ,EMAIL_USUARIO from USUARIO"
    db.query(sqlInsert,(err,result) => {
        console.log(err);
        console.log(result);
        console.log("datos consultados")
        res.send(result)
    })
    db.end()
})

app.listen('3001',() => {
    console.log("estamos en el puerto 3001 del backend")
});