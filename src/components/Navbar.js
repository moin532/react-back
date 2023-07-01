import React from "react";
import { Link } from 'react-router-dom'
import { useLocation,useNavigate } from 'react-router-dom';
import { useEffect } from "react";



export default function Navbar(props) {
  let history = useNavigate()
  const handleLogout=()=>{
    localStorage.removeItem('token')
    history("/login")
  }

  let location = useLocation();
  useEffect(() => {
    // Google Analytics
    console.log(location.pathname)
  }, [location]);


  return (
    
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          {props.title}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/home"? "active":""}`} aria-current="page" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about"? "active":"" }`} to="/about">
                about
        
              </Link>
            </li>
          </ul>
          {!localStorage.getItem('token')?<form className="d-flex" >
          <Link class="btn btn-primary mx-1" to="/login" href="#" role="button">Login</Link>
          <Link class="btn btn-primary mx-1" to="/signup" href="#" role="button">SignUp</Link>
           
           
          </form> : <button onClick={handleLogout} className="btn btn-primary">Logout</button>}
          
        </div>
      </div>
    </nav>
  );
}
