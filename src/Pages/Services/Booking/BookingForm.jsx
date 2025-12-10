import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuth from '../../../hooks/useAuth';

const BookingForm = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { serviceId } = useParams();
    
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    
    const [formData, setFormData] = useState({
        date: '',
        location: '',
        contactNumber: '',
        specialInstructions: ''
    });

    useEffect(() => {
        if (!serviceId) {
            toast.error('No service selected');
            navigate('/services');
            return;
        }

        fetchServiceDetails();
    }, [serviceId, navigate]);

    const fetchServiceDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/services/${serviceId}`);
            setService(response.data);
        } catch (error) {
            console.error('Error fetching service:', error);
            toast.error('Failed to load service details');
            navigate('/services');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const bookingData = {
            serviceId,
            userId: user.uid,
            userEmail: user.email,
            userName: user.displayName || user.email.split('@')[0],
            ...formData
        };

        try {
            const response = await axios.post('http://localhost:3000/api/bookings', bookingData);
            
            if (response.data.success) {
                toast.success('Booking created successfully!');
                
                // Show success message
                toast.custom((t) => (
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
                            <p className="text-gray-600 mb-4">Booking Code: <strong>{response.data.bookingCode}</strong></p>
                            <p className="text-sm text-gray-500 mb-6">Our team will contact you soon for confirmation.</p>
                            <button
                                onClick={() => {
                                    toast.dismiss(t.id);
                                    navigate('/');
                                }}
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700"
                            >
                                Back to Home
                            </button>
                        </div>
                    </div>
                ), { duration: 6000 });
            }
        } catch (error) {
            console.error('Booking error:', error);
            toast.error(error.response?.data?.error || 'Failed to create booking');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="loading loading-spinner loading-lg"></div>
            </div>
        );
    }

    if (!serviceId || !service) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        No Service Selected
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Please select a service first before booking.
                    </p>
                    <button 
                        onClick={() => navigate('/services')}
                        className="btn btn-primary"
                    >
                        Browse Services
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Book {service.service_name}
                    </h1>
                    <p className="text-gray-600">
                        Fill in the details below to book your decoration service
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Service Details
                    </h2>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Service:</span>
                            <span className="font-semibold">{service.service_name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Category:</span>
                            <span className="font-semibold capitalize">{service.category}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Price:</span>
                            <span className="font-semibold">${service.cost} / {service.unit}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Booking for
                            </label>
                            <div className="bg-gray-50 p-4 rounded-md">
                                <p className="font-medium">{user.displayName || user.email.split('@')[0]}</p>
                                <p className="text-gray-600 text-sm">{user.email}</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Preferred Date *
                            </label>
                            <input
                                type="date"
                                name="date"
                                required
                                value={formData.date}
                                onChange={handleChange}
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Service Location *
                            </label>
                            <input
                                type="text"
                                name="location"
                                required
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Enter full address"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Contact Number *
                            </label>
                            <input
                                type="tel"
                                name="contactNumber"
                                required
                                value={formData.contactNumber}
                                onChange={handleChange}
                                placeholder="+880 1XXX XXXXXX"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Special Instructions (Optional)
                            </label>
                            <textarea
                                name="specialInstructions"
                                value={formData.specialInstructions}
                                onChange={handleChange}
                                rows="4"
                                placeholder="Any specific requirements or notes..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
                            >
                                {submitting ? 'Creating Booking...' : 'Confirm Booking'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingForm;