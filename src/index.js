import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import { MainContextProvider } from "./contexts/mainContext";
import { Admin } from "./pages/admin";
import { Dashboard } from "./pages/dashboard";
import { Datos } from "./pages/datos";
import { Error404 } from "./pages/error404";
import { Login } from "./pages/login";
import PrivateRoute from "./Components/privateRoute";

const root=ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <MainContextProvider>
        {/* <h1>funciona</h1> */}
        <Router>
            <Routes>
                <Route exact path="/login" element={
                    <>
                        <Login/>
                    </>
                }/>
                <Route exact path="/admin" element={
                    <PrivateRoute>
                        <Admin/>
                    </PrivateRoute>
                }/>
                <Route exact path="/datos" element={
                    <PrivateRoute>
                    <Datos/>
                </PrivateRoute>
                }/>
                <Route exact path="/dashboard" element={
                    <PrivateRoute>
                        <Dashboard/>
                    </PrivateRoute>
                }/>
                <Route exact path="/" element={
                    <Navigate to="/login" replace></Navigate>
                }/>
                <Route path="*" element={
                    <Error404/>
                }/>
            </Routes>
        </Router>
    </MainContextProvider>
);