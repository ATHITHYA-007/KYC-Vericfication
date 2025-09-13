import React, { useState } from 'react';
import "./App.css";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Login = () => {
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function onSubmit(e){
    e.preventDefault();
    console.log("yes")
    axios.post('http://localhost:8080/login', { 
        fullname: fullname,
        password: password
    })
  .then(function (response) {
    console.log(response);
    navigate("/filepage");
  })
  .catch(function (error) {
    console.log(error);
  })
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={onSubmit}>
        <h2>Login</h2>
        <input 
          type="text" 
          placeholder="Username" 
          value={fullname} 
          onChange={(e) => setFullname(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
