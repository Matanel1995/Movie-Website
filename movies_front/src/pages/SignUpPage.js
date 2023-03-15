import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid'
import './SignUpPage.css'

import React from 'react'

const SignUpPage = () => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [existEmail, setExistEmail] = useState("Should look like: example@mail.com");


    //Functiuons

    let navigate = useNavigate();
    const routeChange = (newPath) => {
        let path = newPath;
        navigate(path);
    }

    const createUser = async (userJson) => {
        console.log("inside create user");
        try {
            const response = await fetch("http://localhost:8080/api/auth/register"
                , {
                    method: 'POST',
                    body: userJson,
                    headers: { 'Content-Type': 'application/json', }
                });
            const data = await response.json();
            console.log(data);
            console.log(response.status);
            if (response.status === 401) {
                setExistEmail("Email address allready in use.");
            }
            else{
                setExistEmail("Should look like: example@mail.com");
                routeChange('/');
            }
            console.log(existEmail);

        } catch (err) {
            console.log(err);
        }
    }

    // const getUsers = async() => {
    //     try {
    //         const response = await fetch('http://localhost:8080/api/users/all'
    //             , {
    //                 method: 'GET',
    //                 mode: 'cors',
    //                 credentials: 'include'
    //             }
    //             );
    //         const data = await response.json();
    //         console.log(data);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }



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
                    pattern="^[A-Za-z0-9]{6,12}$"
                />
                <span>Must include only letters, must contain 6-12 chracters</span>
            </div>
            <div className="signUp-password">
                <p>Password:</p>
                <input
                    placeholder="at least 4 chracters."
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                    pattern="^[A-Za-z0-9]{4,12}$"
                />
                <span>Must contain 4-12 chracters</span>
            </div>
            <div className="signUp-email">
                <p>Email:</p>
                <input
                    placeholder="example@mail.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                    pattern="^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,})$"
                />
                    <span>{existEmail}</span>
            </div>
            <div className="buttons-container">
                <div className="confirm-button">
                    <button
                        onClick={() => {
                            const id = uuidv4();
                            const user = { id, userName, password, email };
                            console.log(user);
                            const userJson = JSON.stringify(user);
                            createUser(userJson);
                        }}>
                        SignUp!
                    </button>
                </div>
                <div className="cancel-button">
                    <button
                        onClick={() => {
                            routeChange("/");
                            console.log("cancel button")
                        }}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage