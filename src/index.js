import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { MainContextProvider } from "./contexts/mainContext";
import { Admin } from "./pages/admin";
import { Dashboard } from "./pages/dashboard";
import { Datos } from "./pages/datos";
import { Error404 } from "./pages/error404";
import { Login } from "./pages/login";

const root=ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <MainContextProvider>
        <h1>funciona</h1>
        <Router>
            <Routes>
                <Route exact path="/login" element={
                    <Login/>
                }/>
                <Route exact path="/admin" element={
                    <Admin/>
                }/>
                <Route exact path="/datos" element={
                    <Datos/>
                }/>
                <Route exact path="/dashboard" element={
                    <Dashboard/>
                }/>
                <Route path="*" element={
                    <Error404/>
                }/>
            </Routes>
        </Router>
    </MainContextProvider>
);