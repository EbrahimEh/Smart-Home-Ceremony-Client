import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { 
    FaStar, 
    FaCalendarAlt, 
    FaClock, 
    FaCheckCircle, 
    FaArrowLeft,
    FaSpinner,
    FaMapMarkerAlt,
    FaTag,
    FaDollarSign
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import useAuth from '../../../hooks/useAuth';

const ServiceDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchServiceDetails();
    }, [id]);

    const fetchServiceDetails = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await fetch(`http://localhost:3000/api/services/${id}`);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `Failed to load service`);
            }
            
            const data = await response.json();
            
            if (!data) {
                throw new Error('Service data is empty');
            }
            
            setService(data);
            
        } catch (err) {
            console.error('Error fetching service:', err);
            setError(err.message || 'Failed to load service details');
        } finally {
            setLoading(false);
        }
    };

    const handleBookNow = () => {
        if (!user) {
            navigate('/auth/login', { state: { from: `/services/${id}` } });
            return;
        }
        
        navigate(`/booking/${id}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <FaSpinner className="animate-spin text-4xl text-blue-600" />
                <p className="ml-4 text-gray-600">Loading service details...</p>
            </div>
        );
    }

    if (error || !service) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Service</h2>
                    <p className="text-gray-600 mb-4">{error || 'Service not found'}</p>
                    <div className="space-y-3">
                        <button 
                            onClick={() => fetchServiceDetails()}
                            className="btn btn-primary w-full"
                        >
                            Try Again
                        </button>
                        <button 
                            onClick={() => navigate('/services')}
                            className="btn btn-outline w-full"
                        >
                            Back to Services
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <button 
                    onClick={() => navigate('/services')}
                    className="btn btn-ghost mb-6 gap-2"
                >
                    <FaArrowLeft />
                    Back to Services
                </button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-6xl mx-auto"
                >
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
                        <div className="md:flex">
                            <div className="md:w-1/2">
                                <img 
                                    src={service.image || 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop'}
                                    alt={service.service_name}
                                    className="w-full h-64 md:h-full object-cover"
                                />
                            </div>
                          
                            <div className="md:w-1/2 p-6 md:p-8">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className="badge badge-primary mb-2 gap-1">
                                            <FaTag />
                                            {service.category}
                                        </span>
                                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                                            {service.service_name}
                                        </h1>
                                    </div>
                                    {service.popular && (
                                        <span className="badge badge-secondary">
                                            Popular
                                        </span>
                                    )}
                                </div>
                                
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar key={i} />
                                            ))}
                                        </div>
                                        <span className="font-bold text-lg">{service.rating || 4.5}</span>
                                    </div>
                                    <span className="text-gray-500">
                                        ({service.totalBookings || 0} bookings)
                                    </span>
                                </div>
                                
                                <div className="mb-6">
                                    <div className="flex items-baseline gap-2 mb-2">
                                        <FaDollarSign className="text-green-600" />
                                        <span className="md:text-4xl text-2xl font-bold text-gray-800">
                                            ${service.cost?.toLocaleString()}
                                        </span>
                                        <span className="text-gray-500 text-lg">
                                            /{service.unit}
                                        </span>
                                    </div>
                                    <p className="text-gray-600">
                                        All inclusive price. No hidden charges.
                                    </p>
                                </div>
                                
                                <div className="flex items-center gap-3 mb-8">
                                    <FaClock className="text-blue-500" />
                                    <span className="text-gray-700 font-medium">
                                        Duration: {service.duration || "Varies"}
                                    </span>
                                </div>
                                
                                <button 
                                    onClick={handleBookNow}
                                    className="btn btn-primary btn-lg w-full gap-2"
                                >
                                    <FaCalendarAlt />
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                    Service Description
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                    {service.description || 'No description available.'}
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                    What's Included
                                </h2>
                                <ul className="space-y-3">
                                    {(service.inclusions || [
                                        "Professional setup",
                                        "Quality materials",
                                        "Expert team",
                                        "Setup and cleanup",
                                        "Consultation"
                                    ]).map((item, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <FaCheckCircle className="text-green-500 mt-1" />
                                            <span className="text-gray-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-4 gap-2 flex items-center">
                                    <FaMapMarkerAlt className="text-red-500" />
                                    Service Coverage
                                </h3>
                                <ul className="space-y-2">
                                    {["Dhaka City", "Chittagong", "Sylhet", "Khulna", "Rajshahi"].map((city, index) => (
                                        <li key={index} className="flex items-center justify-between">
                                            <span className="text-gray-700">{city}</span>
                                            <span className="badge badge-success badge-sm">Available</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">
                                    Need More Services?
                                </h3>
                                <div className="space-y-3">
                                    <Link to="/services" className="block">
                                        <button className="btn btn-outline btn-primary w-full">
                                            Browse All Services
                                        </button>
                                    </Link>
                                    {service.category && (
                                        <Link to={`/services?category=${service.category}`} className="block">
                                            <button className="btn btn-outline btn-secondary w-full">
                                                More {service.category} Services
                                            </button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ServiceDetails;