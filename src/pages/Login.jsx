import React, {useContext, useState} from 'react';
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import AuthenticationService from "../API/AuthenticationService";
import './../styles/login.css'

const Login = () => {
    const {setIsAuth} = useContext(AuthContext);
    const routing = useNavigate()
    const [auth, setAuth] = useState({login: '', password: ''});
    const [hasLoginFailed, setHasLoginFailed] = useState(false);

    function login(e) {
        e.preventDefault();

        AuthenticationService
            .executeBasicAuthenticationService(auth.login, auth.password)
            .then(() => {
                AuthenticationService.registerSuccessfulLogin(auth.login, auth.password)
                setIsAuth(true);
                setHasLoginFailed(false);
                // sessionStorage.setItem('customerId', '1')
                routing(`/customers`)
            }).catch(() => {
                setHasLoginFailed(true)
        })
    }

    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <div className="fadeIn first">
                    <img
                        src="https://thumbs.dreamstime.com/b/chat-icon-vector-illustration-dialog-text-white-background-welcome-message-bubble-170761147.jpg"
                        id="icon" alt="User Icon"/>
                </div>

                <form onSubmit={login}>
                    {
                        hasLoginFailed && <div className="alert alert-warning" role="alert">Incorrect credentials</div>
                    }
                    <input id="login" className="fadeIn second" value={auth.login}
                           onChange={(e) => setAuth({...auth, login: e.target.value})}
                           type='text'
                           placeholder='Введите логин'/>
                    <input id="password" className="fadeIn third" value={auth.password}
                           onChange={(e) => setAuth({...auth, password: e.target.value})}
                           type='password'
                           placeholder='Введите пароль'/>
                    <input type="submit" className="fadeIn fourth" value="Log In"/>
                </form>
            </div>
        </div>
    );
};

export default Login;