import { Outlet } from 'react-router';


import Navbar from '../Pages/Home/Shared/Navbar/Navbar';
import Footer from '../Pages/Home/Shared/Footer/Footer';

const RootLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default RootLayout;