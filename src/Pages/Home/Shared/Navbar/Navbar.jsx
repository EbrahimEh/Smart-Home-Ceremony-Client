import { Link } from 'react-router';
import { FaHome, FaConciergeBell, FaInfoCircle, FaPhoneAlt, FaUser, FaCalendarAlt } from 'react-icons/fa';
import logoImg from '../../../../assets/Logo.png'

const Navbar = () => {
    const isLoggedIn = false; 
    
    return (
        <div className="navbar bg-base-100 shadow-md sticky top-0 z-50">
            {/* Mobile menu */}
            <div className="navbar-start flex items-center">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className=" lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to="/" className="flex items-center gap-2"><FaHome /> Home</Link></li>
                        <li><Link to="/services" className="flex items-center gap-2"><FaConciergeBell /> Services</Link></li>
                        <li><Link to="/about" className="flex items-center gap-2"><FaInfoCircle /> About</Link></li>
                        <li><Link to="/contact" className="flex items-center gap-2"><FaPhoneAlt /> Contact</Link></li>
                        {isLoggedIn && <li><Link to="/dashboard" className="flex items-center gap-2"><FaCalendarAlt /> Dashboard</Link></li>}
                    </ul>
                </div>
                
                {/* Logo & Brand */}
                <Link to="/" className="text-xl flex items-center md:text-xl md:gap-1 gap-0">
                    <div className="hidden md:flex text-black md:p-2 p-0 rounded-lg">
                        {/* <FaHome /> */}
                        <img className='h-8 w-8' src={logoImg} alt="" />
                    </div>
                    <span className="gradient-text pl-2 font-bold">Smart Home</span>
                </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-1">
                    <li>
                        <Link to="/" className="font-medium hover:text-primary transition-colors flex items-center gap-2">
                            <FaHome /> Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/services" className="font-medium hover:text-primary transition-colors flex items-center gap-2">
                            <FaConciergeBell /> Services
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className="font-medium hover:text-primary transition-colors flex items-center gap-2">
                            <FaInfoCircle /> About
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" className="font-medium hover:text-primary transition-colors flex items-center gap-2">
                            <FaPhoneAlt /> Contact
                        </Link>
                    </li>
                </ul>
            </div>

            {/* User Section */}
            <div className="navbar-end gap-2">
                {isLoggedIn ? (
                    <>
                        <Link to="/dashboard" className="btn btn-secondary btn-sm md:btn-md gap-2 hidden md:flex">
                            <FaCalendarAlt /> Dashboard
                        </Link>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full bg-gradient-to-br from-primary to-secondary p-0.5">
                                    <div className="bg-white rounded-full w-full h-full flex items-center justify-center">
                                        <FaUser className="text-primary text-lg" />
                                    </div>
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li><Link to="/profile">Profile</Link></li>
                                <li><Link to="/bookings">My Bookings</Link></li>
                                <li><button className="text-error">Logout</button></li>
                            </ul>
                        </div>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="btn btn-secondary btn-sm md:btn-md">Login</Link>
                        <Link to="/register" className="btn btn-primary btn-sm md:btn-md">Register</Link>
                    </>
                )}
                
                <Link to="/booking" className="btn btn-accent btn-sm md:btn-md">
                    Book Now
                </Link>
            </div>
        </div>
    );
};

export default Navbar;