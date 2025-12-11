import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { 
    FaCalendar, 
    FaMapMarkerAlt, 
    FaMoneyBillWave, 
    FaUser,
    FaPhone,
    FaTag,
    FaFileInvoiceDollar,
    FaArrowLeft,
    FaClock,
    FaCheckCircle,
    FaTimesCircle,
    FaPrint,
    FaWhatsapp,
    FaCreditCard
} from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';

const BookingDetails = () => {
    const { bookingId } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (bookingId && user) {
            fetchBookingDetails();
        }
    }, [bookingId, user]);

    const fetchBookingDetails = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:3000/api/bookings/${bookingId}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch booking');
            }
            
            const result = await response.json();
            
            if (!result.success) {
                throw new Error(result.error || 'Booking not found');
            }
            
            if (result.data.userId !== user.uid) {
                toast.error('Unauthorized access');
                navigate('/dashboard/my-bookings');
                return;
            }
            
            setBooking(result.data);
        } catch (error) {
            console.error('Error fetching booking:', error);
            toast.error(error.message || 'Failed to load booking');
            navigate('/dashboard/my-bookings');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            confirmed: 'bg-blue-100 text-blue-800',
            'in-progress': 'bg-purple-100 text-purple-800',
            completed: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getPaymentStatusColor = (status) => {
        const colors = {
            unpaid: 'bg-red-100 text-red-800',
            pending: 'bg-yellow-100 text-yellow-800',
            paid: 'bg-green-100 text-green-800',
            failed: 'bg-red-100 text-red-800',
            refunded: 'bg-gray-100 text-gray-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const handlePrintReceipt = () => {
        window.print();
    };

    const handleShare = () => {
        const shareText = `Booking Details\nService: ${booking.serviceName}\nBooking Code: ${booking.bookingCode}\nStatus: ${booking.status}\nAmount: ৳${booking.serviceCost}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
        window.open(whatsappUrl, '_blank');
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-center">
                    <div className="loading loading-spinner loading-lg mb-4"></div>
                    <p className="text-gray-600">Loading booking details...</p>
                </div>
            </div>
        );
    }

    if (!booking) {
        return (
            <div className="text-center py-12">
                <FaTimesCircle className="text-6xl text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Not Found</h2>
                <p className="text-gray-600 mb-6">The booking you're looking for doesn't exist.</p>
                <button 
                    onClick={() => navigate('/dashboard/my-bookings')}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                    Back to Bookings
                </button>
            </div>
        );
    }

    const calculateTotal = () => {
        const subtotal = booking.serviceCost || 0;
        const vat = subtotal * 0.15;
        const total = subtotal + vat;
        return { subtotal, vat, total };
    };

    const totals = calculateTotal();

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <Link 
                        to="/dashboard/my-bookings"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
                    >
                        <FaArrowLeft />
                        Back to Bookings
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-800">Booking Details</h1>
                    <div className="flex items-center gap-3 mt-2">
                        <span className="text-gray-600">Booking Code:</span>
                        <span className="font-bold text-blue-600">{booking.bookingCode}</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                    </div>
                </div>
                
                <div className="flex gap-3">
                    <button
                        onClick={handlePrintReceipt}
                        className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        <FaPrint />
                        Print Receipt
                    </button>
                    <button
                        onClick={handleShare}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                        <FaWhatsapp />
                        Share
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Booking Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Service Details Card */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <FaTag />
                            Service Details
                        </h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600">Service Name</p>
                                    <p className="font-semibold text-lg">{booking.serviceName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Category</p>
                                    <p className="font-semibold capitalize">{booking.serviceCategory}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Unit</p>
                                    <p className="font-semibold">{booking.serviceUnit}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Service Cost</p>
                                    <p className="font-semibold text-green-600 text-lg">
                                        ৳{booking.serviceCost?.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Customer & Booking Info Card */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Customer & Booking Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                                        <FaUser />
                                        Customer Details
                                    </h3>
                                    <div className="space-y-2">
                                        <div>
                                            <p className="text-sm text-gray-600">Name</p>
                                            <p className="font-medium">{booking.userName}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Email</p>
                                            <p className="font-medium">{booking.userEmail}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Contact</p>
                                            <p className="font-medium flex items-center gap-2">
                                                <FaPhone />
                                                {booking.contactNumber}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                                        <FaCalendar />
                                        Booking Details
                                    </h3>
                                    <div className="space-y-2">
                                        <div>
                                            <p className="text-sm text-gray-600">Booking Date</p>
                                            <p className="font-medium flex items-center gap-2">
                                                <FaCalendar />
                                                {new Date(booking.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Location</p>
                                            <p className="font-medium flex items-start gap-2">
                                                <FaMapMarkerAlt className="mt-1 flex-shrink-0" />
                                                {booking.location}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Special Instructions</p>
                                            <p className="font-medium">
                                                {booking.specialInstructions || 'None provided'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Booking Timeline</h2>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <FaCheckCircle className="text-green-600" />
                                </div>
                                <div>
                                    <p className="font-medium">Booking Created</p>
                                    <p className="text-sm text-gray-600">
                                        {new Date(booking.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            {booking.updatedAt && booking.updatedAt !== booking.createdAt && (
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <FaClock className="text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Last Updated</p>
                                        <p className="text-sm text-gray-600">
                                            {new Date(booking.updatedAt).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column - Payment & Actions */}
                <div className="space-y-6">
                    {/* Payment Summary Card */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <FaCreditCard />
                            Payment Summary
                        </h2>
                        
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Service Cost</span>
                                <span className="font-medium">৳{totals.subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">VAT (15%)</span>
                                <span className="font-medium">৳{totals.vat.toFixed(2)}</span>
                            </div>
                            <div className="border-t pt-2">
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total Amount</span>
                                    <span>৳{totals.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Payment Status</p>
                                <span className={`px-3 py-1 rounded-full font-medium ${getPaymentStatusColor(booking.paymentStatus)}`}>
                                    {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                                </span>
                            </div>
                            
                            {booking.paymentMethod && (
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                                    <p className="font-medium">{booking.paymentMethod}</p>
                                </div>
                            )}
                            
                            {booking.transactionId && (
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Transaction ID</p>
                                    <p className="font-medium text-sm truncate">{booking.transactionId}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Actions Card */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Actions</h2>
                        <div className="space-y-3">
                            {booking.paymentStatus === 'unpaid' && (
                                <Link
                                    to={`/payment/${booking._id}`}
                                    className="block w-full bg-green-600 text-white py-3 rounded-lg font-semibold text-center hover:bg-green-700"
                                >
                                    Complete Payment
                                </Link>
                            )}
                            
                            {booking.status === 'pending' && booking.paymentStatus === 'paid' && (
                                <button
                                    onClick={() => {
                                        if (window.confirm('Cancel this booking?')) {
                                            fetch(`http://localhost:3000/api/bookings/${booking._id}`, {
                                                method: 'DELETE'
                                            })
                                            .then(res => res.json())
                                            .then(data => {
                                                if (data.success) {
                                                    toast.success('Booking cancelled');
                                                    fetchBookingDetails();
                                                } else {
                                                    toast.error(data.error);
                                                }
                                            });
                                        }
                                    }}
                                    className="w-full border border-red-300 text-red-600 py-3 rounded-lg font-semibold hover:bg-red-50"
                                >
                                    Cancel Booking
                                </button>
                            )}
                            
                            <Link
                                to="/dashboard/my-bookings"
                                className="block w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold text-center hover:bg-gray-50"
                            >
                                Back to List
                            </Link>
                        </div>
                    </div>

                    {/* Support Card */}
                    <div className="bg-blue-50 rounded-xl p-6">
                        <h3 className="font-bold text-blue-800 mb-2">Need Help?</h3>
                        <p className="text-sm text-blue-700 mb-4">
                            Contact our support team for any issues with your booking.
                        </p>
                        <button className="w-full bg-white text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-100">
                            Contact Support
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingDetails;