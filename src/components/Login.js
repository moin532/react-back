import React, { useState } from "react"; //rafc
import {useNavigate } from "react-router-dom";


const Login = (props) => {
    const [credentials, setcredentials] = useState({email:"", password:""});
    let history = useNavigate();
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              
            },
            body: JSON.stringify({ email:credentials.email, password:credentials.password }),
          });
          const json = await response.json()
          console.log(json)     
          
          if (json.success){
            //redirect
            localStorage.setItem('token', json.authtoken);
            history("/");
            props.showAlert("Succesfully signed up", "success")


          }else{
            props.showAlert("invalid details", "danger")
          }
    }

    const onChange = (e) => {
        setcredentials({...credentials, [e.target.name]: e.target.value });
        //spread operatot ,   {add or override}
      };
  return (
    <div className="my-3">
      <h2>Login to continue my noteBook</h2>
      <form onSubmit={handleSubmit}>
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
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
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
