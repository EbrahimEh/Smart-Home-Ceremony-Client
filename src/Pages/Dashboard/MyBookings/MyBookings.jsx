import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { 
    FaCalendar, 
    FaMapMarkerAlt, 
    FaMoneyBillWave, 
    FaClock,
    FaEye,
    FaFileInvoiceDollar,
    FaSearch
} from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';

const MyBookings = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (user) {
            fetchBookings();
        }
    }, [user]);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:3000/api/bookings/user/${user.uid}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch bookings');
            }
            
            const result = await response.json();
            
            if (result.success) {
                setBookings(result.data);
            } else {
                throw new Error(result.error || 'Failed to load bookings');
            }
        } catch (error) {
            console.error('Error fetching bookings:', error);
            toast.error(error.message || 'Failed to load bookings');
        } finally {
            setLoading(false);
        }
    };

    const filteredBookings = bookings.filter(booking => {
        if (filter !== 'all' && booking.status !== filter) {
            return false;
        }
  
        if (search) {
            const searchLower = search.toLowerCase();
            return (
                booking.serviceName?.toLowerCase().includes(searchLower) ||
                booking.bookingCode?.toLowerCase().includes(searchLower) ||
                booking.location?.toLowerCase().includes(searchLower)
            );
        }
        
        return true;
    });

    const getStatusBadge = (status, paymentStatus) => {
        const statusColors = {
            pending: 'bg-yellow-100 text-yellow-800',
            confirmed: 'bg-blue-100 text-blue-800',
            'in-progress': 'bg-purple-100 text-purple-800',
            completed: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800'
        };

        const paymentColors = {
            unpaid: 'bg-red-100 text-red-800',
            pending: 'bg-yellow-100 text-yellow-800',
            paid: 'bg-green-100 text-green-800'
        };

        return (
            <div className="flex flex-wrap gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${paymentColors[paymentStatus] || 'bg-gray-100 text-gray-800'}`}>
                    Payment: {paymentStatus}
                </span>
            </div>
        );
    };

    const getTotalBookings = () => {
        return {
            all: bookings.length,
            pending: bookings.filter(b => b.status === 'pending').length,
            confirmed: bookings.filter(b => b.status === 'confirmed').length,
            completed: bookings.filter(b => b.status === 'completed').length,
            cancelled: bookings.filter(b => b.status === 'cancelled').length
        };
    };

    const totals = getTotalBookings();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-center">
                    <div className="loading loading-spinner loading-lg mb-4"></div>
                    <p className="text-gray-600">Loading your bookings...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">My Bookings</h1>
                <p className="text-gray-600">View and manage all your decoration service bookings</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                <div className="bg-white p-4 rounded-xl shadow-sm border">
                    <div className="text-3xl font-bold text-gray-800">{totals.all}</div>
                    <div className="text-sm text-gray-600">Total Bookings</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border">
                    <div className="text-3xl font-bold text-blue-600">{totals.pending}</div>
                    <div className="text-sm text-gray-600">Pending</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border">
                    <div className="text-3xl font-bold text-green-600">{totals.confirmed}</div>
                    <div className="text-sm text-gray-600">Confirmed</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border">
                    <div className="text-3xl font-bold text-purple-600">{totals.completed}</div>
                    <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border">
                    <div className="text-3xl font-bold text-red-600">{totals.cancelled}</div>
                    <div className="text-sm text-gray-600">Cancelled</div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                        >
                            All ({totals.all})
                        </button>
                        <button
                            onClick={() => setFilter('pending')}
                            className={`px-4 py-2 rounded-lg ${filter === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                        >
                            Pending ({totals.pending})
                        </button>
                        <button
                            onClick={() => setFilter('confirmed')}
                            className={`px-4 py-2 rounded-lg ${filter === 'confirmed' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                        >
                            Confirmed ({totals.confirmed})
                        </button>
                        <button
                            onClick={() => setFilter('completed')}
                            className={`px-4 py-2 rounded-lg ${filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                        >
                            Completed ({totals.completed})
                        </button>
                        <button
                            onClick={() => setFilter('cancelled')}
                            className={`px-4 py-2 rounded-lg ${filter === 'cancelled' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                        >
                            Cancelled ({totals.cancelled})
                        </button>
                    </div>
                    
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search bookings..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-64"
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {filteredBookings.length === 0 ? (
                    <div className="p-8 text-center">
                        <div className="text-gray-400 mb-4">
                            <FaCalendar className="text-6xl mx-auto" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            No bookings found
                        </h3>
                        <p className="text-gray-500 mb-6">
                            {search || filter !== 'all' 
                                ? 'Try changing your search or filter'
                                : 'You haven\'t made any bookings yet'}
                        </p>
                        {!search && filter === 'all' && (
                            <Link 
                                to="/services"
                                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                            >
                                Browse Services
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Service & Booking Code
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date & Location
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Amount & Payment
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredBookings.map((booking) => (
                                    <tr key={booking._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="font-medium text-gray-900">
                                                    {booking.serviceName}
                                                </div>
                                                <div className="text-sm text-gray-500 flex items-center gap-1">
                                                    <FaFileInvoiceDollar className="text-gray-400" />
                                                    {booking.bookingCode}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {booking.serviceCategory} • {booking.serviceUnit}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <FaCalendar className="text-gray-400" />
                                                    {new Date(booking.date).toLocaleDateString()}
                                                </div>
                                                <div className="flex items-start gap-2 text-sm text-gray-500">
                                                    <FaMapMarkerAlt className="text-gray-400 mt-1 flex-shrink-0" />
                                                    <span className="truncate max-w-[200px]">
                                                        {booking.location}
                                                    </span>
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    <FaClock className="inline mr-1 text-gray-400" />
                                                    {new Date(booking.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-1">
                                                <div className="font-semibold text-gray-900 flex items-center gap-2">
                                                    <FaMoneyBillWave className="text-green-500" />
                                                    ৳{booking.serviceCost?.toLocaleString()}
                                                </div>
                                                <div className="text-sm">
                                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                                        booking.paymentStatus === 'paid' 
                                                            ? 'bg-green-100 text-green-800'
                                                            : booking.paymentStatus === 'pending'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {booking.paymentStatus}
                                                    </span>
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    Method: {booking.paymentMethod || 'Not specified'}
                                                </div>
                                                {booking.transactionId && (
                                                    <div className="text-xs text-gray-500 truncate max-w-[150px]">
                                                        TXN: {booking.transactionId}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(booking.status, booking.paymentStatus)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex space-x-2">
                                                <Link
                                                    to={`/dashboard/my-bookings/${booking._id}`}
                                                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
                                                >
                                                    <FaEye />
                                                    View
                                                </Link>
                                                {booking.paymentStatus === 'unpaid' && (
                                                    <Link
                                                        to={`/payment/${booking._id}`}
                                                        className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-600 rounded-lg hover:bg-green-100"
                                                    >
                                                        <FaMoneyBillWave />
                                                        Pay Now
                                                    </Link>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {filteredBookings.length > 0 && (
                <div className="mt-6 text-sm text-gray-500">
                    Showing {filteredBookings.length} of {bookings.length} bookings
                </div>
            )}
        </div>
    );
};

export default MyBookings;