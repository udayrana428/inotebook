const express = require("express")
const Notes = require("../models/Notes")
const router = express.Router()
const fetchuser = require("../middleware/getuser")
const { body, validationResult } = require('express-validator');
//ROUTE.1) Get all the notes using GET: "/api/notes/fetchallnotes"
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id })
  res.json(notes)
})
//ROUTE.2) create notes using POST: "/api/notes/createNotes" 
router.post('/createNotes',fetchuser, [
  body('title', 'Enter a valid title').isLength({ min: 2, max: 15 }),
  body('description', 'Enter a valid description').isLength({ max: 400 }),
], async (req, res) => {

  try {
    const { title, description, tag } = req.body
    // if there are errors returns bad errors and the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const notes=new Notes({
      title,description,tag,user:req.user.id
    })
    const savednote=await notes.save()
    res.json({savednote})
    // // check whether the user with the same email exist
    // let notes = await Notes.findOne({ title: req.body.title })
    // if (notes) {
    //   return res.status(400).json({ errors: "Sorry, a document with same title already exist." })
    // }
    // // create new user
    // notes = await Notes.create({
    //   title: req.body.title,
    //   description: req.body.description,
    //   tag: req.body.tag,
    // })
    // res.json({ "Nice": "nice" })
  }
  catch (error) {
    console.error(error.message)
    res.status(500).send("some error occured!")
  }

})
//ROUTE.3) updating an existing note using PUT: "/api/notes/updateNotes" 
router.put('/updateNotes/:id',fetchuser, async (req, res) => {

  try {
    const { title, description, tag } = req.body
    
    const newNote={}
    if(title){newNote.title=title}
    if(description){newNote.description=description}
    if(tag){newNote.tag=tag}

    // if user is online
    let notes=await Notes.findById(req.params.id)
    if(!notes){return res.status(400).send("Not found")}
    
    if(notes.user.toString()!==req.user.id){
      return res.status(401).send("Not allowed")
    }

    notes=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({notes})
  }
  catch (error) {
    console.error(error.message)
    res.status(500).send("some error occured!")
  }

})
//ROUTE.4) Deleting an existing note using PUT: "/api/notes/deleteNotes" 
router.delete('/deleteNotes/:id',fetchuser, async (req, res) => {

  try {
    const { title, description, tag } = req.body

    // Find the notes to be deleted
    let notes=await Notes.findById(req.params.id)
    if(!notes){return res.status(400).send("Not found")}
    
    // authenticate the user if he/she is the owner of the notes
    if(notes.user.toString()!==req.user.id){
      return res.status(401).send("Not allowed")
    }

    // Find the notes by id and delete it
    notes=await Notes.findByIdAndDelete(req.params.id)
    res.json(notes)
  }
  catch (error) {
    console.error(error.message)
    res.status(500).send("some error occured!")
  }

})
module.exports = router