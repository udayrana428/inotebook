import Notecontext from "./notecontext";

import { React, useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const noteInitial = []
  const [notes, setnotes] = useState(noteInitial)
  // ADD NOTE
  const addNote = async (title, description, tag) => {
    // TODO: API CALL
    const response = await fetch(`${host}/api/notes/createNotes`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE5NTQ5ZGE3MWZiZWU2NGE5NzMwNDcxIn0sImlhdCI6MTYzNzQxMDg4MX0.CX8HZs5JNC_p9yfxJqJ97iU04fdR5ZSVKbZ6LkY235w'
      },
      body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
    });
      const json=await response.json(); // parses JSON response into native JavaScript objects
      console.log(json)

    //   Logic for adding Note
    console.log("Adding a note")
    const note = {
      "_id": "6198e8fb6fdc3d539268af12",
      "user": "619549da71fbee64a9730471",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2021-11-20T12:24:27.632Z",
      "__v": 0
    };
    setnotes(notes.concat(note))
  }
  // Get all NOTE
  const getAllNotes = async () => {
    // TODO: API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE5NTQ5ZGE3MWZiZWU2NGE5NzMwNDcxIn0sImlhdCI6MTYzNzQxMDg4MX0.CX8HZs5JNC_p9yfxJqJ97iU04fdR5ZSVKbZ6LkY235w'
      },
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json)
    setnotes(json)
  }
  // DELETE NOTE
  const deleteNote =async (id) => {
    // TODO: API CALL
    const response = await fetch(`${host}/api/notes/deleteNotes/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE5NTQ5ZGE3MWZiZWU2NGE5NzMwNDcxIn0sImlhdCI6MTYzNzQxMDg4MX0.CX8HZs5JNC_p9yfxJqJ97iU04fdR5ZSVKbZ6LkY235w'
      },
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json)
    // setnotes(json)

    console.log("deleted", id)
    const newNote = notes.filter((note) => { return note._id !== id })
    setnotes(newNote)
  }
  // EDIT NOTE
  const editNote = async (id, title, description, tag) => {
    // TODO API CALL
    const response = await fetch(`${host}/api/notes/updateNotes/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE5NTQ5ZGE3MWZiZWU2NGE5NzMwNDcxIn0sImlhdCI6MTYzNzQxMDg4MX0.CX8HZs5JNC_p9yfxJqJ97iU04fdR5ZSVKbZ6LkY235w'
      },
      body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
    });
    const json =await response.json(); // parses JSON response into native JavaScript objects
    console.log(json)

    let newNote=JSON.parse(JSON.stringify(notes))

    // Logic to edit
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title
        newNote[index].description = description
        newNote[index].tag = tag
        break;
      }
    }
    setnotes(newNote)
  }
  return (
    <Notecontext.Provider value={{ notes,setnotes, addNote, deleteNote, editNote, getAllNotes }}>
      {props.children}
    </Notecontext.Provider>
  )
}

export default NoteState