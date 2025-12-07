import { Link } from 'react-router';
import { FaHome, FaConciergeBell, FaInfoCircle, FaPhoneAlt, FaUser, FaCalendarAlt, FaSignOutAlt, FaBookOpen } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAuth from '../../../../hooks/useAuth';
import logoImg from '../../../../assets/Logo.png'

const Navbar = () => {
    const { user, logOut } = useAuth();

    const handleLogout = async () => {
        try {
            await logOut();
            Swal.fire({
                icon: 'success',
                title: 'Logged Out',
                text: 'You have been logged out successfully',
                timer: 1500
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Logout Failed',
                text: error.message,
            });
        }
    };

    return (
        <div className='w-full bg-white sticky top-0 z-50 '>
            <div className="navbar bg-base-100 md:px-4 max-w-[1600px] mx-auto">

                <div className="navbar-start md:w-auto w-full">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><Link to="/" className="flex items-center gap-2"><FaHome /> Home</Link></li>
                            <li><Link to="/services" className="flex items-center gap-2"><FaConciergeBell /> Services</Link></li>
                            <li><Link to="/about" className="flex items-center gap-2"><FaInfoCircle /> About</Link></li>
                            <li><Link to="/contact" className="flex items-center gap-2"><FaPhoneAlt /> Contact</Link></li>
                            {user && (
                                <>
                                    <li><Link to="/dashboard" className="flex items-center gap-2"><FaCalendarAlt /> Dashboard</Link></li>
                                    <li><Link to="/booking" className="flex items-center gap-2"><FaBookOpen /> Book Now</Link></li>
                                </>
                            )}
                        </ul>
                    </div>

                    <Link to="/" className="flex items-center gap-2 lg:hidden">
                        <div className=" text-white p-2 rounded-lg">
                            <FaHome />
                        </div>
                        <span className="gradient-text font-bold text-lg">Smart Home</span>
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex lg:flex-1 lg:justify-start">
                    <Link to="/" className="flex items-center gap-2">
                        <div className=" text-white p-2 rounded-lg">
                            <img className='rounded-full w-10 h-10' src={logoImg} alt="" />
                        </div>
                        <span className="gradient-text font-bold text-xl">Smart Home</span>
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex lg:flex-1 lg:justify-start">
                    <ul className="menu menu-horizontal gap-6 px-1">
                        <li><Link to="/" className="font-semibold text-gray-700 hover:text-primary hover:bg-transparent">Home</Link></li>
                        <li><Link to="/services" className="font-semibold text-gray-700 hover:text-primary hover:bg-transparent">Services</Link></li>
                        <li><Link to="/about" className="font-semibold text-gray-700 hover:text-primary hover:bg-transparent">About</Link></li>
                        <li><Link to="/contact" className="font-semibold text-gray-700 hover:text-primary hover:bg-transparent">Contact</Link></li>
                    </ul>
                </div>

                <div className="navbar-end w-auto gap-3">
                    {user ? (
                        <>

                            <div className="hidden md:flex items-center gap-3">
                                <Link to="/dashboard" className="btn btn-secondary btn-sm gap-2 min-w-[100px]">
                                    <FaCalendarAlt /> Dashboard
                                </Link>
                                <Link to="/booking" className="btn btn-accent btn-sm gap-2 min-w-[100px]">
                                    <FaBookOpen /> Book Now
                                </Link>
                            </div>


                            <div className="flex items-center gap-2 md:hidden">
                                <Link to="/dashboard" className="btn btn-ghost btn-circle btn-sm">
                                    <FaCalendarAlt className="text-lg" />
                                </Link>
                                <Link to="/booking" className="btn btn-ghost btn-circle btn-sm">
                                    <FaBookOpen className="text-lg" />
                                </Link>
                            </div>


                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    {user.photoURL ? (
                                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
                                            <img
                                                src={user.photoURL}
                                                alt={user.displayName || 'User'}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                                            <FaUser className="text-white text-xl" />
                                        </div>
                                    )}
                                </label>


                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-0 shadow-xl bg-base-100 rounded-box w-auto mt-3">
                                    {/* User Info Header */}
                                    <div className="p-4 border-b border-base-300 bg-gradient-to-r from-primary/5 to-secondary/5">
                                        <div className="flex items-center gap-3">
                                            {user.photoURL ? (
                                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
                                                    <img
                                                        src={user.photoURL}
                                                        alt={user.displayName || 'User'}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                                                    <FaUser className="text-white text-lg" />
                                                </div>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-sm truncate">{user.displayName || 'User'}</h3>
                                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Menu Items */}
                                    <li className="border-b border-base-200 last:border-b-0">
                                        <Link to="/profile" className="flex items-center gap-3 py-3 px-4 hover:bg-base-200 active:bg-base-300">
                                            <div className="bg-primary/10 p-2 rounded-lg">
                                                <FaUser className="text-primary text-sm" />
                                            </div>
                                            <span className="font-medium">Profile</span>
                                        </Link>
                                    </li>

                                    <li className="border-b border-base-200 last:border-b-0">
                                        <Link to="/dashboard" className="flex items-center gap-3 py-3 px-4 hover:bg-base-200 active:bg-base-300">
                                            <div className="bg-secondary/10 p-2 rounded-lg">
                                                <FaCalendarAlt className="text-secondary text-sm" />
                                            </div>
                                            <span className="font-medium">Dashboard</span>
                                        </Link>
                                    </li>

                                    <li className="border-b border-base-200 last:border-b-0">
                                        <Link to="/bookings" className="flex items-center gap-3 py-3 px-4 hover:bg-base-200 active:bg-base-300">
                                            <div className="bg-accent/10 p-2 rounded-lg">
                                                <FaBookOpen className="text-accent text-sm" />
                                            </div>
                                            <span className="font-medium">My Bookings</span>
                                        </Link>
                                    </li>

                                    {/* Logout */}
                                    <li className="mt-2">
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center gap-3 py-3 px-4 w-full text-left hover:bg-error/10 active:bg-error/20 text-error"
                                        >
                                            <div className="bg-error/10 p-2 rounded-lg">
                                                <FaSignOutAlt className="text-error text-sm" />
                                            </div>
                                            <span className="font-medium">Logout</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Not Logged In */}
                            <div className="flex items-center gap-3">
                                <Link to="/login" className="btn btn-secondary btn-sm min-w-[80px]">Login</Link>
                                <Link to="/register" className="btn btn-primary btn-sm min-w-[90px]">Register</Link>
                                <Link to="/booking" className="btn btn-accent btn-sm gap-2 min-w-[110px]">
                                    <FaBookOpen /> Book Now
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;