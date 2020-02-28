import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import {AuthContext} from "./context/Auth"; 

interface PrivateRouteProps {
    component: any,
    [others: string]: any,
}

function PrivateRoute({component: RouteComponent, ...rest}: PrivateRouteProps): JSX.Element {
    
    const { currentUser } = useContext(AuthContext);

    return (
        <Route {...rest} render={(routeProps) => 
            !!currentUser 
            ? (
                <RouteComponent {...routeProps} />
            )
            : (
                <Redirect to={"/guest"} />
            )
        } />
    )
}

export { 
    PrivateRoute,
}