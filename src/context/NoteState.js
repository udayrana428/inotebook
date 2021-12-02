import Notecontext from "./notecontext";

import { React, useState } from "react";

const NoteState = (props) => {
    const noteInitial = [
        {
            "_id": "6196477adab6dbe74b75af2a",
            "user": "619549da71fbee64a9730471",
            "title": "don",
            "description": "no 1",
            "tag": "star gold",
            "date": "2021-11-18T12:30:50.860Z",
            "__v": 0
        },
        {
            "_id": "6196477bdab6dbe74b75af2c",
            "user": "619549da71fbee64a9730471",
            "title": "user2",
            "description": "hello this is uday rana and you are watching me live",
            "tag": "user2",
            "date": "2021-11-18T12:30:51.040Z",
            "__v": 0
        },
        {
            "_id": "6196477bdab6dbe74b75af2e",
            "user": "619549da71fbee64a9730471",
            "title": "user2",
            "description": "hello this is uday rana and you are watching me live",
            "tag": "user2",
            "date": "2021-11-18T12:30:51.223Z",
            "__v": 0
        },
        {
            "_id": "6196477bdab6dbe74b75af30",
            "user": "619549da71fbee64a9730471",
            "title": "user2",
            "description": "hello this is uday rana and you are watching me live",
            "tag": "user2",
            "date": "2021-11-18T12:30:51.401Z",
            "__v": 0
        },
        {
            "_id": "6196477bdab6dbe74b75af32",
            "user": "619549da71fbee64a9730471",
            "title": "user2",
            "description": "hello this is uday rana and you are watching me live",
            "tag": "user2",
            "date": "2021-11-18T12:30:51.579Z",
            "__v": 0
        },
        {
            "_id": "6196477bdab6dbe74b75af34",
            "user": "619549da71fbee64a9730471",
            "title": "user2",
            "description": "hello this is uday rana and you are watching me live",
            "tag": "user2",
            "date": "2021-11-18T12:30:51.757Z",
            "__v": 0
        },
        {
            "_id": "61978a4fb4723e390f1fb3f0",
            "user": "619549da71fbee64a9730471",
            "title": "user2",
            "description": "hello this is uday rana and you are watching me live",
            "tag": "user2",
            "date": "2021-11-19T11:28:15.458Z",
            "__v": 0
        },
        {
            "_id": "61978a75b4723e390f1fb3f2",
            "user": "619549da71fbee64a9730471",
            "title": "codewithharry",
            "description": "please access the playlist",
            "tag": "youtube",
            "date": "2021-11-19T11:28:53.286Z",
            "__v": 0
        },
        {
            "_id": "61978aa6b4723e390f1fb3f4",
            "user": "619549da71fbee64a9730471",
            "title": "codewithharry2",
            "description": "please access the playlist",
            "tag": "youtube",
            "date": "2021-11-19T11:29:42.133Z",
            "__v": 0
        },
        {
            "_id": "6198e8fb6fdc3d539268af12",
            "user": "619549da71fbee64a9730471",
            "title": "codewithharry2",
            "description": "please access the playlist",
            "tag": "youtube",
            "date": "2021-11-20T12:24:27.632Z",
            "__v": 0
        }
    ]
    const [notes, setnotes] = useState(noteInitial)
    // ADD NOTE
    const addNote=(title,description,tag)=>{
        // TODO: API CALL
        console.log("Adding a note")
        const note={
            "_id": "6198e8fb6fdc3d539268af12",
            "user": "619549da71fbee64a9730471",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2021-11-20T12:24:27.632Z",
            "__v": 0
        }
        setnotes(notes.concat(note))
    }
    // DELETE NOTE
    const deleteNote=(id)=>{
        // TODO: API CALL
        console.log("deleted" , id)
        const newNote=notes.filter((note)=>{return note._id!=id})
        setnotes(newNote)
    }
    // EDIT NOTE
    const editNote=(id)=>{
        
    }
    return (
        <Notecontext.Provider value={{notes,addNote,deleteNote,editNote}}>
            {props.children}
        </Notecontext.Provider>
    )
}

export default NoteState