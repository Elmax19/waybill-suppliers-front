import React, {useContext} from 'react';
import Button from "../components/UI/button/Button";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import AuthenticationService from "../API/AuthenticationService";

const Logout = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext);
    const routing = useNavigate()

    function logout() {
        AuthenticationService.logout()
        setIsAuth(false);
        routing('/login');
    }

    return (

        <div className="wrapper fadeInDown">
            <div id="formContent">
                <div className="fadeIn first">
                    <h1 style={{marginTop: 50, marginBottom: 0}}>Logout</h1>
                    <img style={{margin: 0}} src="https://static.vecteezy.com/system/resources/previews/004/637/632/original/logout-icon-vector.jpg" id="icon" alt="User Icon"/>
                </div>
                    <input type="button" onClick={logout} className="fadeIn fourth" value="Logout"/>
            </div>
        </div>
        //
        // <div>
        //     <Button onClick={logout}>Выйти</Button>
        // </div>
    );
};

export default Logout;