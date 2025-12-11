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


    const validateForm = () => {

        if (!formData.date.trim()) {
            toast.error('Please select a date');
            return false;
        }
        
        if (!formData.location.trim()) {
            toast.error('Please enter service location');
            return false;
        }
        
        if (!formData.contactNumber.trim()) {
            toast.error('Please enter contact number');
            return false;
        }

        const phoneRegex = /^(?:\+88|01)?\d{11}$/;
        const cleanedPhone = formData.contactNumber.replace(/\s+/g, '').replace('+88', '');
        
        if (!phoneRegex.test(cleanedPhone) && cleanedPhone.length !== 11) {
            toast.error('Please enter a valid Bangladeshi phone number (11 digits)');
            return false;
        }

        const selectedDate = new Date(formData.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            toast.error('Please select a future date');
            return false;
        }
        
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setSubmitting(true);

        try {
      
            const bookingData = {
                serviceId: service?._id,
                userId: user.uid,
                userEmail: user.email,
                userName: user.displayName,
                date: formData.date, 
                location: formData.location,
                contactNumber: formData.contactNumber,
                specialInstructions: formData.specialInstructions || '', 
                serviceName: service?.service_name,
                serviceCost: service?.cost,
                serviceCategory: service?.category,
                serviceUnit: service?.unit
            };

            console.log('Sending booking data:', bookingData);

     
            const response = await fetch('http://localhost:3000/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData)
            });

            const result = await response.json();
            console.log('Booking response:', result);

            if (result.success) {
         
                toast.success('Booking created successfully! Redirecting to payment...');

       
                setTimeout(() => {
                    navigate(`/payment/${result.bookingId}`);
                }, 1000);

            } else {
                throw new Error(result.error || 'Failed to create booking');
            }

        } catch (error) {
            console.error('Booking error:', error);
            toast.error(error.message || 'Failed to create booking');
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
                            {formData.date && (
                                <p className="text-sm text-gray-500 mt-1">
                                    Selected: {new Date(formData.date).toLocaleDateString()}
                                </p>
                            )}
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
                            {formData.location && (
                                <p className="text-sm text-gray-500 mt-1">
                                    Characters: {formData.location.length}
                                </p>
                            )}
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
                                placeholder="01XXXXXXXXX or +8801XXXXXXXXX"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Format: 01XXXXXXXXX or +8801XXXXXXXXX
                            </p>
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
                            {formData.specialInstructions && (
                                <p className="text-sm text-gray-500 mt-1">
                                    Characters: {formData.specialInstructions.length}
                                </p>
                            )}
                        </div>

             
                        <div className="flex items-start space-x-3">
                            <input
                                type="checkbox"
                                id="terms"
                                required
                                className="mt-1"
                            />
                            <label htmlFor="terms" className="text-sm text-gray-600">
                                I agree to the terms and conditions and understand that this booking 
                                requires payment confirmation to be fully confirmed.
                            </label>
                        </div>

            
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {submitting ? (
                                    <span className="flex items-center justify-center">
                                        <span className="loading loading-spinner loading-sm mr-2"></span>
                                        Creating Booking...
                                    </span>
                                ) : (
                                    'Confirm Booking & Proceed to Payment'
                                )}
                            </button>
                            
                            <p className="text-sm text-gray-500 text-center mt-3">
                                You'll be redirected to payment after booking confirmation
                            </p>
                        </div>
                    </form>
                </div>

      
                <div className="mt-6 text-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                        ← Back to Service Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingForm;