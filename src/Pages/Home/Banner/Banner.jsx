import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCheckCircle, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router';
import homeImg from '../../../assets/Home.jpg';
import cereImg from '../../../assets/Ceremony.jpg';

const Banner = () => {
    return (
        <div className="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden">
          
            <div 
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url(${homeImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
      
                <div className="absolute inset-0 bg-black/40 md:bg-black/30"></div>
            </div>

            <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                    
          
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-4 md:space-y-6 text-white"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            <span className="inline-block px-3 py-1 md:px-4 md:py-2 bg-purple-600/80 backdrop-blur-sm rounded-full text-xs md:text-sm font-semibold mb-3 md:mb-4">
                                Premium Decoration Services
                            </span>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                                Transform Your{' '}
                                <span className="text-purple-300">Spaces</span>{' '}
                                Into Masterpieces
                            </h1>
                        </motion.div>
                        
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-base md:text-lg lg:text-xl text-gray-200 max-w-2xl"
                        >
                            Professional decoration services for homes, weddings, offices, 
                            and ceremonies. Book expert decorators online and bring your 
                            vision to life with StyleDecor.
                        </motion.p>
                        
                        
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="space-y-2 md:space-y-3 pt-2"
                        >
                            {[
                                "Expert decorators with 10+ years experience",
                                "Custom designs for every budget",
                                "On-time delivery guaranteed",
                                "100% customer satisfaction"
                            ].map((feature, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <FaCheckCircle className="text-purple-300 mt-1 flex-shrink-0" />
                                    <span className="text-gray-100 text-sm md:text-base">{feature}</span>
                                </div>
                            ))}
                        </motion.div>
                        
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 md:pt-6"
                        >
                            <Link to="/services" className="w-full sm:w-auto">
                                <button className="btn btn-primary text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-full hover:scale-105 transition-transform duration-300 bg-purple-600 border-purple-600 hover:bg-purple-700 w-full">
                                    Book Decoration Service
                                    <FaArrowRight className="ml-2" />
                                </button>
                            </Link>
                            
                            <Link to="/about" className="w-full sm:w-auto">
                                <button className="btn btn-outline text-white border-white hover:bg-white/10 text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-full w-full">
                                    Learn More
                                </button>
                            </Link>
                        </motion.div>
                        
  
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 1 }}
                            className="hidden md:grid grid-cols-3 gap-4 md:gap-6 pt-6 md:pt-8 border-t border-white/20"
                        >
                            {[
                                { number: "500+", label: "Projects" },
                                { number: "50+", label: "Decorators" },
                                { number: "98%", label: "Satisfaction" }
                            ].map((stat, index) => (
                                <div key={index} className="text-center">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white">{stat.number}</h3>
                                    <p className="text-gray-300 text-xs md:text-sm mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
          
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="relative mt-8 lg:mt-0"
                    >
                
                        <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl">
                            <div className="relative h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px]">
                            
                                <div 
                                    className="absolute inset-0"
                                    style={{
                                        backgroundImage: `url(${cereImg})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                >
                                
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                                </div>
                   
                                <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 lg:p-8">
                                    <div className="bg-gradient-to-r  rounded-lg md:rounded-xl p-4 md:p-6 border border-white/20">
                                        <div className="flex items-center gap-2 mb-2">
                                            <FaCalendarAlt className="text-purple-300" />
                                            <span className="text-sm md:text-base text-purple-300 font-medium">
                                                Ceremony Special
                                            </span>
                                        </div>
                                        
                                        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 md:mb-3">
                                            Wedding & Event Decoration
                                        </h3>
                                        
                                        <p className="text-gray-200 text-sm md:text-base mb-4 md:mb-6">
                                            Complete decoration solutions for weddings, engagements, 
                                            and special ceremonies with custom themes
                                        </p>
                                        
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                            <div>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-lg md:text-xl lg:text-2xl font-bold text-white">
                                                        Starting from
                                                    </span>
                                                </div>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-purple-300">
                                                        BDT 25,000
                                                    </span>
                                                    <span className="text-gray-300 text-sm md:text-base">
                                                        /ceremony
                                                    </span>
                                                </div>
                                            </div>
                                            
                                            <Link to="/services?category=ceremony">
                                                <button className="btn btn-primary btn-sm md:btn-md whitespace-nowrap">
                                                    Explore Packages
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                        <motion.div
                            animate={{ 
                                y: [0, -10, 0],
                                rotate: [0, 5, 0]
                            }}
                            transition={{ 
                                repeat: Infinity, 
                                duration: 4,
                                ease: "easeInOut"
                            }}
                            className="hidden md:block absolute -top-3 -right-3 w-16 h-16 bg-purple-500/20 backdrop-blur-sm rounded-xl border border-purple-300/30 flex items-center justify-center"
                        >
                            <span className="text-white text-lg">✨</span>
                        </motion.div>
                        
                        <motion.div
                            animate={{ 
                                y: [0, 10, 0],
                                rotate: [0, -5, 0]
                            }}
                            transition={{ 
                                repeat: Infinity, 
                                duration: 5,
                                delay: 0.5,
                                ease: "easeInOut"
                            }}
                            className="hidden md:block absolute -bottom-3 -left-3 w-14 h-14 bg-pink-500/20 backdrop-blur-sm rounded-lg border border-pink-300/30 flex items-center justify-center"
                        >
                            <span className="text-white text-lg">🎉</span>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
    
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="hidden md:block absolute bottom-6 left-1/2 transform -translate-x-1/2"
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
                </div>
            </motion.div>
            

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="md:hidden absolute bottom-4 left-0 right-0"
            >
                <div className="grid grid-cols-3 gap-2 px-4">
                    {[
                        { number: "500+", label: "Projects" },
                        { number: "50+", label: "Decorators" },
                        { number: "98%", label: "Happy Clients" }
                    ].map((stat, index) => (
                        <div key={index} className="text-center bg-black/40 backdrop-blur-sm rounded-lg py-2">
                            <h3 className="text-lg font-bold text-white">{stat.number}</h3>
                            <p className="text-gray-300 text-xs">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Banner;