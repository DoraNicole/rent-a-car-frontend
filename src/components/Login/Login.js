import React, {useState} from 'react';
import './Login.css';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import {useHistory} from "react-router";
import Register from "../Register/Register";

async function loginUser(credentials) {
    return fetch('http://localhost:8080/rent-a-car/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

export default function Login({ setToken }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [register, setRegister] = useState();
    const [login, setLogin] = useState("login");

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            email,
            password
        });
        setToken(token);
    }
    const history = useHistory();
    function handleRegister() {
        setRegister("register");
        setLogin("");
    }

    return(
        <div className="login-wrapper">
            {login === "login" && <div>
                <h1>Please Log In</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Email</p>
                        <input type="text" onChange={e => setEmail(e.target.value)}/>
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" onChange={e => setPassword(e.target.value)}/>
                    </label>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
                <button type="button" onClick={handleRegister}>Create account</button>
            </div>}

            {register === "register" && <Register />}
        </div>

    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}