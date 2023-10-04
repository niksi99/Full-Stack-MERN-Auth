import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const navigate = useNavigate();

  const LoginHandle_ByFetch = (event) => {
    event.preventDefault();

    const data = {
      Email, Password
    }

    fetch("http://localhost:1004/auth/login", {
      method: 'POST',
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(data)
    }).then(() => {
      navigate("/login");
    }).catch((error) => {
      console.log(error)
    })
  }

  const LoginHandle_ByAxios = (event) => {
    event.preventDefault();

    const data = {
      Email, Password
    }

    axios.post("http://localhost:1004/auth/login", data)
    .then((res) => {
      navigate('/profile');
    })
    .catch((error) => {
      console.log(error)
      navigate('/login');
    })
  }
  
  return (
    <div>
      Login!
      <div>
        <form onSubmit={LoginHandle_ByAxios}>
          <div>
            <label htmlFor="Email">Email: </label>
            <input type="text" required
            id="Email"
            value={Email}
            onChange={(event) => setEmail(event.target.value)}/>
          </div>
          <div>
            <label htmlFor="Password">Password: </label>
            <input type="text" required
            id="Password"
            value={Password}
            onChange={(event) => setPassword(event.target.value)}/>
          </div>
          <button>Login</button>
        </form>
      </div>
    </div>
  )
}
