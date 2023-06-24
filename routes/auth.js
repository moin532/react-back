const express = require("express");
const router = express.Router();
const User = require("../models/User");
const fetchuser = require("../middleware/fetchuser");
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');
const { body, validationResult } = require("express-validator");

const JWT_SECRET = 'moinisagoodb$oy';  //singging to data
//create a user using post "/api/auth/". doesnt require auth
router.post(
  "/createuser",
  [
    //   security validadtion
    body("email", "enter valid email").isEmail(),
    body("password", "enter pass atleast 4").isLength({ min: 4 }),
    body("name", "enter valid name").isLength({ min: 3 }),
  ],

  async (req, res) => {
    let success = false;
    //if there error return the bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    // check wether exist email already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success ,error: "ermail already exist" });
      }

      //using bcrypt
      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password, salt);

      // create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      //genrete web tokens
      const data = {
        user:{
          id:user.id
        }
      }
      const authtoken=jwt.sign(data, JWT_SECRET);
      
      success=true;
      res.json({success,authtoken});

      

    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
    //  !!!! .then((user) => res.json(user))
    //   .catch((err) => {console.log(err);
    //   !! res.json({error: "pls enter a unique email address"})});
    //{ <<<<<<console.log(req.body);
    // const user = User(req.body);
    // user.save();>>>>>>}
  }
);

//Route 2 :authnticate a user using post methid,no login required>>>>>>>>>///////////////////////



router.post("/login",[
    //   security validadtion
    body("email", "enter valid email").isEmail(),
    body("password", "password cannot be blamk").exists(),
    
  ],
  async (req,res)=>{
    let success = false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
   
    const {email,password} = req.body;
    try{
      let user =await User.findOne({email});
      if(!user){
        success=false;
        return res.status(400).json ({error: "pls try to login with correct credentials"})
      }

      const passscomp =await bcrypt.compare(password,user.password);
      if(!passscomp){
        success = false;
        return res.status(400).json ({success,error: "pls try to login with correct credentials"})
      }

      
      const data = {
        user:{
          id:user.id
        }
      }
      const authtoken=jwt.sign(data, JWT_SECRET);
      success = true
      res.json({authtoken,success});
    }
    catch (error){
      console.error(error.message);
      res.status(500).send("internel server ")

    }
  }
)

// router 3: get loggedin user details using : post. login required>>>>>>

router.post("/getuser", fetchuser,async(req,res)=>{


try{
  userId = req.user.id;
  const user = await User.findById(userId).select('-password')
  res.send(user);

}
catch (error){
  console.error(error.message);
  res.status(500).send("internel server ")

}
})

module.exports = router;
//instaalling bcrypt js
//jsonwebtoken
