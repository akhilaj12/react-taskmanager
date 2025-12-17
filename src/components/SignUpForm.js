import { useState } from "react";
import API from './API';

export default function SignUpForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSignUp() {
        // Handle sign up logic here using shared API (uses REACT_APP_API_URL)
        API.post(`/signup`, { firstName, lastName, email, password })
            .then(response => {
                console.log("User signed up:", response.data);
            })
            .catch(error => {
                console.error("There was an error signing up:", error);
            });
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4 shadow bg-pink" style={{ width: '400px' }}>
                <h3 className="text-center mb-4">Signup</h3>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="form-control mb-3" placeholder="First Name" />
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="form-control mb-3" placeholder="Last Name" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control mb-3" placeholder="Email" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control mb-3" placeholder="Password" />
                <button type="submit" onClick={handleSignUp} className="btn btn-primary w-100">Sign Up</button>
                <p className="text-center mt-3">User already? Login here! <a href="/login">Login</a></p>
            </div>
        </div>
    );
}