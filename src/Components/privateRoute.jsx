import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    console.log("estoy en redirect")
    // const{auth,setAuth,usuario,password}=useContext(MainContext)
    const { state } = useLocation()
    return state?.auth ? children : <Navigate to="/login" />
}

export default PrivateRoute;