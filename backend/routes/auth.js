const express=require("express")
const User = require("../models/User")
const router=express.Router()
const { body, validationResult } = require('express-validator');

router.post('/',[
  body('email','Enter a valid email').isEmail(),
  body('name','Enter a valid name').isLength({min:2,max:20}),
  body('password','Password must be atleast 6 characters').isLength({ min: 6,max:20 }),
],(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      }).then(user => res.json(user))
      .catch(err=>{console.log(err)
    res.json({error:"please enter a unique value for email"+err.name,message:err.message})})
})
module.exports=router