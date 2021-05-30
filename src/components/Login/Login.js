import React, {useState} from 'react';
import './Login.css';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import {useHistory} from "react-router";
import Register from "../Register/Register";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";

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
                        <TextField variant="outlined" color="primary" onChange={e => setEmail(e.target.value)}/>
                    </label>
                    <label>
                        <p>Password</p>
                        <TextField variant="outlined" color="primary" type="password" onChange={e => setPassword(e.target.value)}/>
                    </label>

                    <div>
                        <br></br>
                        <Button variant="contained" color="primary" type="submit">Submit</Button>
                    </div>
                </form>
                <br></br>
                <Button variant="contained" color="secondary" type="button" onClick={handleRegister}>Create account</Button>
            </div>}

            {register === "register" && <Register />}
        </div>

    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}