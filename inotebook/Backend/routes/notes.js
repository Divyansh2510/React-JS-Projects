const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');
const { body,validationResult } = require('express-validator');


router.get('/fetchNotes',fetchuser,async (req,res)=>{
  try{
  const notes = await Notes.find({user:req.user.id});
  res.json(notes)
  }catch(error){
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
})


router.post('/addNotes',fetchuser,[
    body('title','Enter a valid name ').isLength({min:3}),
    body('description','Enter a valid password ').isLength({min:5})
],async (req,res)=>{
  try{
  const { title,description,tag } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors : errors.array()});
  }
  const notes = new Notes({
    title,description,tag , user:req.user.id
  })
  const savedNote = await notes.save()
  res.json(savedNote)
}catch(error){
    console.error(error.message);
    res.status(500).send("Internal server error");
}
})

router.put('/updatenotes/:id',fetchuser,async (req,res)=>{
    const { title,description,tag } = req.body;
  try{
   const newNote ={};
   if(title){newNote.title=title};
   if(description){newNote.description=description};
   if(tag){newNote.tag=tag};

   let notes = await Notes.findById(req.params.id);
   if(!notes){
    return res.status(404).send("Not Found")
   }

   if(notes.user.toString() !== req.user.id){
    return res.status(401).send("Not Allowed");
   }
    notes = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new: true})
    res.json({ notes });

}catch(error){
    console.error(error.message);
    res.status(500).send("Internal server error");
}
})

router.delete('/deletenotes/:id',fetchuser,async (req,res)=>{
  try{

   let notes = await Notes.findById(req.params.id);
   if(!notes){
    return res.status(404).json({ error: "Not Allowed" });
   }

   if(notes.user.toString() !== req.user.id){
     return res.status(401).json({ error: "Not Allowed" });
   }
    notes = await Notes.findByIdAndDelete(req.params.id)
    res.json({ "Success":"Note Deleted!!",notes:notes });

}catch(error){
    console.error(error.message);
    res.status(500).send("Internal server error");
}
})

module.exports = router