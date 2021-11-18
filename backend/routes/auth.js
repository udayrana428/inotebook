const express = require("express")
const User = require("../models/User")
const router = express.Router()
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const jwt_secret = "hello23@"
const fetchuser=require("../middleware/getuser")
const { body, validationResult } = require('express-validator');
//ROUTE.1) create a user using POST: "/api/auth/createUser" no login required
router.post('/createUser', [
  body('email', 'Enter a valid email').isEmail(),
  body('name', 'Enter a valid name').isLength({ min: 2, max: 20 }),
  body('password', 'Password must be atleast 6 characters').isLength({ min: 6, max: 20 }),
], async (req, res) => {
  // if there are errors returns bad errors and the request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {

    // check whether the user with the same email exist
    let user = await User.findOne({ email: req.body.email })
    if (user) {
      return res.status(400).json({ errors: "Sorry, a user with this user already exist." })
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(req.body.password, salt)
    // create new user
    user = await User.create({
      name: req.body.name,
      password: hash,
      email: req.body.email,
    })
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, jwt_secret);
    res.json({ authtoken })
  }
  catch (error) {
    console.error(error.message)
    res.status(500).send("some error occured!")
  }
})
//ROUTE.2) create a login endpoint using POST: "/api/auth/login" login required
router.post('/login', [
  body('email','Enter a valid email').isEmail(),
  body('password','Enter correct password').isLength({ min: 5 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {email, password} = req.body
  try {
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ errors: "Please try to login with correct credentials" })
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ errors: "Please try to login with correct credentials" })
    }
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, jwt_secret);
    res.json({authtoken})
  }
  catch (error) {
    res.status(500).send("Internal server error")
  }

})
//ROUTE.3) create a getuser endpoint using POST: "/api/auth/getuser" login required
router.post('/getuser',fetchuser,async(req,res)=>{
  try{
    userId=req.user.id
    const user=await User.findById(userId).select("-password")
    res.send(user)
  }
  catch(error){
    console.error(error.message)
    res.status(400).send("Unauthorised access")
  }
})
module.exports = router