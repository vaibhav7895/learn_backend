const mongoose=require("mongoose")

const notesSchema=mongoose.Schema({
    title:String,
    body:String,
    user:String,
    userID:String,
    category:String,
},{
    versionKey:false
})

const NotesModel=mongoose.model("note",notesSchema)

module.exports={
    NotesModel
}