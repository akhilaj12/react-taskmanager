import jwtDecode from "jwtDecode";

export function isTokenExpired(token) {
    try{
        const {exp} = jwtDecode(token);
        return Date.now() > exp * 1000;
    }
    catch (error) {
        console.error("Error decoding token:", error);
        return true; // Treat invalid tokens as expired
    }
}