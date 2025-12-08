import React from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { FaMapMarkerAlt, FaPhone, FaClock, FaCheckCircle } from 'react-icons/fa';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


const ServiceMap = () => {

    const coverageAreas = [
        {
            id: 1,
            name: "Dhaka City",
            position: [23.8103, 90.4125],
            address: "Gulshan, Dhaka",
            phone: "+880 1234 567890",
            hours: "9:00 AM - 10:00 PM",
            projects: 250
        },
        {
            id: 2,
            name: "Chittagong",
            position: [22.3569, 91.7832],
            address: "Agrabad, Chittagong",
            phone: "+880 1234 567891",
            hours: "9:00 AM - 9:00 PM",
            projects: 180
        },
        {
            id: 3,
            name: "Sylhet",
            position: [24.8949, 91.8687],
            address: "Zindabazar, Sylhet",
            phone: "+880 1234 567892",
            hours: "10:00 AM - 8:00 PM",
            projects: 120
        },
        {
            id: 4,
            name: "Khulna",
            position: [22.8456, 89.5403],
            address: "Sonadanga, Khulna",
            phone: "+880 1234 567893",
            hours: "9:00 AM - 8:00 PM",
            projects: 95
        },
        {
            id: 5,
            name: "Rajshahi",
            position: [24.3745, 88.6042],
            address: "Seroil, Rajshahi",
            phone: "+880 1234 567894",
            hours: "10:00 AM - 7:00 PM",
            projects: 85
        }
    ];


    const center = [23.6850, 90.3563];
    const zoom = 8;

    const customIcon = new L.Icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Our Service Coverage Areas
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        We provide professional decoration services across major cities in Bangladesh
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                Service Coverage Details
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <FaCheckCircle className="text-green-500 text-xl mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Coverage Area</h4>
                                        <p className="text-gray-600">All major cities in Bangladesh</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <FaClock className="text-purple-500 text-xl mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Service Hours</h4>
                                        <p className="text-gray-600">8:00 AM - 10:00 PM (Daily)</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <FaMapMarkerAlt className="text-red-500 text-xl mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Cities Covered</h4>
                                        <p className="text-gray-600">5+ cities and expanding</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
                                <h4 className="font-bold text-gray-800 mb-2">Need service in another area?</h4>
                                <p className="text-gray-600 text-sm mb-3">
                                    Contact us to check if we can serve your location
                                </p>
                                <button className="btn btn-primary btn-sm w-full">
                                    Request Service Area
                                </button>
                            </div>
                        </div>


                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { number: "5+", label: "Cities" },
                                { number: "730+", label: "Projects" },
                                { number: "24/7", label: "Support" },
                                { number: "50+", label: "Teams" }
                            ].map((stat, index) => (
                                <div key={index} className="bg-white p-4 rounded-xl border border-gray-200 text-center">
                                    <h4 className="text-2xl font-bold text-purple-600">{stat.number}</h4>
                                    <p className="text-gray-600 text-sm">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>


                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2"
                    >
                        <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-xl h-[640px] relative">
                            <MapContainer
                                center={center}
                                zoom={zoom}
                                className="h-full w-full rounded-2xl"
                                scrollWheelZoom={false}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />

                                {coverageAreas.map((area) => (
                                    <Marker
                                        key={area.id}
                                        position={area.position}
                                        icon={customIcon}
                                    >
                                        <Popup className="custom-popup">
                                            <div className="p-2">
                                                <h3 className="font-bold text-lg text-gray-800">{area.name}</h3>
                                                <div className="space-y-2 mt-2">
                                                    <p className="text-gray-600 flex items-center gap-2">
                                                        <FaMapMarkerAlt className="text-red-500" />
                                                        {area.address}
                                                    </p>
                                                    <p className="text-gray-600 flex items-center gap-2">
                                                        <FaPhone className="text-green-500" />
                                                        {area.phone}
                                                    </p>
                                                    <p className="text-gray-600 flex items-center gap-2">
                                                        <FaClock className="text-purple-500" />
                                                        {area.hours}
                                                    </p>
                                                    <div className="mt-3">
                                                        <span className="inline-block bg-purple-100 text-purple-800 text-sm font-semibold px-3 py-1 rounded-full">
                                                            {area.projects} projects completed
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Popup>
                                    </Marker>
                                ))}
                            </MapContainer>


                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg max-w-xs">
                                <h4 className="font-bold text-gray-800 text-sm mb-1">Service Coverage Map</h4>
                                <p className="text-gray-600 text-xs">
                                    Click on markers to see service details in each city
                                </p>
                            </div>


                            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                                <h4 className="font-bold text-gray-800 text-sm mb-2">Legend</h4>
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <span className="text-gray-600 text-xs">Service Available</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span className="text-gray-600 text-xs">Coming Soon</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ServiceMap;