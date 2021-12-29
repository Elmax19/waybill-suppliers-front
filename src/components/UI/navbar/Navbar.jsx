import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import Button from "../button/Button";
import {AuthContext} from "../../../context";

const Navbar = () => {
    const {setIsAuth} = useContext(AuthContext);

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth')
    }

    return (
        <div className="navbar">
            <Button onClick={logout}>
                Log out
            </Button>
            <div className="navbar__links">
                <Link to="/items">Items</Link>
            </div>
        </div>
    );
};

export default Navbar;