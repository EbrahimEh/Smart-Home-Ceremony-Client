import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { FaCreditCard, FaCheckCircle, FaExclamationTriangle, FaBolt, FaShoppingCart } from 'react-icons/fa';

import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';

const Payment = () => {
    const { bookingId } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (bookingId && user) {
            fetchBookingDetails();
        }
    }, [bookingId, user]);

    const fetchBookingDetails = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://smart-home-ceremony-server.vercel.app/api/bookings/${bookingId}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch booking');
            }
            
            const result = await response.json();
            
            if (!result.success) {
                throw new Error(result.error || 'Booking not found');
            }
            
            if (result.data.userId !== user.uid) {
                toast.error('Unauthorized access');
                navigate('/');
                return;
            }
            
            if (result.data.paymentStatus === 'paid') {
                toast.success('Payment already completed!');
                navigate('/dashboard/my-bookings');
                return;
            }
            
            setBooking(result.data);
        } catch (error) {
            console.error('Error fetching booking:', error);
            toast.error(error.message || 'Failed to load booking');
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    const handlePayment = async (method) => {
        try {
            setProcessing(true);
            
            if (method === 'bkash') {
                const response = await fetch(`https://smart-home-ceremony-server.vercel.app/api/bookings/${bookingId}/complete-payment`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        paymentMethod: 'bkash',
                        transactionId: `BKASH${Date.now()}`
                    })
                });

                const result = await response.json();

                if (result.success) {
                    toast.success('Payment successful!');
                    navigate(`/payment/success/${bookingId}`);
                } else {
                    throw new Error(result.error || 'Payment failed');
                }
            }
            else if (method === 'manual') {
                const response = await fetch(`https://smart-home-ceremony-server.vercel.app/api/bookings/${bookingId}/complete-payment`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        paymentMethod: 'cash',
                        transactionId: `CASH_${Date.now()}`
                    })
                });

                const result = await response.json();

                if (result.success) {
                    toast.success('Payment marked as completed!');
                    navigate(`/payment/success/${bookingId}`);
                } else {
                    throw new Error(result.error || 'Payment failed');
                }
            }
            else if (method === 'test') {
                const response = await fetch('https://smart-home-ceremony-server.vercel.app/api/simulate-payment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        bookingId: bookingId
                    })
                });

                const result = await response.json();

                if (result.success) {
                    toast.success('Test payment successful!');
                    navigate(`/payment/success/${bookingId}`);
                } else {
                    throw new Error(result.error || 'Test payment failed');
                }
            }

        } catch (error) {
            console.error('Payment error:', error);
            toast.error(error.message || 'Payment failed. Please try again.');
        } finally {
            setProcessing(false);
        }
    };

    const calculateTotal = () => {
        if (!booking) return { subtotal: 0, vat: 0, total: 0 };
        
        const subtotal = booking.serviceCost || 0;
        const vat = subtotal * 0.15;
        const total = subtotal + vat;
        
        return { subtotal, vat, total };
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="loading loading-spinner loading-lg mb-4"></div>
                    <p className="text-gray-600">Loading payment details...</p>
                </div>
            </div>
        );
    }

    if (!booking) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <FaExclamationTriangle className="text-6xl text-yellow-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Not Found</h2>
                    <p className="text-gray-600 mb-6">The booking you're looking for doesn't exist.</p>
                    <button 
                        onClick={() => navigate('/')}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    const totals = calculateTotal();

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">

                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            Complete Your Payment
                        </h1>
                        <div className="flex items-center justify-center gap-4">
                            <p className="text-gray-600">
                                Booking Code: <span className="font-bold text-blue-600">{booking.bookingCode}</span>
                            </p>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                booking.paymentStatus === 'paid' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                            }`}>
                                {booking.paymentStatus === 'paid' ? 'Paid' : 'Pending Payment'}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                       
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>
                                    <span className="text-sm text-gray-500">#{booking.bookingCode}</span>
                                </div>
                                
                                <div className="border-b pb-4 mb-4">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="font-semibold text-lg">{booking.serviceName}</h3>
                                            <p className="text-gray-600 text-sm mt-1">{booking.serviceCategory} • {booking.serviceUnit}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-lg">৳{booking.serviceCost?.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h4 className="font-semibold text-gray-700 mb-3">Booking Details</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-600">Booking Date</p>
                                            <p className="font-medium">{new Date(booking.date).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Location</p>
                                            <p className="font-medium">{booking.location}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Contact Number</p>
                                            <p className="font-medium">{booking.contactNumber}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Booked By</p>
                                            <p className="font-medium">{booking.userName}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t pt-6">
                                    <h4 className="font-semibold text-gray-700 mb-4">Payment Summary</h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Service Cost</span>
                                            <span>৳{totals.subtotal.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">VAT (15%)</span>
                                            <span>৳{totals.vat.toFixed(2)}</span>
                                        </div>
                                        <div className="border-t pt-3">
                                            <div className="flex justify-between font-bold text-lg">
                                                <span>Total Amount</span>
                                                <span>৳{totals.total.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

              
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                    <FaCreditCard />
                                    Select Payment Method
                                </h2>

                                <div className="space-y-4">
        
                                    <div className="border border-gray-300 rounded-lg p-4 hover:border-pink-500 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-8 bg-gradient-to-r from-pink-500 to-red-500 rounded flex items-center justify-center">
                                                    <FaBolt className="text-white text-sm" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold">bKash</h3>
                                                    <p className="text-sm text-gray-600">Mobile Banking</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handlePayment('bkash')}
                                                disabled={processing}
                                                className="bg-gradient-to-r from-pink-600 to-red-600 text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
                                            >
                                                {processing ? 'Processing...' : 'Pay Now'}
                                            </button>
                                        </div>
                                        <div className="mt-3 text-xs text-gray-500">
                                            <p>Send money to: <strong>017XX-XXXXXX</strong></p>
                                            <p>Reference: <strong>{booking.bookingCode}</strong></p>
                                        </div>
                                    </div>

              
                                    <div className="border border-gray-300 rounded-lg p-4 hover:border-green-500 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded flex items-center justify-center">
                                                    <FaShoppingCart className="text-white text-sm" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold">Cash Payment</h3>
                                                    <p className="text-sm text-gray-600">Pay at our office</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handlePayment('manual')}
                                                disabled={processing}
                                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
                                            >
                                                {processing ? 'Processing...' : 'Mark as Paid'}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="border border-gray-300 rounded-lg p-4 hover:border-blue-500 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded flex items-center justify-center">
                                                    <span className="text-white text-xs font-bold">TEST</span>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold">Test Payment</h3>
                                                    <p className="text-sm text-gray-600">For development testing only</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handlePayment('test')}
                                                disabled={processing}
                                                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
                                            >
                                                {processing ? 'Processing...' : 'Test Payment'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

            
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                                <div className="text-center mb-6">
                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
                                        booking.paymentStatus === 'paid' 
                                            ? 'bg-green-100 text-green-600' 
                                            : 'bg-yellow-100 text-yellow-600'
                                    }`}>
                                        {booking.paymentStatus === 'paid' ? 
                                            <FaCheckCircle className="text-2xl" /> : 
                                            <FaExclamationTriangle className="text-2xl" />
                                        }
                                    </div>
                                    <h3 className="font-bold text-lg mb-1">
                                        {booking.paymentStatus === 'paid' ? 'Payment Completed' : 'Pending Payment'}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {booking.paymentStatus === 'paid' 
                                            ? 'Your booking is confirmed!' 
                                            : 'Complete payment to confirm your booking.'
                                        }
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-blue-800 mb-2">Important Notes</h4>
                                        <ul className="text-sm text-blue-700 space-y-1">
                                            <li>• Complete payment within 24 hours</li>
                                            <li>• Save your booking code: {booking.bookingCode}</li>
                                            <li>• Contact support if you need help</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <button
                                            onClick={() => navigate('/dashboard/my-bookings')}
                                            className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50"
                                        >
                                            View My Bookings
                                        </button>
                                    </div>

                                    <div>
                                        <button
                                            onClick={() => {
                                                if (window.confirm('Are you sure you want to cancel this booking?')) {
                                                    fetch(`https://smart-home-ceremony-server.vercel.app/api/bookings/${bookingId}`, {
                                                        method: 'DELETE'
                                                    })
                                                    .then(res => res.json())
                                                    .then(data => {
                                                        if (data.success) {
                                                            toast.success('Booking cancelled');
                                                            navigate('/dashboard/my-bookings');
                                                        } else {
                                                            toast.error(data.error);
                                                        }
                                                    });
                                                }
                                            }}
                                            className="w-full border border-red-300 text-red-600 py-3 rounded-lg font-medium hover:bg-red-50"
                                        >
                                            Cancel Booking
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;