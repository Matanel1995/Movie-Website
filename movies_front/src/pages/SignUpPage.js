import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SignUpPage.css'

import React from 'react'

const SignUpPage = () => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');


    //Functiuons

    let navigate = useNavigate(); 
    const routeChange = (newPath) =>{ 
      let path = newPath; 
      navigate(path);
    }



    // const createUser = async () => {
    //     //check valid inputs username and password
    //     //check if email exist in DB allready
    //     //    if yes - return error msg that say email allready exist
    //     //    else - create new user in db with the provided information
    // }


    return (
        <div className="SignUp">
            <h2>SignUp</h2>
            <div className="signUp-userName">
                <p>User Name:</p>
                <input
                    placeholder="Must start with a letter"
                    value={userName}
                    onChange={(e) => { setUserName(e.target.value) }}
                />
            </div>
            <div className="signUp-password">
                <p>Password:</p>
                <input
                    placeholder="at least 4 chracters."
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                />
            </div>
            <div className="signUp-email">
                <p>Email:</p>
                <input
                    placeholder="example@mail.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                />
            </div>
            <div className="buttons-container">
                <div className="confirm-button">
                    <button
                        onClick={() => { console.log(userName) }}>
                        SignUp!
                    </button>
                </div>
                <div className="cancel-button">
                    <button
                        onClick={() => { 
                            routeChange("/");
                            console.log("cancel button") }}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage