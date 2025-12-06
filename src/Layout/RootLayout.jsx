import React from 'react';
import Navbar from '../Pages/Home/Shared/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Pages/Home/Shared/Footer/Footer';

const RootLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;