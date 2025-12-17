import { useEffect, useState } from 'react';
import  { useAuth } from '../context/AuthContext';
import {useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';
import "./cssStyling/AuthStyling.css";
    
export default function LoginForm(){
    const { login } = useAuth();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const { token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate('/tasks');
        }
    }, [token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login({ email, password });
        if(success){

        }
        else{
            toast.error('Invalid credentials, try again!', {
                                position: 'top-right',
                                autoClose: 3000,
                                pauseOnHover: true,
                                draggable: true,
                            });
        }
    }

    return(
        <div className="d-flex justify-content-center align-items-center vh-100 auth-bg">
            <div className="card p-4 auth-card">
                <h3 className="text-center mb-4 auth-title">Login</h3>                
                <form>
                    <div className="mb-3">
                        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control auth-input" placeholder="Username" />
                    </div>
                    <div className="mb-3">
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control auth-input" placeholder="Password" />
                    </div>
                    <button type="submit" onClick={handleSubmit} className="btn auth-btn w-100">Login</button>
                </form>

                <p className="text-center mt-3"><i>
                Don't have an account? </i><a href="/signup">Register</a>
                </p>
            </div>
        </div>
    );
}