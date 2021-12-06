import {React,useContext} from 'react'
import notecontext from '../context/notecontext'

const Noteitem = (props) => {
    const context=useContext(notecontext)
    const {deleteNote}=context
    const { note,updateNote } = props
    return (
        <div className="col-md-3">
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <i className="far fa-edit my-3 mx-3" onClick={()=>{updateNote(note)}}></i>
                <i className=" my-3 mx-3 far fa-trash-alt" onClick={()=>{deleteNote(note._id)}}></i>
                {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
            </div>
        </div>
        </div>
    )
}

export default Noteitem
