import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {AuthContext} from "../../../context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css'

const Navbar = () => {
    const {isAuth} = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div><span  className="navbar-brand">Waybill Suppliers</span></div>
            <ul className="navbar-nav">
                <li><Link className="nav-link" to="/customers">Customers</Link></li>
                <li><Link className="nav-link" to="/users">Users</Link></li>
                <li><Link className="nav-link" to="/items">Customer Items</Link></li>
                <li><Link className="nav-link" to="/warehouseItems">Items in Warehouse</Link></li>
            </ul>
            <ul className="navbar-nav navbar-collapse justify-content-end">
                {isAuth
                    ?
                    <>
                        <li>
                            <Link className="nav-link" to='/profile'>Profile</Link>
                        </li>
                        <li>
                            <Link className="nav-link" to='/logout'>Logout</Link>
                        </li>
                    </>
                    :  <li>
                        <Link className="nav-link" to='/login'>Login</Link>
                    </li>
                }
                </ul>
        </nav>
    );
};

export default Navbar;