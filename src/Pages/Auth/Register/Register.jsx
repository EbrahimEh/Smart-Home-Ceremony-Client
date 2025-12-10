import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaCamera } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';
import logoImg from '../../../assets/Logo.png'

const Register = () => {
    const { createUser, updateUserProfile, googleSignIn } = useAuth();
    const [loading, setLoading] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

 
    const from = location.state?.from || '/';
    console.log('Register page - Will redirect to:', from);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error('Image size should be less than 5MB');
                return;
            }

            if (!file.type.startsWith('image/')) {
                toast.error('Please upload an image file');
                return;
            }

            setProfileImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const validateForm = () => {
        if (formData.name.trim() === '') {
            toast.error('Please enter your name');
            return false;
        }
        if (formData.email.trim() === '') {
            toast.error('Please enter your email');
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            toast.error('Please enter a valid email address');
            return false;
        }
        if (formData.password === '') {
            toast.error('Please enter a password');
            return false;
        }
        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return false;
        }
        if (formData.confirmPassword === '') {
            toast.error('Please confirm your password');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return false;
        }
        return true;
    };

    const handleGoogleSignUp = async () => {
        try {
            setLoading(true);
            await googleSignIn();
            toast.success('Account created with Google!');


            console.log('Google registration successful, navigating to:', from);
            navigate(from, { replace: true });

        } catch (error) {
            console.error('Google signup error:', error);
            toast.error(error.message || 'Google signup failed');
        } finally {
            setLoading(false);
        }
    };

    const uploadImageToImageBB = async (imageFile) => {
        try {
            const formData = new FormData();
            formData.append('image', imageFile);

            const response = await fetch('https://api.imgbb.com/1/upload?key=3f9f843508f62c0d3183182e3a0db5d0', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                return data.data.url;
            } else {
                throw new Error('Image upload failed');
            }
        } catch (error) {
            console.error('ImageBB upload error:', error);
            return '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            let imageBBUrl = '';
            if (profileImage) {
                imageBBUrl = await uploadImageToImageBB(profileImage);
            }

            if (!imageBBUrl) {
                imageBBUrl = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
            }

            const userCredential = await createUser(
                formData.email,
                formData.password,
                formData.name,
                imageBBUrl
            );

            const user = userCredential.user;

            const userData = {
                uid: user.uid,
                name: formData.name,
                email: user.email,
                photoURL: imageBBUrl,
                role: 'user',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            const result = await response.json();

            if (result.success) {
                Swal.fire({
                    icon: 'success',
                    title: `Welcome ${formData.name}!`,
                    text: 'Account created successfully',
                    timer: 2000,
                    showConfirmButton: false
                });
                console.log('Registration successful, navigating to:', from);
                navigate(from, { replace: true });

            } else {
                throw new Error('Failed to save user data to database');
            }

        } catch (error) {
            console.error('Registration error:', error);

            let errorMsg = 'Registration failed. Please try again.';
            if (error.code === 'auth/email-already-in-use') {
                errorMsg = 'Email already in use. Please use a different email.';
            } else if (error.code === 'auth/weak-password') {
                errorMsg = 'Password is too weak. Use at least 6 characters.';
            } else if (error.code === 'auth/invalid-email') {
                errorMsg = 'Invalid email address.';
            } else if (error.code === 'auth/network-request-failed') {
                errorMsg = 'Network error. Please check your internet connection.';
            }

            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-lg">

                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <img className='rounded-full' src={logoImg} alt="" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Create Account
                    </h1>
                    <p className="text-gray-600">
                        Join Smart Home Services
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">

                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="At least 6 characters"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Re-enter your password"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Profile Photo (Optional)
                            </label>
                            <div className="relative">
                                <FaCamera className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                                />
                            </div>

                            {imagePreview ? (
                                <div className="mt-3 flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-green-600">✓ Photo ready to upload</p>
                                        <p className="text-xs text-gray-500">Will appear in your profile</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="mt-3 flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300 flex items-center justify-center bg-gray-200">
                                        <FaUser className="text-gray-400 text-2xl" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">No photo selected</p>
                                        <p className="text-xs text-gray-500">Default avatar will be used</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex items-start gap-3 mt-6">
                            <input
                                type="checkbox"
                                id="terms"
                                className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                required
                            />
                            <label htmlFor="terms" className="text-sm text-gray-600">
                                I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 mt-4"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <span className="loading loading-spinner loading-sm mr-2"></span>
                                    Creating Account...
                                </span>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                
                    <div className="flex items-center my-8">
                        <div className="flex-1 border-t border-gray-300"></div>
                        <span className="px-4 text-gray-500 text-sm">OR</span>
                        <div className="flex-1 border-t border-gray-300"></div>
                    </div>

                    <button
                        onClick={handleGoogleSignUp}
                        disabled={loading}
                        className="w-full border border-gray-300 py-3 rounded-lg font-medium flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                        <FaGoogle className="text-red-500 text-lg" />
                        Sign up with Google
                    </button>

                    <div className="text-center mt-8">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link
                                to="/auth/login"
                                state={{ from: from }}
                                className="text-blue-600 font-semibold hover:underline"
                            >
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>

        
                {from !== '/' && (
                    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                        <p className="text-sm text-blue-700">
                            After registration, you'll be redirected back to your booking
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Register;