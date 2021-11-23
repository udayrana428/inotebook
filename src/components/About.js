import React, { useContext ,useEffect} from 'react'
import notecontext from '../context/notecontext'

const About = () => {
    const a=useContext(notecontext)
    useEffect(() => {
        a.update()
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            My name is {a.state.name} and my age is {a.state.age}
        </div>
    )
}

export default About
