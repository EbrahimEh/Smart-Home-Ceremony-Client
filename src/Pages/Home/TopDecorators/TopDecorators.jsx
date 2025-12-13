import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaCheckCircle, FaSpinner } from 'react-icons/fa';

const TopDecorators = () => {
    const [decorators, setDecorators] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDecorators();
    }, []);

    const fetchDecorators = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://smart-home-ceremony-server.vercel.app/api/decorators/top');
            
            if (response.ok) {
                const data = await response.json();
                setDecorators(data);
            }
        } catch (error) {
            console.error('Error fetching decorators:', error);
          
            setDecorators(getFallbackDecorators());
        } finally {
            setLoading(false);
        }
    };

    const getFallbackDecorators = () => {
        return [
            {
                _id: '1',
                name: "Sarah Johnson",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
                rating: 4.9,
                totalProjects: 145,
                specialties: ["Wedding", "Home", "Office"],
                experience: "8 years"
            },
            {
                _id: '2',
                name: "Michael Chen",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
                rating: 4.8,
                totalProjects: 120,
                specialties: ["Corporate", "Seminar"],
                experience: "6 years"
            },
            {
                _id: '3',
                name: "Emma Williams",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
                rating: 4.7,
                totalProjects: 98,
                specialties: ["Birthday", "Wedding"],
                experience: "5 years"
            },
            {
                _id: '4',
                name: "David Lee",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
                rating: 4.9,
                totalProjects: 160,
                specialties: ["Office", "Corporate"],
                experience: "10 years"
            }
        ];
    };

    if (loading) {
        return (
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <FaSpinner className="animate-spin text-4xl text-primary mx-auto" />
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Our Top Decorators
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Meet our expert decorators with years of experience in creating beautiful spaces
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {decorators.map((decorator, index) => (
                        <motion.div
                            key={decorator._id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                            className="card bg-white shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            {/* Decorator Image */}
                            <figure className="pt-6 px-6">
                                <div className="w-24 h-24 md:w-28 md:h-28 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg">
                                    <img 
                                        src={decorator.image} 
                                        alt={decorator.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </figure>

                            <div className="card-body pt-4 text-center">
                                <h3 className="card-title text-xl font-bold text-gray-800 justify-center">
                                    {decorator.name}
                                </h3>
                                
            
                                <div className="flex items-center justify-center gap-2 mb-3">
                                    <div className="flex items-center gap-1">
                                        <FaStar className="text-yellow-400" />
                                        <span className="font-bold">{decorator.rating}</span>
                                    </div>
                                    <span className="text-gray-500 text-sm">
                                        ({decorator.totalProjects} projects)
                                    </span>
                                </div>

                                <div className="badge badge-primary badge-outline mb-4">
                                    {decorator.experience} experience
                                </div>

                                <div className="mb-4">
                                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                                        Specialties:
                                    </h4>
                                    <div className="flex flex-wrap gap-2 justify-center">
                                        {decorator.specialties?.map((specialty, idx) => (
                                            <span 
                                                key={idx}
                                                className="badge badge-sm bg-purple-50 text-purple-700 border-purple-200"
                                            >
                                                {specialty}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center justify-center gap-2 text-sm">
                                    <FaCheckCircle className="text-green-500" />
                                    <span className="text-green-600 font-medium">
                                        Available for Booking
                                    </span>
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
                    <button className="btn btn-outline btn-primary px-8">
                        View All Decorators
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default TopDecorators;