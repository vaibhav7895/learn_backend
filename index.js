const express=require("express")
const app = express()
const {connection}=require("./db")
const {userRouter}=require("./routes/user.routes")
const {notesRouter}=require("./routes/notes.routes")
const cors=require("cors")
require("dotenv").config()
app.use(cors())
app.use(express.json())
app.use("/users",userRouter)
app.use("/notes",notesRouter)
app.listen(process.env.port,async()=>{
    try{
       await connection
       console.log("connected to Db")
       console.log(`server is running at port ${process.env.port}`)
    }catch(err){
        console.log(err)
        console.log("connection failed")
    }
    console.log("server is running")
})