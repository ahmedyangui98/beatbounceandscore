const chapters = require("../model/chapter");

exports.Getchapters = async (req, res) => {
    try {
      const chapterss = await chapters.find();
      res.status(200).send({ msg: "list of chapters", chapterss });
    } catch (error) {
      res.status(500).send("couldn't get chapters");
    }
  };
  
  exports.Deletechapter= async(req, res) =>{
    const { name  } = req.body;
    try
    {const deleted= await chapters.findByIdAndDelete(req.params.id)
       
    res.status(200).send({msg:"chapter deleted",deleted})
    
   
    }
    catch (error) {
        res.status(500).send("couldnt delete chapter")
    
    }}
  exports.Deletechapters= async(req, res) =>{
    
    try
    {const deleted= await chapters.findByIdAndDelete(req.params.id)
       
    res.status(200).send({msg:"chapter deleted",deleted})
    
   
    }
    catch (error) {
        res.status(500).send("couldnt delete chapters")
    
    }}
    exports.EditCh=async(req, res) =>{
      try
      {const updated= await chapters.findByIdAndUpdate(req.params.id,{$set:req.body,},{new:true});
          
         
      res.status(200).send({msg:"chapter updated",updated})
      
      
      }
      catch (error) {
          res.status(200).send("couldnt update chapter")
      
      }}
    exports.Editchapters=async(req, res) =>{
      try
        {const updated= await chapters.findByIdAndUpdate(req.params.id,{$set:req.body,},{new:true});
            
           
        res.status(200).send({msg:"chapter updated",updated})
        
        
        }
        catch (error) {
            res.status(200).send("couldnt update chapter")
        
        }}
        exports.Findchaptersbyid= async(req, res) =>{
     
          try
          {const fch= await chapters.findById(req.params.id)
             
          res.status(200).send({msg:"chapter found",fch})
          
         
          }
          catch (error) {
              res.status(500).send("couldnt found chapter")
          
          }}
          exports.Addchapters = async (req, res) => {
            try {
              const chapterss = new chapters(req.body);
              await chapterss.save();
              res.status(200).send({ msg: "chapter added", chapterss });
            } catch (error) {
              res.status(500).send({ msg: "chapter cannot be added", error });
            }
          }