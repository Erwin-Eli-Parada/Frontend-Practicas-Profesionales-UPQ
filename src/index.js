import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { MainContextProvider } from "./contexts/mainContext";
import { Admin } from "./pages/admin";
import { Dashboard } from "./pages/dashboard";
import { Datos } from "./pages/datos";
import { Error404 } from "./pages/error404";
import { Login } from "./pages/login";
import { Alumno } from "./pages/alumno";
import PrivateRoute from "./Components/privateRoute";
import { Menu } from "./Components/menu";
//estilos
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <MainContextProvider>
        {/* <h1>funciona</h1> */}
        <Router>
            <Routes>
                <Route exact path="/login" element={
                    <>
                        <Login />
                    </>
                } />
                <Route exact path="/admin" element={
                    <PrivateRoute>
                        <Menu>
                            <Admin />
                        </Menu>
                    </PrivateRoute>
                } />
                <Route exact path="/datos" element={
                    <PrivateRoute>
                        <Menu>
                            <Datos />
                        </Menu>
                    </PrivateRoute>
                } />
                <Route exact path="/dashboard" element={
                    <PrivateRoute>
                        <Menu>
                            <Dashboard />
                        </Menu>
                    </PrivateRoute>
                } />
                <Route exact path="/alumno" element={
                    <PrivateRoute>
                        <Menu>
                            <Alumno />
                        </Menu>
                    </PrivateRoute>
                } />
                <Route exact path="/" element={
                    <Navigate to="/login" replace></Navigate>
                } />
                <Route path="*" element={
                    <Error404 />
                } />
            </Routes>
        </Router>
    </MainContextProvider>
);