import React, {useContext} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import Loader from "./UI/loader/Loader";
import {privateRoutes, publicRoutes} from "../router/routes";

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);

    if (isLoading) {
        return <Loader/>
    }

    return (isAuth
            ?
            <Switch>
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

            </Switch>
            :
            <Switch>
                {
                    publicRoutes.map(route =>
                        <Route
                            element={route.element}
                            path={route.path}
                            exact={route.exact}
                        />
                    )
                }
                <Route path='/*' element={<Redirect to='/login'/>}/>
            </Switch>
    );
};

export default AppRouter;