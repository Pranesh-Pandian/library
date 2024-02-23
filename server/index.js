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
        return res.json(data)
    })
})

app.get("/likebooks",(req,res)=>{
    const q="select * from books where fav=1"
    db.query(q,(data,err)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/add",(req,res)=>{
    const q="insert into books (name,author,subject,date) VALUE (?)"
    const values=[req.body.name,req.body.author,req.body.subject,req.body.date]
    console.log(req.body)
    if(values[0]==="") return res.json("0")
    else if(values[1]==="") return res.json("1")
    else if(values[2]==="") return res.json("2")
    else if(values[3]==="") return res.json("3")
    db.query(q,[values],(err,data)=>{
        if(err){console.log(err) 
            return res.json("err")}
        return res.json("Added")
    })
})

app.put("/like/:id",(req,res)=>{
    var x=-1
    if(req.body[0]===1) x=0
    else x=1
    const q=`UPDATE books SET fav = ${x} WHERE id = ?`
    const values=[req.params.id]
    db.query(q,values,(err,data)=>{
        if(err){
            console.log(err)
            return res.json(err)
        }
        return res.json(data)
    })
})

app.put("/boro/:id",(req,res)=>{
    var t=-1
    if(req.body[0]===0) t=1
    else t=0
    const q=`UPDATE books SET borrow = ${t}, ret = ${req.body[0]} WHERE id = ?`
    const values=[req.params.id]
    console.log(q+values)
    db.query(q,[values],(err,data)=>{
        if(err){
            console.log(err)
            return res.json(err)
        }
        return res.json(data)
    })

})

app.listen(5500,()=>{
    console.log("Server started!")
 })