import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import Button from "../button/Button";
import {AuthContext} from "../../../context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css'

const Navbar = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext);

    function logout() {
        setIsAuth(false)
        localStorage.removeItem('auth');
    }

    return (

        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div><span  className="navbar-brand">Waybill Suppliers</span></div>
            <ul className="navbar-nav">
                <li><Link className="nav-link" to="/customers">Customers</Link></li>
            </ul>
            <ul className="navbar-nav navbar-collapse justify-content-end">
                {isAuth
                    ? <li>
                        <Link className="nav-link" to='/logout'>Logout</Link>
                    </li>
                    :  <li>
                        <Link className="nav-link" to='/login'>Login</Link>
                    </li>
                }
                </ul>
        </nav>

    );
};

export default Navbar;