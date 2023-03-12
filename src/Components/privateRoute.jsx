import React from "react";
import { Navigate } from "react-router-dom";

let auth = null;

auth = true;

const PrivateRoute = ({children}) =>{
    return auth?children:<Navigate to="/login"/>
}

export default PrivateRoute;