import React, {useContext} from 'react';
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import AuthenticationService from "../API/AuthenticationService";
import Button from "../components/UI/button/Button";

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
        <div className="card" style={{marginTop:100}}>
            <div id="card-body">
                <div className="card-img">
                        <h1 className='text-center mt-3'>Logout</h1>
                        <img style={{width: 300}} className="m-0"
                             src="https://static.vecteezy.com/system/resources/previews/004/637/632/original/logout-icon-vector.jpg"
                              alt="User Icon"/>
                </div>
                <div className="container p-5">
                    <div className="row justify-content-center">
                        <Button onClick={logout} >Logout</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Logout;