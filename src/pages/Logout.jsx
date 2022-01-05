import React, {useContext} from 'react';
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import AuthenticationService from "../API/AuthenticationService";

const Logout = ({setRole}) => {
    const {setIsAuth} = useContext(AuthContext);
    const routing = useNavigate()

    function logout() {
        AuthenticationService.logout()
        setIsAuth(false);
        setRole('')
        routing('/login');
    }

    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <div className="fadeIn first">
                    <h1 style={{marginTop: 50, marginBottom: 0}}>Logout</h1>
                    <img style={{margin: 0}}
                         src="https://static.vecteezy.com/system/resources/previews/004/637/632/original/logout-icon-vector.jpg"
                         id="icon" alt="User Icon"/>
                </div>
                <input type="button" onClick={logout} className="fadeIn fourth" value="Logout"/>
            </div>
        </div>
    );
};

export default Logout;