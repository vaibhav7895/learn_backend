const express=require("express")
const notesRouter=express.Router()
const {NotesModel}=require("../models/notes.model")
const {auth}=require("../middlewares/auth.middleware")
notesRouter.use(auth)
notesRouter.post("/create",async(req,res)=>{
    try{
     const note=new NotesModel(req.body)
     await note.save()
     res.json({message:"note created",note:req.body})
    }catch(err){
     res.json({message:err.message})
    }
})

notesRouter.get("/",async(req,res)=>{
    
    try{
       const notes=await NotesModel.find({userID:req.body.userID})
       res.send(notes)
    }catch(err){
        res.json({message:"not found"})
    }
})

notesRouter.patch("/update/:id",async(req,res)=>{
    const userIDinUserDoc=req.body.userID
    const noteID=req.params.id
    
    try{
        const note=await NotesModel.findOne({_id:noteID})
        const userIDinNoteDoc=note.userID
        console.log(note)
        if(userIDinUserDoc===userIDinNoteDoc){
            console.log(userIDinUserDoc,"user",userIDinNoteDoc)
            await NotesModel.findByIdAndUpdate({_id:noteID},req.body)
            res.json({message:`${note.title} has been updated`})
        }else{
            res.json({message:"unauthorized"})
        }

    }catch(err){
        res.json({message:err.message})
    }
})

notesRouter.delete("/delete/:id",async(req,res)=>{
    const userIDinUserDoc=req.body.userID
    const noteID=req.params.id
    
    try{
        const note=await NotesModel.findOne({_id:noteID})
        const userIDinNoteDoc=note.userID
        console.log(note)
        if(userIDinUserDoc===userIDinNoteDoc){
            console.log(userIDinUserDoc,"user",userIDinNoteDoc)
            await NotesModel.findByIdAndDelete({_id:noteID},req.body)
            res.json({message:`${note.title} has been deleted`})
        }else{
            res.json({message:"unauthorized"})
        }

    }catch(err){
        res.json({message:err.message})
    }
})

module.exports={
    notesRouter
}