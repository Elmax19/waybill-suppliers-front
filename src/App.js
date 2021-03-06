import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/UI/navbar/Navbar";
import AppRouter from "./components/AppRouter";
import {AuthContext} from "./context/AuthContext";

function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const [role, setRole] = useState(sessionStorage.getItem('auth') !== null ? JSON.parse(sessionStorage.getItem('auth')).role : '')

    useEffect(() => {
        if (sessionStorage.getItem('auth')) {
            setIsAuth(true);
        }
        setIsLoading(false);
    }, [])

    return (
        <AuthContext.Provider value={
            {isAuth, setIsAuth, isLoading}}>
            <BrowserRouter>
                <Navbar role={role}/>
                <AppRouter setRole={setRole}/>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;