import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);



//get vall notes
const getNotes = async () => {
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token":
       localStorage.getItem('token')
    },

  });
  const json = await response.json()
  console.log(json);
  setNotes(json)
};







  //add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag }),
    });
    // const json = await response.json();
    // console.log(json)


    //Api call
    const note = await response.json();
    setNotes(notes.concat(note));
  }

  //dlt note
  const deleteNote = async(id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem('token')
      }

    
    });
    const json = await response.json();
    console.log(json)


    console.log("deleting note id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //eidy nnode
  const editNote = async (id, title, description, tag) => {
    //api call fetch headers
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":  localStorage.getItem('token')

      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json)

    //logic
    let newNotes= JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];

      if (element._id === id) {
       newNotes[index].title = title;
       newNotes[index].description = description;
       newNotes[index].tag = tag;
       break;
      }
    }
    setNotes(newNotes);
  }

  // const s1={
  //     "name":"Moin",
  //     "class":"5b"
  // }

  // const [state, setState] = useState(s1);

  //method to update
  // const update = ()=>{
  //     setTimeout(()=>{
  //         setState({
  //             "name":"MM",
  //             "class":"2b"
  //         })
  //     },1000);
  // }

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote,getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
