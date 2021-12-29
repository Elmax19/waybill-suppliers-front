import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {AuthContext} from "../../../context";
import Button from "../button/Button";

const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth')
    }

    return (
        <div className="navbar navbar-light" style={{'background-color': '#e3f2fd'}}>
            <div className="navbar-nav me-auto">
                <Link className="nav-link" to="/items">Items</Link>
            </div>
            {isAuth
                ? <Button onClick={logout}>
                    Log out
                </Button>
                : <Link className="nav-link" to="/login">
                    Log in
                </Link>
            }
        </div>
    );
};

export default Navbar;