import { Link, useNavigate } from 'react-router';
import { 
    FaHome, 
    FaConciergeBell, 
    FaInfoCircle, 
    FaPhoneAlt, 
    FaUser, 
    FaCalendarAlt, 
    FaSignOutAlt, 
    FaBookOpen,
    FaUserCircle
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import useAuth from '../../../../hooks/useAuth';
import logoImg from '../../../../assets/Logo.png';
import Swal from 'sweetalert2';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const confirmed = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will be logged out from your account',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, logout',
            cancelButtonText: 'Cancel'
        });

        if (confirmed.isConfirmed) {
            try {
                await logOut();
                toast.success('Logged out successfully!');
                navigate('/');
            } catch (error) {
                toast.error('Logout failed. Please try again.');
            }
        }
    };

    const defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

    return (
        <div className='w-full bg-white sticky top-0 z-50 shadow-sm'>
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
                                    <div className="divider my-1"></div>
                                    <li><Link to="/profile" className="flex items-center gap-2"><FaUser /> Profile</Link></li>
                                    <li><Link to="/bookings" className="flex items-center gap-2"><FaBookOpen /> My Bookings</Link></li>
                                    <li>
                                        <button 
                                            onClick={handleLogout}
                                            className="flex items-center gap-2 text-red-600"
                                        >
                                            <FaSignOutAlt /> Logout
                                        </button>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>

                    <Link to="/" className="flex items-center gap-2 lg:hidden">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
                            <img className='w-full h-full object-cover' src={logoImg} alt="Logo" />
                        </div>
                        <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            StyleDecor
                        </span>
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex lg:flex-1 lg:justify-start">
                    <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary shadow-lg">
                            <img className='w-full h-full object-cover' src={logoImg} alt="StyleDecor Logo" />
                        </div>
                        <div>
                            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Smart Home
                            </span>
                            <p className="text-xs text-gray-500">Smart Home & Ceremony Decoration</p>
                        </div>
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex lg:flex-1 lg:justify-center">
                    <ul className="menu menu-horizontal gap-8 px-1">
                        <li>
                            <Link 
                                to="/" 
                                className="font-medium text-gray-700 hover:text-blue-600 hover:bg-transparent transition-colors"
                            >
                                <FaHome className="mr-2" /> Home
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/services" 
                                className="font-medium text-gray-700 hover:text-blue-600 hover:bg-transparent transition-colors"
                            >
                                <FaConciergeBell className="mr-2" /> Services
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/about" 
                                className="font-medium text-gray-700 hover:text-blue-600 hover:bg-transparent transition-colors"
                            >
                                <FaInfoCircle className="mr-2" /> About
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/contact" 
                                className="font-medium text-gray-700 hover:text-blue-600 hover:bg-transparent transition-colors"
                            >
                                <FaPhoneAlt className="mr-2" /> Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="navbar-end w-auto gap-4">
                    {user ? (
                        <>
                            <div className="hidden md:flex items-center gap-3">
                                <Link 
                                    to="/dashboard" 
                                    className="btn btn-outline btn-primary btn-sm gap-2 min-w-[120px]"
                                >
                                    <FaCalendarAlt /> Dashboard
                                </Link>
                                <Link 
                                    to="/booking" 
                                    className="btn btn-primary btn-sm gap-2 min-w-[120px]"
                                >
                                    <FaBookOpen /> Book Now
                                </Link>
                            </div>

                            <div className="flex items-center gap-2 md:hidden">
                                <Link to="/dashboard" className="btn btn-ghost btn-circle btn-sm">
                                    <FaCalendarAlt className="text-lg text-gray-600" />
                                </Link>
                                <Link to="/booking" className="btn btn-ghost btn-circle btn-sm">
                                    <FaBookOpen className="text-lg text-gray-600" />
                                </Link>
                            </div>

                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary shadow-sm">
                                        {user.photoURL ? (
                                            <img
                                                src={user.photoURL}
                                                alt={user.displayName || 'User'}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = defaultAvatar;
                                                    e.target.onerror = null;
                                                }}
                                            />
                                        ) : (
                                            <img
                                                src={defaultAvatar}
                                                alt="Default Avatar"
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                    </div>
                                </label>

                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-0 shadow-xl bg-base-100 rounded-box w-auto mt-3">
                                    <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
                                                {user.photoURL ? (
                                                    <img
                                                        src={user.photoURL}
                                                        alt={user.displayName || 'User'}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.target.src = defaultAvatar;
                                                            e.target.onerror = null;
                                                        }}
                                                    />
                                                ) : (
                                                    <img
                                                        src={defaultAvatar}
                                                        alt="Default Avatar"
                                                        className="w-full h-full object-cover"
                                                    />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-sm truncate">
                                                    {user.displayName || 'User'}
                                                </h3>
                                                <p className="text-xs text-gray-500 truncate">
                                                    {user.email}
                                                </p>
                                                <span className="badge badge-success badge-xs mt-1">
                                                    {user.emailVerified ? 'Verified' : 'Not Verified'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="py-2">
                                        <li>
                                            <Link 
                                                to="/profile" 
                                                className="flex items-center gap-3 py-3 px-4 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                                            >
                                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                    <FaUser className="text-blue-600 text-sm" />
                                                </div>
                                                <span className="font-medium text-gray-700">Profile Settings</span>
                                            </Link>
                                        </li>

                                        <li>
                                            <Link 
                                                to="/dashboard" 
                                                className="flex items-center gap-3 py-3 px-4 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                                            >
                                                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                                                    <FaCalendarAlt className="text-purple-600 text-sm" />
                                                </div>
                                                <span className="font-medium text-gray-700">Dashboard</span>
                                            </Link>
                                        </li>

                                        <li>
                                            <Link 
                                                to="/bookings" 
                                                className="flex items-center gap-3 py-3 px-4 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                                            >
                                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                                    <FaBookOpen className="text-green-600 text-sm" />
                                                </div>
                                                <span className="font-medium text-gray-700">My Bookings</span>
                                            </Link>
                                        </li>
                                    </div>
                                    <div className="p-3 border-t border-gray-200">
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center justify-center gap-2 py-2 px-4 w-full bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 text-red-600 rounded-lg transition-colors font-medium"
                                        >
                                            <FaSignOutAlt />
                                            Logout
                                        </button>
                                    </div>
                                </ul>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center gap-3">
                                <Link 
                                    to="/auth/login" 
                                    className="btn btn-outline btn-primary btn-sm min-w-[90px]"
                                >
                                    Login
                                </Link>
                        
                                <Link 
                                    to="/services" 
                                    className="btn btn-sm gap-2 min-w-[120px] hidden md:inline-flex"
                                >
                                    <FaBookOpen /> Book Now
                                </Link>
                                <div>
                                    <img className='w-10 h-10' src="https://img.icons8.com/?size=100&id=7820&format=png&color=000000" alt="" />
                                </div>
                            </div>

                            <div className="md:hidden">
                                <Link 
                                    to="/services" 
                                    className="btn btn-primary btn-circle btn-sm"
                                >
                                    <FaBookOpen className="text-lg" />
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