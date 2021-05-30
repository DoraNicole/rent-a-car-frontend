import React, {useState} from 'react';
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";

async function registerUser(data) {
    return fetch('http://localhost:8080/rent-a-car/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(data=>data.text())
        .then(text=>{
            alert(text)
            console.log(text)
        })
}

export default function Register() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [phone, setPhone] = useState();
    const handleSubmit = (e) => {
        e.preventDefault();
        const token = registerUser({
            email,
            password,
            firstName,
            lastName,
            phone
        });
        window.location.reload();
    }
    return(
        <div className="register-wrapper">
            <h1>Create your new account</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>First Name</p>
                    <TextField variant="outlined" color="primary" required={true} onChange={e => setFirstName(e.target.value)}/>
                </label>
                <label>
                    <p>Last Name</p>
                    <TextField variant="outlined" color="primary" required={true} onChange={e => setLastName(e.target.value)}/>
                </label>
                <label>
                    <p>Email</p>
                    <TextField variant="outlined" color="primary" required={true} onChange={e => setEmail(e.target.value)}/>
                </label>
                <label>
                    <p>Password</p>
                    <TextField variant="outlined" color="primary" type="password" required={true} onChange={e => setPassword(e.target.value)}/>
                </label>
                <label>
                    <p>Phone</p>
                    <TextField variant="outlined" color="primary" required={true} onChange={e => setPhone(e.target.value)}/>
                </label>
                <div>
                    <br></br>
                    <Button variant="contained" color="primary" type="submit">Submit</Button>
                </div>
            </form>
        </div>
    );
}