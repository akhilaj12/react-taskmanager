import { useNavigate } from "react-router-dom";

export default function AuthPrompt() {
    const navigate = useNavigate();
    
    return (
        <>
            <p className="text-center mt-5">
                Login or signup to manage your tasks efficiently.
            </p>
            <p className="text-center mt-5">
                Click below to login or sign up!
            </p>
            <div className="d-flex justify-content-center">
                <button 
                    className="btn btn-outline-primary rounded-pill mx-1" 
                    onClick={() => navigate('/login')}
                >
                    Login
                </button>
                <button 
                    className="btn btn-outline-primary rounded-pill mx-1" 
                    onClick={() => navigate('/signup')}
                >
                    Sign Up
                </button>
            </div>
        </>
    );
}
