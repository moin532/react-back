import React, { useState } from "react"; //rafc
import {useNavigate } from "react-router-dom";


const Login = (props) => {
    const [credentials, setcredentials] = useState({name:"",email:"", password:""});
    let history = useNavigate();
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
        
            },
            body: JSON.stringify({ name:credentials.name,email:credentials.email, password:credentials.password }),
          });
          const json = await response.json()
          console.log(json)     
          
          if (json.success){
            //redirect
            localStorage.setItem('token', json.authtoken);
            history("/home");
            props.showAlert("Succesfully signed up", "success")

          }else{
            props.showAlert("invalid credentials", "danger")
          }
    }

    const onChange = (e) => {
        setcredentials({...credentials, [e.target.name]: e.target.value });
        //spread operatot ,   {add or override}
      };
  return (
    <div className="container my-3">
      <h2>Create an account use my Notebook</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">
            enter name
          </label>
          <input
            type="name"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            value={credentials.name}
            onChange={onChange}

          />
      
        </div>
        
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={onChange}

          />
      
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
     
        <button type="submit" className="btn btn-primary" >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;