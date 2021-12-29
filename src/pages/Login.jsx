import React, {useContext} from 'react';
import Input from "../components/UI/input/Input";
import Button from "../components/UI/button/Button";
import {AuthContext} from "../context";

const Login = () => {
    const {setIsAuth} = useContext(AuthContext);

    const login = event => {
        event.preventDefault()
        const token = Buffer.from(event.target[0].value + ':' + event.target[1].value, 'utf8').toString('base64')
        localStorage.setItem('token', 'Basic ' + token)
        setIsAuth(true)
        localStorage.setItem('auth', 'true')
        localStorage.setItem('customerId', '1')
    }

    return (
        <div>
            <h1>Login Page</h1>
            <form className="mb-3" onSubmit={login}>
                <Input name="login" type="text" placeholder="login"/>
                <Input name="password" type="password" placeholder="password"/>
                <Button>Log in</Button>
            </form>
        </div>
    );
};

export default Login;