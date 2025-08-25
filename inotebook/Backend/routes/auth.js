const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { body,validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();

const JWT_SECRET ='DJISFINE';

router.post('/createUser',[
   body('name','Enter a valid name ').isLength({min:3}),
   body('email','Enter a valid email ').isEmail(),
   body('password','Enter a valid password ').isLength({min:8})
],async (req,res)=>{
   let success = false
   const errors = validationResult(req);
  if (!errors.isEmpty()) {
    success = false
    return res.status(400).json({ errors : errors.array()});
  }
  try{
      let user = await User.findOne({email: req.body.email})
      if(user){
        success = false
        return res.status(400).json({error:'Sorry user with same email already exists!'})
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password,salt);

      user = await User.create({
      name : req.body.name,
      email : req.body.email,
      password : secPass
      })
      const data ={
        user:{
          id:user.id
        }
      }
      const authtoken = jwt.sign(data,JWT_SECRET); 
      success = true
      res.json({ success,authtoken })
}
  catch(error){
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
})

router.post('/login',[
   body('email','Enter a valid email ').isEmail(),
   body('password','Enter a valid password ').exists()
],async (req,res)=>{
   let success = false
   const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors : errors.array()});
  }

  const {email,password}=req.body;
  try{
    let user = await User.findOne({email});
    if(!user){
      success = false
      return  res.status(400).json({error:'The login credentials are incorrect , check and try again '});
    }
    const PasswordCompare = await bcrypt.compare(password,user.password);
    if(!PasswordCompare){
      success = false
      return  res.status(400).json({error:'The login credentials are incorrect , check and try again '});
    }
    const data ={
        user:{
          id:user.id
        }
      }
      const authtoken = jwt.sign(data,JWT_SECRET); 
      success = true 
      res.json({  success,authtoken })

  }catch(error){
       console.error(error.message);
       res.status(500).send("Some error occured");
  }
})
  
router.post('/getuser',fetchuser,async(req,res)=>{
  try{
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  }
  catch(error){
    res.status(500).send("Internal Server Error");
  }
})

module.exports = router