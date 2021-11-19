const express = require("express")
const Notes = require("../models/Notes")
const router = express.Router()
const fetchuser = require("../middleware/getuser")
const { body, validationResult } = require('express-validator');
//Get all the notes using GET: "/api/"
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id })
  res.json(notes)
})
// create notes using POST: "/api/users/createNotes" 
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
module.exports = router