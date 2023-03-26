import React from 'react'

import { useState ,useEffect } from "react";
import { useNavigate } from "react-router-dom";

import './LoginPage.css'

function LoginPage() {

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [emailErrorMsg, setEmailErrorMsg] = useState('');

    
    // useEffect(() => {
    //     getFavMovies();
    // }, []);


    //Functiuons

    let navigate = useNavigate();
    const routeChange = (newPath) => {
        let path = newPath;
        navigate(path);
    }

    //Function to login
    const LoginUser = async (userJson) => {
        console.log('inside login user function');
        const response = await fetch("http://movie-back-oghj.onrender.com/api/auth/login"
            , {
                mode: 'no-cors',
                method: 'POST',
                body: userJson,
                headers: { 'Content-Type': 'application/json', }
            });
        const data = await response.json();
        console.log(data);
        console.log(response.status);
        if (response.status === 401) {
            console.log("error in credentials.");
            setEmailErrorMsg("No user with this Email, please check your Email address");
        }
        else{
            console.log("managed to login");
            sessionStorage.setItem('userInfo', JSON.stringify(data));
            routeChange('/');
        }

    }


    return (
        <div className="Login">
            <h2>Login</h2>
            <div className="Login-email">
                <p>Email:</p>
                <input
                    placeholder="Enter you email."
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                    pattern="^[A-Za-z0-9]{6,12}$"
                />
                <span>{emailErrorMsg}</span>
            </div>
            <div className="Login-password">
                <p>Password:</p>
                <input
                    placeholder="Enter you password."
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                    pattern="^[A-Za-z0-9]{4,12}$"
                />
                {/* <span>Must contain 4-12 chracters</span> */}
            </div>
            <div className="buttons-container">
                <div className="Login-button">
                    <button
                        onClick={() => {
                            const user = { password, email };
                            console.log(user);
                            const userJson = JSON.stringify(user);
                            LoginUser(userJson);
                        }}>
                        Login!
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

export default LoginPage
