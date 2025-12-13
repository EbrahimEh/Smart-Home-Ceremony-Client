import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import { BallTriangle } from 'react-loader-spinner';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <BallTriangle
                    height={100}
                    width={100}
                    radius={5}
                    color="#4fa94d"
                    ariaLabel="ball-triangle-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>
        );
    }

    if (!user) {
        const redirectPath = location.pathname + location.search;
        console.log('PrivateRoute redirecting to login. From:', redirectPath);
        return <Navigate to="/" state={{ from: redirectPath }} replace />;
    }

    return children;
};

export default PrivateRoute;