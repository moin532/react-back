import React, { useEffect } from 'react'
import  { useContext } from 'react'
import noteContext from '../context/notes/NoteContext'


const About = () =>{
//   const a = useContext(noteContext);
//   useEffect(()=>{
//     a.update()
//   })

  return (
    <div>
      this is about page
       {/* {a.state.name} and {a.state.class} */}
    </div>
  )

}
export default About
