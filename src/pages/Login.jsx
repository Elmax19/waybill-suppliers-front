import React, {useContext, useState} from 'react';
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import AuthenticationService from "../API/AuthenticationService";
// import './../styles/login.css'
import getRouteByRole from "../router/routes";
import Input from "../components/UI/input/Input";
import Button from "../components/UI/button/Button";

const Login = ({setRole}) => {
    const {setIsAuth} = useContext(AuthContext);
    const routing = useNavigate()
    const [auth, setAuth] = useState({login: '', password: ''});
    const [hasLoginFailed, setHasLoginFailed] = useState(false);

    function login(e) {
        e.preventDefault();
        AuthenticationService
            .executeBasicAuthenticationService(auth.login, auth.password)
            .then(resp => {
                AuthenticationService.registerSuccessfulLogin(auth.login, auth.password, resp)
                setIsAuth(true);
                setHasLoginFailed(false);
                setRole(resp.data.role)
                routing(getRouteByRole(resp.data.role)) // change route according to role
            }).catch(() => {
            setHasLoginFailed(true)
        })
    }

    return (
        <div className="card mt-xl-5 ">
                <div className="card-body ">
                <div className="card-img">
                    <img
                        style={{width:400}}
                        src="https://thumbs.dreamstime.com/b/chat-icon-vector-illustration-dialog-text-white-background-welcome-message-bubble-170761147.jpg"
                        id="icon" alt="User Icon"/>
                </div>
                    <form>
                        {
                            hasLoginFailed && <div className="alert alert-warning" role="alert">Incorrect credentials</div>
                        }
                        <div className="row m-2 mx-lg-4">
                            <Input id="login" className="fadeIn second" value={auth.login}
                                   onChange={(e) => setAuth({...auth, login: e.target.value})}
                                   // type='text'
                                   placeholder='Login'/>
                        </div>
                        <div className="row m-2 mx-lg-4">
                            <Input id="password" className="fadeIn third" value={auth.password}
                                   onChange={(e) => setAuth({...auth, password: e.target.value})}
                                   type='password'
                                   placeholder='Password'/>
                        </div>
                        <div className="row justify-content-center mx-lg-5 mt-3">
                            <Button className="fadeIn fourth" value="Log In" onClick={login}>Log in</Button>
                        </div>
                    </form>
                </div>
        </div>
    );
};

export default Login;