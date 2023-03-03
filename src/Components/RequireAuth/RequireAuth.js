import { getAuth } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import app from '../../firebase.init';
const auth = getAuth(app);

const RequireAuth = ({ children }) => {
    const [user, loading, error] = useAuthState(auth);
    const location = useLocation();
    if (!user) {
        return <Navigate to="/signin" state={{ from: location }}
            replace />
    }
    return children;
};

export default `RequireAuth`;