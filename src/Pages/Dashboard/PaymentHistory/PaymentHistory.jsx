import { useState, useEffect } from 'react';
import { 
    FaCreditCard, 
    FaMoneyBillWave, 
    FaCalendar,
    FaFilter,
    FaSearch,
    FaFileInvoiceDollar,
    FaCheckCircle,
    FaTimesCircle,
    FaClock
} from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';

const PaymentHistory = () => {
    const { user } = useAuth();
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); 
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (user) {
            fetchPayments();
        }
    }, [user]);

    const fetchPayments = async () => {
        try {
            setLoading(true);

            const bookingsResponse = await fetch(`https://smart-home-ceremony-server.vercel.app/api/bookings/user/${user.uid}`);
            
            if (!bookingsResponse.ok) {
                throw new Error('Failed to fetch bookings');
            }
            
            const bookingsResult = await bookingsResponse.json();
            
            if (bookingsResult.success) {
                const paidBookings = bookingsResult.data.filter(
                    booking => booking.paymentStatus === 'paid' || booking.paymentStatus === 'pending'
                );
          
                const paymentHistory = paidBookings.map(booking => ({
                    id: booking._id,
                    bookingCode: booking.bookingCode,
                    serviceName: booking.serviceName,
                    amount: booking.serviceCost,
                    status: booking.paymentStatus,
                    method: booking.paymentMethod || 'N/A',
                    transactionId: booking.transactionId,
                    date: booking.updatedAt || booking.createdAt,
                    bookingDate: booking.date
                }));
                
                setPayments(paymentHistory);
            } else {
                throw new Error(bookingsResult.error || 'Failed to load payments');
            }
        } catch (error) {
            console.error('Error fetching payments:', error);
            toast.error(error.message || 'Failed to load payment history');
        } finally {
            setLoading(false);
        }
    };

    const filteredPayments = payments.filter(payment => {

        if (filter !== 'all' && payment.status !== filter) {
            return false;
        }
        

        if (search) {
            const searchLower = search.toLowerCase();
            return (
                payment.serviceName?.toLowerCase().includes(searchLower) ||
                payment.bookingCode?.toLowerCase().includes(searchLower) ||
                payment.transactionId?.toLowerCase().includes(searchLower)
            );
        }
        
        return true;
    });

    const getStatusIcon = (status) => {
        switch (status) {
            case 'paid':
                return <FaCheckCircle className="text-green-500" />;
            case 'pending':
                return <FaClock className="text-yellow-500" />;
            case 'failed':
                return <FaTimesCircle className="text-red-500" />;
            default:
                return <FaMoneyBillWave className="text-gray-500" />;
        }
    };

    const getTotalAmount = () => {
        return filteredPayments
            .filter(p => p.status === 'paid')
            .reduce((sum, payment) => sum + (payment.amount || 0), 0);
    };

    const getPaymentStats = () => {
        const stats = {
            total: payments.length,
            paid: payments.filter(p => p.status === 'paid').length,
            pending: payments.filter(p => p.status === 'pending').length,
            failed: payments.filter(p => p.status === 'failed' || p.status === 'unpaid').length
        };
        return stats;
    };

    const stats = getPaymentStats();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-center">
                    <div className="loading loading-spinner loading-lg mb-4"></div>
                    <p className="text-gray-600">Loading payment history...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
     
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment History</h1>
                <p className="text-gray-600">Track all your payment transactions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-4 rounded-xl shadow-sm border">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-3xl font-bold text-gray-800">{stats.total}</div>
                            <div className="text-sm text-gray-600">Total Payments</div>
                        </div>
                        <FaCreditCard className="text-3xl text-blue-500" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-3xl font-bold text-green-600">{stats.paid}</div>
                            <div className="text-sm text-gray-600">Successful</div>
                        </div>
                        <FaCheckCircle className="text-3xl text-green-500" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
                            <div className="text-sm text-gray-600">Pending</div>
                        </div>
                        <FaClock className="text-3xl text-yellow-500" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-3xl font-bold text-red-600">{stats.failed}</div>
                            <div className="text-sm text-gray-600">Failed</div>
                        </div>
                        <FaTimesCircle className="text-3xl text-red-500" />
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 mb-8 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-blue-100">Total Amount Paid</p>
                        <p className="text-4xl font-bold">৳{getTotalAmount().toLocaleString()}</p>
                    </div>
                    <FaMoneyBillWave className="text-5xl opacity-50" />
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                                filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                            }`}
                        >
                            <FaFilter />
                            All ({stats.total})
                        </button>
                        <button
                            onClick={() => setFilter('paid')}
                            className={`px-4 py-2 rounded-lg ${
                                filter === 'paid' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                            }`}
                        >
                            Paid ({stats.paid})
                        </button>
                        <button
                            onClick={() => setFilter('pending')}
                            className={`px-4 py-2 rounded-lg ${
                                filter === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                            }`}
                        >
                            Pending ({stats.pending})
                        </button>
                        <button
                            onClick={() => setFilter('failed')}
                            className={`px-4 py-2 rounded-lg ${
                                filter === 'failed' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                            }`}
                        >
                            Failed ({stats.failed})
                        </button>
                    </div>
                    
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search payments..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-64"
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {filteredPayments.length === 0 ? (
                    <div className="p-8 text-center">
                        <div className="text-gray-400 mb-4">
                            <FaCreditCard className="text-6xl mx-auto" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            No payments found
                        </h3>
                        <p className="text-gray-500">
                            {search || filter !== 'all' 
                                ? 'Try changing your search or filter'
                                : 'No payment history available yet'
                            }
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Payment Details
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Service & Booking
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Amount & Method
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status & Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredPayments.map((payment) => (
                                    <tr key={payment.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="text-2xl">
                                                    {getStatusIcon(payment.status)}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">
                                                        {payment.transactionId || 'N/A'}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {payment.method}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="font-medium text-gray-900">
                                                    {payment.serviceName}
                                                </div>
                                                <div className="text-sm text-gray-500 flex items-center gap-1">
                                                    <FaFileInvoiceDollar className="text-gray-400" />
                                                    {payment.bookingCode}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    <FaCalendar className="inline mr-1" />
                                                    {new Date(payment.bookingDate).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-lg text-gray-900">
                                                ৳{payment.amount?.toLocaleString()}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {payment.method}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-2">
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                    payment.status === 'paid' 
                                                        ? 'bg-green-100 text-green-800'
                                                        : payment.status === 'pending'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                                                </span>
                                                <div className="text-sm text-gray-500">
                                                    {new Date(payment.date).toLocaleString()}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {filteredPayments.length > 0 && (
                <div className="mt-6 text-sm text-gray-500">
                    Showing {filteredPayments.length} of {payments.length} payments
                    {getTotalAmount() > 0 && (
                        <span className="ml-4 font-medium">
                            • Total: ৳{getTotalAmount().toLocaleString()}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default PaymentHistory;