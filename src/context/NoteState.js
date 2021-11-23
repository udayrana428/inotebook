import Notecontext from "./notecontext";

import {React,useState} from "react";

const NoteState=(props)=>{
    const s1={
        "name":'harry',
        "age":12
    }
    const [state, setstate] = useState(s1)
    const update=()=>{
        setTimeout(() => {
            setstate({"name":"Pankaj","age":34})
        }, 2000);
    }
    return (
        <Notecontext.Provider value={{state,update}}>
            {props.children}
        </Notecontext.Provider>
    )
}

export default NoteState