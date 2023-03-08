const users = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.Register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const found = await users.findOne({ email });
    if (found) {
      return res.status(400).send({ errors: [{ msg: "user already exist" }] });
    }
    const newUser = new users(req.body);
    //bcrypt
    const salt = 10;
    const hashpassword = bcrypt.hashSync(password, salt);
    newUser.password = hashpassword;
    //jwt
    const payload = { id: newUser._id };
    const token = jwt.sign(payload, process.env.secretorkey);
    await newUser.save();
    res.status(200).send({ msg: "registered", newUser, token });
  } catch (error) {
    res.status(500).send("could not register");
  }
};
exports.Login = async (req, res) => {
  const { email, password, id,isBanned } = req.body;
  try {
    const foundUser = await users.findOne({ email });
    if (!foundUser) {
      return res.status(400).send({ errors: [{ msg: "bad credentials , Email not found" }] });
    }
    //jwt

    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
      return res.status(400).send({ errors: [{ msg: "bad credentials , password doesn't match" }] });
    }
   /* if (isBanned=='true') {
      return res.status(400).send({ errors: [{ msg: "is banned" }] });
    } */
    const payload = { id: foundUser._id };
    const token = jwt.sign(payload, process.env.secretorkey);
    res.status(200).send({ msg: "logging with succ", foundUser, token });

    foundUser.isActivated = true;
    foundUser.lastLogin = new Date();
    await foundUser.save();
  } catch (error) {
    res.status(500).send({ msg: "couldn't logging" });
  }
};
exports.Getusers = async (req, res) => {
  try {
    const userss = await users.find();
    res.status(200).send({ msg: "list of users", userss });
  } catch (error) {
    res.status(500).send("couldn't get users");
  }
};
<<<<<<< HEAD

=======
>>>>>>> 0fcb7300e3c1db3b909abb57aab29a0f7277badf
exports.Deleteuser= async(req, res) =>{
  const { name  } = req.body;
  try
  {const deleted= await users.findByIdAndDelete(req.params.id)
<<<<<<< HEAD

  res.status(200).send({msg:"usser deleted",deleted})


  }
  catch (error) {
      res.status(500).send("couldnt delete user")

  }}
exports.Deleteuser= async(req, res) =>{

  try
  {const deleted= await users.findByIdAndDelete(req.params.id)

  res.status(200).send({msg:"usser deleted",deleted})


  }
  catch (error) {
      res.status(500).send("couldnt delete user")

=======
     
  res.status(200).send({msg:"usser deleted",deleted})
  
 
  }
  catch (error) {
      res.status(500).send("couldnt delete user")
  
  }}
exports.Deleteuser= async(req, res) =>{
  
  try
  {const deleted= await users.findByIdAndDelete(req.params.id)
     
  res.status(200).send({msg:"usser deleted",deleted})
  
 
  }
  catch (error) {
      res.status(500).send("couldnt delete user")
  
>>>>>>> 0fcb7300e3c1db3b909abb57aab29a0f7277badf
  }}
  exports.EditU=async(req, res) =>{
    try
    {const updated= await users.findByIdAndUpdate(req.params.id,{$set:req.body,},{new:true});
<<<<<<< HEAD


    res.status(200).send({msg:"user updated",updated})


    }
    catch (error) {
        res.status(200).send("couldnt update user")

=======
        
       
    res.status(200).send({msg:"user updated",updated})
    
    
    }
    catch (error) {
        res.status(200).send("couldnt update user")
    
>>>>>>> 0fcb7300e3c1db3b909abb57aab29a0f7277badf
    }}
  exports.EditUser=async(req, res) =>{
    try
      {const updated= await users.findByIdAndUpdate(req.params.id,{$set:req.body,},{new:true});
<<<<<<< HEAD


      res.status(200).send({msg:"user updated",updated})


      }
      catch (error) {
          res.status(200).send("couldnt update user")

      }}
      exports.Finduserbyid= async(req, res) =>{

        try
        {const fu= await users.findById(req.params.id)

        res.status(200).send({msg:"user found",fu})


        }
        catch (error) {
            res.status(500).send("couldnt found user")

=======
          
         
      res.status(200).send({msg:"user updated",updated})
      
      
      }
      catch (error) {
          res.status(200).send("couldnt update user")
      
      }}
      exports.Finduserbyid= async(req, res) =>{
   
        try
        {const fu= await users.findById(req.params.id)
           
        res.status(200).send({msg:"user found",fu})
        
       
        }
        catch (error) {
            res.status(500).send("couldnt found user")
        
>>>>>>> 0fcb7300e3c1db3b909abb57aab29a0f7277badf
        }}
