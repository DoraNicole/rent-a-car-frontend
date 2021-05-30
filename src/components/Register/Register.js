import React, {useState} from 'react';

async function registerUser(data) {
    return fetch('http://localhost:8080/rent-a-car/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(data=>data.text())
        .then(text=>console.log(text))
}

export default function Register() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [phone, setPhone] = useState();
    const handleSubmit = async e => {
        e.preventDefault();
        const token = await registerUser({
            email,
            password,
            firstName,
            lastName,
            phone
        });
    }
    return(
        <div className="register-wrapper">
            <h1>Create your new account</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>First Name</p>
                    <input type="text" required={true} onChange={e => setFirstName(e.target.value)}/>
                </label>
                <label>
                    <p>Last Name</p>
                    <input type="text" required={true} onChange={e => setLastName(e.target.value)}/>
                </label>
                <label>
                    <p>Email</p>
                    <input type="text" required={true} onChange={e => setEmail(e.target.value)}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" required={true} onChange={e => setPassword(e.target.value)}/>
                </label>
                <label>
                    <p>Phone</p>
                    <input type="text" required={true} onChange={e => setPhone(e.target.value)}/>
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}