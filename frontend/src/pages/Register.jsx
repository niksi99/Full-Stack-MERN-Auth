import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate} from "react-router-dom";
import Oath from '../components/Oath';

export default function Register() {

  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const navigate = useNavigate();

  const RegisterHandle_ByAxios = (event) => {
    event.preventDefault();

    const data = {
      Username, Email, Password
    }

    axios.post("http://localhost:1004/auth/register", data)
         .then((res) => {
          navigate('/login');
         })
         .catch((error) => {
          console.log(error.message)
         })
  }
  return (
    <div>
      Register your accont
      <div>
        <form onSubmit={RegisterHandle_ByAxios}>
          <div>
            <label htmlFor="Username">Username: </label>
            <input type="text" required
            id="Username"
            value={Username}
            onChange={(event) => setUsername(event.target.value)}/>
          </div>
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
          <button>Register</button>
          <Oath></Oath>
        </form>
      </div>
    </div>
  )
}
