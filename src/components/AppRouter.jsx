import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router/routes";
import {AuthContext} from "../context/AuthContext";
import Loader from "./UI/loader/Loader";

const AppRouter = () => {
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
                            key={route.path}
                        />
                    )
                }

            </Routes>
            :
            <Routes>
                {
                    publicRoutes.map(route =>
                        <Route
                            element={route.element}
                            path={route.path}
                            exact={route.exact}
                        />
                    )
                }
                <Route path='/*' element={<Navigate to='/login'/>}/>
            </Routes>
    );
};

export default AppRouter;