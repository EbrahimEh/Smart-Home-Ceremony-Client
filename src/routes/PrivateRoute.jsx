import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-infinity loading-xl"></span>
            </div>
        );
    }

    if(!user){
        const redirectPath = location.pathname + location.search;
        console.log('PrivateRoute redirecting to login. From:', redirectPath);
        return <Navigate to="/" state={{ from: redirectPath }} replace />;
    }

    return children;
};

export default PrivateRoute;