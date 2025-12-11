import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { FaSearch, FaFilter, FaStar } from 'react-icons/fa';
import { BallTriangle } from 'react-loader-spinner';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/services');
            if (!response.ok) throw new Error('Failed to fetch services');

            const data = await response.json();
            console.log('Services loaded:', data);

            data.forEach(service => {
                console.log(`Service: ${service.service_name}, ID: ${service._id}, Type: ${typeof service._id}`);
            });

            setServices(data);
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            setLoading(false);
        }
    };


    const filteredServices = services.filter(service => {
        const matchesSearch = service.service_name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = !category || service.category === category;
        return matchesSearch && matchesCategory;
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                render(<BallTriangle
                    height={100}
                    width={100}
                    radius={5}
                    color="#4fa94d"
                    ariaLabel="ball-triangle-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />)
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Our Decoration Services
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Choose from our wide range of professional decoration services
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="flex-1 relative">
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search services..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="input input-bordered w-full pl-10"
                        />
                    </div>
                    <div className="relative">
                        <FaFilter className="absolute left-3 top-3 text-gray-400" />
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="select select-bordered w-full pl-10"
                        >
                            <option value="">All Categories</option>
                            <option value="home">Home Decoration</option>
                            <option value="wedding">Wedding</option>
                            <option value="office">Office</option>
                            <option value="event">Event</option>
                            <option value="birthday">Birthday</option>
                            <option value="corporate">Corporate</option>
                            <option value="seminar">Seminar</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredServices.map((service) => (
                        <div key={service._id} className="card bg-base-100 shadow-xl">
                            <figure className="h-48">
                                <img
                                    src={service.image || 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&auto=format&fit=crop'}
                                    alt={service.service_name}
                                    className="w-full h-full object-cover"
                                />
                            </figure>
                            <div className="card-body">
                                <div className="flex justify-between items-start">
                                    <h2 className="card-title">{service.service_name}</h2>
                                    {service.popular && (
                                        <span className="badge badge-secondary">Popular</span>
                                    )}
                                </div>
                                <div className="badge badge-outline">{service.category}</div>
                                <p className="text-gray-600 line-clamp-2">{service.description}</p>
                                <div className="flex items-center justify-between mt-4">
                                    <div>
                                        <div className="flex items-center gap-1 text-yellow-500">
                                            <FaStar />
                                            <span className="font-bold">{service.rating || 4.5}</span>
                                        </div>
                                        <span className="text-sm text-gray-500">{service.duration}</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xl font-bold">BDT {service.cost?.toLocaleString()}</div>
                                        <div className="text-sm text-gray-500">/{service.unit}</div>
                                    </div>
                                </div>
                                <div className="card-actions justify-end mt-4">
                                    <Link
                                        to={`/services/${service._id}`}
                                        onClick={() => console.log('Navigating to service ID:', service._id)}
                                    >
                                        <button className="btn btn-primary">View Details</button>
                                    </Link>
                                </div>
                                <div className="text-xs text-gray-400 mt-2">
                                    ID: {service._id?.toString().substring(0, 20)}...
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredServices.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No services found</p>
                        <button
                            onClick={() => {
                                setSearch('');
                                setCategory('');
                            }}
                            className="btn btn-outline mt-4"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Services;