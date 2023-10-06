import React from 'react'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { app } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Oath() {
    const navigate = useNavigate();

    const handleGoogleOAuth = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);
            // const resp = await fetch("http://localhost:1004/auth/google", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({
            //         name: result.user.displayName,
            //         email: result.user.email,
            //         photo: result.user.photoURL
            //     })
            // });

            const respAxios = await axios.post("http://localhost:1004/auth/google", JSON.stringify({
                name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL
            })).then((res) => navigate("/"))
               .catch((error) => console.log(error))
            
            //const data = await respAxios.json();
            console.log(respAxios.json())
            navigate("/");
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
      <button type="button" onClick={handleGoogleOAuth} className="oathButton">Continue with google account</button>
    </div>
  )
}
