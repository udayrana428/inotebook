import {React,useContext} from 'react'
import notecontext from '../context/notecontext'
import AddNote from './AddNote'
import Noteitem from './Noteitem'
const Notes = () => {
    const context=useContext(notecontext)
    const {notes,addNote}=context
    return (
        <>
        <AddNote/>
        <div className="container">
        <div className="row my-3">
            <h2>Your notes</h2>
                {notes.map((note)=>{
                    return <Noteitem key={note.id} note={note}/> 
                })}
        </div>
        </div>
        </>
    )
}

export default Notes
