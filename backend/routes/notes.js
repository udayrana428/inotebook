const express = require("express")
const Notes=require("../models/Notes")
const router = express.Router()
const { body, validationResult } = require('express-validator');
// create notes using POST: "/api/users/createNotes" 
router.post('/createNotes', [
    body('title', 'Enter a valid title').isLength({min:2,max:15}),
    body('description', 'Enter a valid description').isLength({  max: 400 }),
], async(req, res) => {
    // if there are errors returns bad errors and the request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try{

    // check whether the user with the same email exist
    let notes = await Notes.findOne({ title: req.body.title })
    if (notes) {
      return res.status(400).json({ errors: "Sorry, a document with same title already exist." })
    }
    // create new user
    notes = await Notes.create({
      title: req.body.title,
      description: req.body.description,
      tag: req.body.tag,
    })
  
      // .then(user => res.json(user))
      // .catch(err => {
      //   console.log(err)
      //   res.json({ error: "please enter a unique value for email" + err.name, message: err.message })
      // })
      res.json({"Nice":"nice"})
  }
  catch(error){
    console.error(error.message)
    res.status(500).send("some error occured!")
  }
    
})
module.exports = router