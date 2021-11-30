import React from 'react'

const Alert = (props) => {
    return (
       props.alert && <div className="alert alert-danger" role="alert">
        {props.alert}
      </div>
    )
}

export default Alert
