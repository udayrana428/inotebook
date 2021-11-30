import React from 'react'

const Noteitem = (props) => {
    const { note } = props
    return (
        <div className="col-md-3">
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <i className="far fa-edit my-3 mx-3"></i>
                <i className=" my-3 mx-3 far fa-trash-alt"></i>
                {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
            </div>
        </div>
        </div>
    )
}

export default Noteitem
