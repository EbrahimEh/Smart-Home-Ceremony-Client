import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { FaCheckCircle, FaCalendar, FaMapMarkerAlt, FaDownload, FaWhatsapp } from 'react-icons/fa';
import toast from 'react-hot-toast';

const PaymentSuccess = () => {
    const { bookingId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!bookingId) {
            navigate('/');
        }
    }, [bookingId, navigate]);

    const handleShare = () => {
        const shareText = `I just booked a decoration service with StyleDecor! Booking ID: ${bookingId}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                       
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 text-center">
                            <FaCheckCircle className="text-6xl mx-auto mb-6 opacity-90" />
                            <h1 className="text-4xl font-bold mb-3">Payment Successful!</h1>
                            <p className="text-xl opacity-90">Your booking has been confirmed</p>
                        </div>

                  
                        <div className="p-8">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Thank You for Your Payment</h2>
                                <p className="text-gray-600 mb-6">
                                    Your booking is now confirmed. You'll receive a confirmation email shortly.
                                </p>
                                
                                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                                    <div className="flex items-center justify-center gap-4 mb-4">
                                        <div className="text-center">
                                            <FaCalendar className="text-3xl text-blue-500 mx-auto mb-2" />
                                            <p className="text-sm text-gray-600">Booking ID</p>
                                            <p className="font-bold">{bookingId?.substring(0, 8)}...</p>
                                        </div>
                                        <div className="text-center">
                                            <FaMapMarkerAlt className="text-3xl text-green-500 mx-auto mb-2" />
                                            <p className="text-sm text-gray-600">Status</p>
                                            <p className="font-bold text-green-600">Confirmed</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">What's Next?</h3>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-blue-600 font-bold">1</span>
                                        </div>
                                        <div>
                                            <p className="font-medium">Decorator Assignment</p>
                                            <p className="text-sm text-gray-600">Our admin will assign a decorator within 24 hours</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-green-600 font-bold">2</span>
                                        </div>
                                        <div>
                                            <p className="font-medium">Planning Phase</p>
                                            <p className="text-sm text-gray-600">The decorator will contact you for planning</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-purple-600 font-bold">3</span>
                                        </div>
                                        <div>
                                            <p className="font-medium">Service Execution</p>
                                            <p className="text-sm text-gray-600">Decoration setup on your selected date</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                <Link
                                    to="/dashboard/my-bookings"
                                    className="bg-blue-600 text-white py-3 rounded-xl font-semibold text-center hover:bg-blue-700 transition-colors"
                                >
                                    View My Bookings
                                </Link>
                                
                                <button
                                    onClick={handleShare}
                                    className="bg-green-500 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
                                >
                                    <FaWhatsapp className="text-xl" />
                                    Share on WhatsApp
                                </button>
                            </div>

                            <div className="text-center">
                                <button
                                    onClick={() => toast.info('Receipt download coming soon!')}
                                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
                                >
                                    <FaDownload />
                                    Download Payment Receipt
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-8">
                        <Link 
                            to="/"
                            className="text-gray-600 hover:text-gray-800 underline"
                        >
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;