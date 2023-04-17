const courses = require("../model/courses");

exports.Getcourses = async (req, res) => {
    try {
      const coursess = await courses.find();
      res.status(200).send({ msg: "list of courses", coursess });
    } catch (error) {
      res.status(500).send("couldn't get courses");
    }
  };
  

  exports.Deletecourses= async(req, res) =>{
    
    try
    {const deleted= await courses.findByIdAndDelete(req.params.id)
       
    res.status(200).send({msg:"course deleted",deleted})
    
   
    }
    catch (error) {
        res.status(500).send("couldnt delete courses")
    
    }}
    exports.EditC=async(req, res) =>{
      try
      {const updated= await courses.findByIdAndUpdate(req.params.id,{$set:req.body,},{new:true});
          
         
      res.status(200).send({msg:"courses updated",updated})
      
      
      }
      catch (error) {
          res.status(200).send("couldnt update courses")
      
      }}
    exports.Editcourses=async(req, res) =>{
      try
        {const updated= await courses.findByIdAndUpdate(req.params.id,{$set:req.body,},{new:true});
            
           
        res.status(200).send({msg:"courses updated",updated})
        
        
        }
        catch (error) {
            res.status(200).send("couldnt update courses")
        
        }}
        exports.Findcoursesbyid= async(req, res) =>{
     
          try
          {const fc= await courses.findById(req.params.id)
             
          res.status(200).send({msg:"courses found",fc})
          
         
          }
          catch (error) {
              res.status(500).send("couldnt found courses")
          
          }}
          exports.Addcourses = async (req, res) => {
            try {
              const coursess = new courses(req.body);
              await coursess.save();
              res.status(200).send({ msg: "Course added", coursess });
            } catch (error) {
              res.status(500).send({ msg: "Course cannot be added", error });
            }
          }
    
  