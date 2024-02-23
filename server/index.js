import express from "express"
import mysql from "mysql"
import cors from "cors"


const app=express()
app.use(express.json())
app.use(cors())

const db=mysql.createConnection({
    host:"bhd3wiuhdycwupzxy8zj-mysql.services.clever-cloud.com",
    user:"ufwjujr9vslbyhzy",
    password:"PHrJOcBEvcDBQQyCW8gy",
    database:"bhd3wiuhdycwupzxy8zj"
})


app.get("/books",(req,res)=>{
    const q="select * from books"
    db.query(q,(data,err)=>{
        if(err) return res.json(err)
        // console.log(data)
        return res.json(data)
    })
})

app.post("/add",(req,res)=>{
    // console.log("back")
    const q="insert into books (name,author,subject,date) VALUE (?)"
    const values=[req.body.name,req.body.author,req.body.subject,req.body.date]
    console.log(req.body)
    if(values[0]===""||values[1]===""||values[2]===""||values[3]==="") return res.json("0");
    db.query(q,[values],(err,data)=>{
        if(err) return res.json("err")
        return res.json("Added")
    })
})
app.listen(5500,()=>{
    console.log("Server started!")
 })