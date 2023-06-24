const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//give a all the notes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });

    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
});

//add a new note using post login required
router.post('/addnote',fetchuser,
  [
    body("title", "enter pass atleast title").isLength({ min: 3 }),
    body("description", "enter valid description").isLength({ min: 5 }),
  ],

  async (req, res) => {

    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } 
    
    catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);



//updating a note route3
router.put('/updatenote/:id',fetchuser,async (req, res) => {
    const {title,description,tag} = req.body;

    //create a new note object
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag= tag};


    //find the note to updated
    let note = await Note.findByIdAndUpdate(req.params.id);
    if(!note){return res.status(404).send("not found")};

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("not allowed")
    }
    note = await Note.findByIdAndUpdate(req.params.id , {$set: newNote})
    res.json({note});

  })


  //deleteing route4
  router.delete('/deletenote/:id',fetchuser,async (req, res) => {

    //delete a new note object
    try {
    //find the note to updated
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("not found")};
  
  
    //alllow d eleteion only if user own this note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("not allowed")
    }
    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"succes":"Note has been deleted",note:note });
  } 
  catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
      
  }

  })

module.exports = router;
