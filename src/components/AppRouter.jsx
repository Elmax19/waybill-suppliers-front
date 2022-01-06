import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {privateRoutes} from "../router/routes";
import {AuthContext} from "../context/AuthContext";
import Loader from "./UI/loader/Loader";
import Login from "../pages/Login";
import Logout from "../pages/Logout";

const AppRouter = ({setRole}) => {
    const {isAuth, isLoading} = useContext(AuthContext);

    if (isLoading) {
        return <Loader/>
    }

    return (isAuth
            ?
            <Routes>
                {
                    privateRoutes.map(route =>
                        <Route
                            element={route.element}
                            path={route.path}
                            exact={route.exact}
                            key={route.path}/>
                    )
                }
                <Route
                    element={<Logout setRole={setRole}/>}
                    path={'/logout'}
                    exact={true}
                    key={'/logout'}/>
            </Routes>
            :
            <Routes>
                <Route
                    element={<Login setRole={setRole}/>}
                    path={'/login'}
                    exact={true}
                    key={'/login'}/>
                <Route path='/*' element={<Navigate to='/login'/>}/>
            </Routes>
    );
};

export default AppRouter;