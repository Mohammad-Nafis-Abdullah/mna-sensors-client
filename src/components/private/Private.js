import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { StateContext } from '../../App';

const Private = ({children}) => {
    const [state] = useContext(StateContext);
    const location = useLocation();

    if (!state.user) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default Private;