import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import { 
    FaHome, 
    FaCalendarAlt, 
    FaCreditCard, 
    FaUser, 
    FaSignOutAlt,
    FaBars,
    FaTimes,
    FaCog,
    FaBell
} from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const UserDashboard = () => {
    const { user, logOut } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarOpen && isMobile) {
                const sidebar = document.getElementById('dashboard-sidebar');
                const toggleButton = document.getElementById('sidebar-toggle');
                
                if (sidebar && toggleButton && 
                    !sidebar.contains(event.target) && 
                    !toggleButton.contains(event.target)) {
                    setSidebarOpen(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [sidebarOpen, isMobile]);


    const menuItems = [
        { path: '/dashboard', icon: <FaHome />, label: 'Dashboard', exact: true },
        { path: '/dashboard/my-bookings', icon: <FaCalendarAlt />, label: 'My Bookings' },
        { path: '/dashboard/payment-history', icon: <FaCreditCard />, label: 'Payment History' },
        { path: '/dashboard/profile', icon: <FaUser />, label: 'My Profile' },
        { path: '/dashboard/settings', icon: <FaCog />, label: 'Settings' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">

            <div className="flex">
         
                <div 
                    id="dashboard-sidebar"
                    className={`
                        fixed lg:static inset-y-0 left-0 z-40
                        w-64 bg-white shadow-lg transform
                        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                        lg:translate-x-0 transition-transform duration-300 ease-in-out
                        h-screen lg:h-auto overflow-y-auto
                        flex-shrink-0
                    `}
                >
          
                    <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
                        <div className="flex flex-col items-center space-y-4">
                          
                            <div className="relative">
                                {user?.photoURL ? (
                                    <img 
                                        src={user.photoURL} 
                                        alt={user.displayName || 'User'}
                                        className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                                    />
                                ) : (
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-3xl shadow-lg">
                                        {user?.displayName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                                    </div>
                                )}
                                <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                            </div>
                
                            <div className="text-center">
                                <h2 className="font-bold text-gray-800 text-lg">
                                    {user?.displayName || 'User'}
                                </h2>
                                <p className="text-sm text-gray-600 truncate max-w-full">
                                    {user?.email}
                                </p>
                                <div className="mt-2">
                                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                        Premium Member
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <nav className="p-4">
                        <div className="mb-6">
                            <h3 className="text-xs uppercase text-gray-500 font-semibold tracking-wider mb-3 px-3">
                                Main Menu
                            </h3>
                            <ul className="space-y-1">
                                {menuItems.map((item) => {
                                    const isActive = item.exact 
                                        ? location.pathname === item.path
                                        : location.pathname.startsWith(item.path);
                                    
                                    return (
                                        <li key={item.path}>
                                            <Link
                                                to={item.path}
                                                onClick={() => isMobile && setSidebarOpen(false)}
                                                className={`
                                                    flex items-center space-x-3 px-4 py-3 rounded-xl
                                                    transition-all duration-200
                                                    ${isActive 
                                                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md' 
                                                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                                    }
                                                `}
                                            >
                                                <span className={`text-lg ${isActive ? 'text-white' : 'text-gray-500'}`}>
                                                    {item.icon}
                                                </span>
                                                <span className="font-medium">{item.label}</span>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        <div className="border-t border-gray-200 my-4"></div>
                    </nav>

                    <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
                        <div className="text-center">
                            <p className="text-xs text-gray-500">
                                © {new Date().getFullYear()} Smart Home
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                Version 1.0.0
                            </p>
                        </div>
                    </div>
                </div>

                {sidebarOpen && isMobile && (
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                <div className="flex-1 min-w-0">
                    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </div>
            </div>

            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
                <div className="flex justify-around items-center h-16">
                    {menuItems.slice(0, 3).map((item) => {
                        const isActive = item.exact 
                            ? location.pathname === item.path
                            : location.pathname.startsWith(item.path);
                        
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`
                                    flex flex-col items-center justify-center p-2
                                    ${isActive ? 'text-blue-600' : 'text-gray-500'}
                                `}
                            >
                                <span className="text-lg">{item.icon}</span>
                                <span className="text-xs mt-1">{item.label}</span>
                            </Link>
                        );
                    })}
                    
                    <Link
                        to="/dashboard/profile"
                        className="flex flex-col items-center justify-center p-2"
                    >
                        {user?.photoURL ? (
                            <img 
                                src={user.photoURL} 
                                alt="Profile"
                                className="w-6 h-6 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs">
                                {user?.displayName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                        )}
                        <span className="text-xs mt-1">Profile</span>
                    </Link>
                </div>
            </div>

            <div className="lg:hidden pb-16"></div>
        </div>
    );
};

export default UserDashboard;