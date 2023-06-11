const mongoose=require("mongoose")
// require("dotenv").config()
const connection=mongoose.connect("mongodb+srv://vaibhav:porwal@cluster0.tnnc1nn.mongodb.net/hello_notes?retryWrites=true&w=majority")

module.exports={
    connection
}