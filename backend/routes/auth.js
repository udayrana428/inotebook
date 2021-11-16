const express = require("express")
const User = require("../models/User")
const router = express.Router()
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const jwt_secret = "hello23@"
const { body, validationResult } = require('express-validator');
// create a user using POST: "/api/auth/createUser" no login required
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
module.exports = router