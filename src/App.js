import "./App.css";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Home from "./components/Home"
import NoteState from "./context/notes/Notestate";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import React,{useState} from 'react'


function App() {
  const [alert,setalert]= useState(null);

  const showAlert = (message,type)=>{
    setalert({
      msg: message,
      type: type
    })
    setTimeout(()=>{
      setalert(null)
    }, 1000);

    
  }
  
  return (
    <>  
    <NoteState>
      <Router>
      <Navbar title="MM Enterprises"/>
      <Alert alert={alert}/>
      
      <div className="container my-3">  
      <Routes>

      <Route exact path="/about" element={<About />} />
      <Route exact path="/home" element={  <Home showAlert={showAlert}/>  } />
      <Route exact path="/login" element={  <Login showAlert={showAlert}/>  } />
      <Route exact path="/signup" element={  <Signup showAlert={showAlert}/>  } />
   
      </Routes>
      

      </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;