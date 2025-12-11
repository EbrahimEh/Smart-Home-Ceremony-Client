import { Link } from 'react-router';
import { FaExclamationTriangle, FaHome, FaRedo } from 'react-icons/fa';

const PaymentFailed = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
            <div className="max-w-lg w-full">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-red-500 to-orange-600 text-white p-8 text-center">
                        <FaExclamationTriangle className="text-8xl mx-auto mb-6 opacity-90" />
                        <h1 className="text-4xl font-bold mb-3">Payment Failed</h1>
                        <p className="text-xl opacity-90">We couldn't process your payment</p>
                    </div>

                    <div className="p-8">
                        <div className="text-center mb-8">
                            <p className="text-gray-600 mb-6">
                                Don't worry! Your booking is still reserved. Please try again or use a different payment method.
                            </p>
                            
                            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                                <p className="text-sm text-red-700">
                                    <strong>Common reasons for failure:</strong>
                                </p>
                                <ul className="text-sm text-red-600 mt-2 text-left">
                                    <li className="mb-1">• Insufficient funds in your account</li>
                                    <li className="mb-1">• Incorrect card details</li>
                                    <li className="mb-1">• Bank declined the transaction</li>
                                    <li className="mb-1">• Network connectivity issues</li>
                                </ul>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <button
                                onClick={() => window.history.back()}
                                className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90"
                            >
                                <FaRedo />
                                Try Again
                            </button>
                            
                            <Link
                                to="/dashboard/my-bookings"
                                className="block w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold text-center hover:bg-gray-50"
                            >
                                View My Bookings
                            </Link>
                            
                            <Link
                                to="/"
                                className="block w-full border border-blue-300 text-blue-600 py-3 rounded-xl font-semibold text-center hover:bg-blue-50 flex items-center justify-center gap-2"
                            >
                                <FaHome />
                                Back to Home
                            </Link>
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-gray-600 mb-2">
                                Still having trouble? Contact our support team:
                            </p>
                            <div className="space-y-2">
                                <a href="tel:+8801234567890" className="block text-blue-600 font-semibold hover:underline">
                                    📞 +880 1234 567890
                                </a>
                                <a href="mailto:support@styledecor.com" className="block text-blue-600 font-semibold hover:underline">
                                    ✉️ support@smarthome.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentFailed;