import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaCalendarAlt, FaTag, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router';

const ServicesSection = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Fetch from your server
            const response = await fetch('https://smart-home-ceremony-server.vercel.app/api/services');
            
            if (!response.ok) {
                throw new Error(`Failed to fetch: ${response.status}`);
            }
            
            const data = await response.json();
            setServices(data);
            
        } catch (err) {
            console.error('Error fetching services:', err);
            setError('Failed to load services. Please try again.');
            setServices(getFallbackData());
        } finally {
            setLoading(false);
        }
    };

    const getFallbackData = () => {
        return [
            {
                _id: '1',
                service_name: "Wedding Venue Decoration",
                cost: 50000,
                unit: "per venue",
                category: "wedding",
                description: "Complete wedding venue decoration",
                image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&auto=format&fit=crop",
                rating: 4.9
            },
            {
                _id: '2',
                service_name: "Home Interior Design",
                cost: 30000,
                unit: "per room",
                category: "home",
                description: "Professional interior decoration",
                image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&auto=format&fit=crop",
                rating: 4.8
            },
            {
                _id: '3',
                service_name: "Office Space Design",
                cost: 75000,
                unit: "per floor",
                category: "office",
                description: "Modern office decoration",
                image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&auto=format&fit=crop",
                rating: 4.7
            }
        ];
    };

    if (loading) {
        return (
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                            Our Decoration Services
                        </h2>
                        <div className="flex flex-col items-center gap-4">
                            <FaSpinner className="animate-spin text-4xl text-primary" />
                            <p className="text-gray-600">Loading services...</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (error && services.length === 0) {
        return (
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                            Our Decoration Services
                        </h2>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                            <p className="text-red-600 mb-4">{error}</p>
                            <button 
                                onClick={fetchServices}
                                className="btn btn-primary"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Our Decoration Services
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Choose from our wide range of professional decoration services
                    </p>
                    
                    {error && (
                        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3 max-w-md mx-auto">
                            <p className="text-yellow-700 text-sm">
                                ⚠️ Using fallback data. {error}
                            </p>
                        </div>
                    )}
                </motion.div>

                {services.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-lg">No services available yet.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.map((service, index) => (
                                <motion.div
                                    key={service._id || index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -10 }}
                                    className="card bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
                                >
                                    <figure className="h-48">
                                        <img 
                                            src={service.image} 
                                            alt={service.service_name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-3 right-3">
                                            <span className="badge badge-primary">
                                                {service.category || "General"}
                                            </span>
                                        </div>
                                    </figure>

                                    <div className="card-body p-5">
                                        <h3 className="card-title text-xl font-bold text-gray-800">
                                            {service.service_name}
                                        </h3>
                                        
                                        <p className="text-gray-600 mt-2 mb-4">
                                            {service.description || "Professional decoration service"}
                                        </p>
     
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                <FaTag className="text-primary" />
                                                <span className="font-bold text-xl text-gray-800">
                                                    BDT {service.cost?.toLocaleString() || "N/A"}
                                                </span>
                                            </div>
                                            <span className="text-gray-500 text-sm">
                                                /{service.unit || "service"}
                                            </span>
                                        </div>
          
                                        <div className="flex items-center gap-2 mb-5">
                                            <div className="flex items-center gap-1">
                                                <FaStar className="text-yellow-400" />
                                                <span className="font-medium">
                                                    {service.rating || 4.5}
                                                </span>
                                            </div>
                                            <span className="text-gray-500 text-sm">
                                                ({service.totalBookings || 0} bookings)
                                            </span>
                                        </div>
       
                                        <div className="card-actions">
                                            <Link 
                                                to={`/services/${service._id}`}
                                                className="btn btn-primary w-full"
                                            >
                                                <FaCalendarAlt className="mr-2" />
                                                Book Now
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            viewport={{ once: true }}
                            className="text-center mt-12"
                        >
                            <Link to="/services">
                                <button className="btn btn-outline btn-primary px-8 py-3">
                                    View All Services
                                </button>
                            </Link>
                        </motion.div>
                    </>
                )}
            </div>
        </section>
    );
};

export default ServicesSection;