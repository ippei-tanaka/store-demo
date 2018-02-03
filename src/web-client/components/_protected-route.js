import React from "react";

import {
    Route,
    Redirect
} from "react-router-dom";

const ProtectedRoute = ({
    component: Component,
    passWhen,
    redirectTo,
    ...rest
}) => (
    <Route {...rest} render={renderComponent({Component, redirectTo, passWhen})} />
);

const renderComponent = ({
    Component,
    passWhen,
    redirectTo
}) => {
    return (props) => {
        if (passWhen)
        {
            return (
                <Component {...props}/>
            );
        } else {
            return (
                <Redirect to={{
                    pathname: redirectTo,
                    state: {from: props.location}
                }}/>
            );
        }
    };
};

export default ProtectedRoute;