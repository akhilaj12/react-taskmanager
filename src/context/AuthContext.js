import { createContext, useState, useContext } from "react";
import API from "../components/API";
import {toast} from "react-toastify";
import Swal from "sweetalert2";

const AuthContext = createContext();

//Provider component
export function AuthProvider({children}) {
    const [token, setToken] = useState(null || localStorage.getItem("token"));

    const login = async ({email, password}) => {
        try{
            console.log("Attempting login..." + email + password) ;
            // Use shared API instance so baseURL comes from env and headers (if any) are applied
            const response = await API.post(`/auth/login`, { email, password });
            
            console.log("Login response: ", response.data);
            const token = typeof response.data === "string" ? response.data : response.data.token;
            setToken(token);
            if(token){
                localStorage.setItem("token", token);
                 toast.success('User logged in successfully!', {
                    position: 'top-right',
                    autoClose: 3000,
                    pauseOnHover: true,
                    draggable: true,
                });
                return true;
            }
            else{
                return false;
            }            
        } catch(err){
            // Better error logging so we can see status and server message when login fails
            if (err.response) {
                // Server responded with a status outside 2xx
                console.error("Login failed:", {
                    status: err.response.status,
                    data: err.response.data,
                });
            } else if (err.request) {
                // No response received
                console.error("Login failed: no response received", err.request);
            } else {
                // Something else happened
                console.error("Login failed:", err.message);
            }
            return false;   
        }
        }
        
    const logout =() => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to logout?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#30d683ff',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout',
            }).then((result) => {
                if (result.isConfirmed) {
                    setToken(null);
                    localStorage.removeItem("token");
                    
                    toast.success('Logged out successfully!', {
                        position: 'top-right',
                        autoClose: 3000,
                        pauseOnHover: true,
                        draggable: true,
                    });
                }
});
    }


    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}