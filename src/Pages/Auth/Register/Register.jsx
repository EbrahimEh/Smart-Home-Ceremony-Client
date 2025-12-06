import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaGoogle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';


const Register = () => {
    const { createUser, updateUserProfile, googleSignIn } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
            Swal.fire('Error', 'Name is required', 'error');
            return false;
        }
        if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            Swal.fire('Error', 'Valid email is required', 'error');
            return false;
        }
        if (formData.password.length < 6) {
            Swal.fire('Error', 'Password must be at least 6 characters', 'error');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            Swal.fire('Error', 'Passwords do not match', 'error');
            return false;
        }
        return true;
    };

    const handleGoogleSignUp = async () => {
        try {
            setLoading(true);
            await googleSignIn();
            Swal.fire('Success', 'Account created with Google', 'success');
            navigate('/');
        } catch (error) {
            Swal.fire('Error', error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setLoading(true);

        try {
            const userCredential = await createUser(formData.email, formData.password);
            const user = userCredential.user;

            if (formData.name) {
                await updateUserProfile(formData.name, '');
            }

            // Save to MongoDB
            const userData = {
                uid: user.uid,
                name: formData.name,
                email: user.email,
                role: 'user'
            };

            await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            Swal.fire('Success', `Welcome ${formData.name}!`, 'success');
            navigate('/');

        } catch (error) {
            let errorMsg = 'Registration failed';
            if (error.code === 'auth/email-already-in-use') errorMsg = 'Email already exists';
            if (error.code === 'auth/weak-password') errorMsg = 'Password too weak';
            Swal.fire('Error', errorMsg, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-100 p-4">
            <div className="w-full max-w-lg">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold gradient-text mb-2">
                        Create Account
                    </h1>
                    <p className="text-gray-600 text-sm md:text-base">
                        Join Smart Home Services
                    </p>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-xl shadow-lg p-5 md:p-8">
                    

                    
                    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                        {/* Name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Full Name</span>
                            </label>
                            <div className="relative">
                                <FaUser className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="input input-bordered w-full pl-10"
                                    placeholder="Your name"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <div className="relative">
                                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="input input-bordered w-full pl-10"
                                    placeholder="email@example.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Password</span>
                            </label>
                            <div className="relative">
                                <FaLock className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="input input-bordered w-full pl-10"
                                    placeholder="At least 6 characters"
                                    required
                                />
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Confirm Password</span>
                            </label>
                            <div className="relative">
                                <FaLock className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="input input-bordered w-full pl-10"
                                    placeholder="Re-enter password"
                                    required
                                />
                            </div>
                        </div>

                        {/* Terms */}
                        <div className="form-control mt-4">
                            <label className="label cursor-pointer justify-start gap-2">
                                <input 
                                    type="checkbox" 
                                    className="checkbox checkbox-primary checkbox-sm" 
                                    required 
                                />
                                <span className="label-text text-sm">
                                    I agree to Terms & Privacy
                                </span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full mt-6 py-3 font-semibold"
                        >
                            {loading ? (
                                <>
                                    <span className="loading loading-spinner"></span>
                                    Creating...
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    <div className="divider text-sm">OR</div>

                    {/* Google Button */}
                    <button
                        onClick={handleGoogleSignUp}
                        disabled={loading}
                        className="btn btn-outline w-full gap-3 mb-6 py-3"
                    >
                        <FaGoogle className="text-red-500" />
                        Sign up with Google
                    </button>

                    

                 
                    <div className="text-center mt-6">
                        <p className="text-gray-600 text-sm">
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary font-semibold hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="hidden md:block mt-8">
                    <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-white">
                        <h3 className="font-bold text-lg mb-4">Why Join Us?</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-2">
                                <span className="bg-white text-primary rounded-full p-1">✓</span>
                                Easy online booking
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="bg-white text-primary rounded-full p-1">✓</span>
                                Track your orders
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="bg-white text-primary rounded-full p-1">✓</span>
                                Member discounts
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;