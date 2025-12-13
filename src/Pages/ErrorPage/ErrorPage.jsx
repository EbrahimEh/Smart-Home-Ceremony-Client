import React from 'react';
import errorPage from '../../assets/error.jpg'

const ErrorPage = () => {
    return (
        <div>
            <img className='md:h-screen w-full' src={errorPage} alt="" />
        </div>
    );
};

export default ErrorPage;