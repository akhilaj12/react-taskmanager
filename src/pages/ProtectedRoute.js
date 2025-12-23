import { Navigate, Outlet }  from "react-router-dom";
import React from "react";

export default function ProtectedRoute({children}){
    const token = localStorage.getItem("token");
    if(!token || token === null || token === undefined){
        console.error("No token found");
        return <Navigate to="/" replace />;
    }

    console.log("token found - rendering protected content");
    // If used as a layout route with nested routes (new style)
    return <Outlet />;
}