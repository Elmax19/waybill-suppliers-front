import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {AuthContext} from "../../../context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css'

const Navbar = ({role}) => {
    const {isAuth} = useContext(AuthContext);
    const [navLinks, setNavLinks] = useState();

    useEffect(() => {
        setNavLinks(getNavLinks())
    }, [role])

    const getNavLinks = () => {
        switch (role) {
            case 'ROLE_SYSTEM_ADMIN':
                return <ul className="navbar-nav">
                    <li><Link className="nav-link" to="/customers">Customers</Link></li>
                    {/*<li><Link className="nav-link" to="/users">Users</Link></li>*/}
                </ul>
            case 'ROLE_DISPATCHER':
                return <ul className="navbar-nav">
                    <li><Link className="nav-link" to="/items">Customer Items</Link></li>
                    <li><Link className="nav-link" to="/warehouseItems">Items in Warehouse</Link></li>
                    <li><Link className="nav-link" to="/warehouseApplications">Applications</Link></li>
                </ul>
            case 'ROLE_LOGISTICS_SPECIALIST':
                return <ul className="navbar-nav">
                    <li><Link className="nav-link" to="/customerApplications">Applications</Link></li>
                </ul>
            case 'ROLE_ADMIN' :
                return <ul className="navbar-nav">
                    <li><Link className="nav-link" to="/users">Users</Link></li>
                    <li><Link className="nav-link" to="/warehouses">Warehouses</Link></li>
                    <li><Link className="nav-link" to="/customerCars">Cars</Link></li>
                </ul>
        }
    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div><span className="navbar-brand">Waybill Suppliers</span></div>
            {navLinks}
            <ul className="navbar-nav navbar-collapse justify-content-end">
                {isAuth
                    ?
                    <>
                        {
                            role !== 'ROLE_SYSTEM_ADMIN' && role !== 'ROLE_ADMIN' ?
                                <li>
                                    <Link className="nav-link" to='/profile'>Profile</Link>
                                </li>
                                : <></>
                        }
                        <li>
                            <Link className="nav-link" to='/logout'>Logout</Link>
                        </li>
                    </>
                    : <li>
                        <Link className="nav-link" to='/login'>Login</Link>
                    </li>
                }
            </ul>
        </nav>
    );
};

export default Navbar;