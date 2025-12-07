import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaCamera } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';

const Register = () => {
    const { createUser, updateUserProfile, googleSignIn } = useAuth();
    const [loading, setLoading] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
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

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const validateForm = () => {
        if (formData.name === '') {
            Swal.fire('Error', 'Please enter your name', 'error');
            return false;
        }
        if (formData.email === '') {
            Swal.fire('Error', 'Please enter your email', 'error');
            return false;
        }
        if (!formData.email.includes('@')) {
            Swal.fire('Error', 'Please enter a valid email', 'error');
            return false;
        }
        if (formData.password === '') {
            Swal.fire('Error', 'Please enter a password', 'error');
            return false;
        }
        if (formData.password.length < 6) {
            Swal.fire('Error', 'Password must be at least 6 characters', 'error');
            return false;
        }
        if (formData.confirmPassword === '') {
            Swal.fire('Error', 'Please confirm your password', 'error');
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
            const userCredential = await createUser(formData.email, formData.password);
            const user = userCredential.user;

            let imageBBUrl = '';
            if (profileImage) {
                imageBBUrl = await uploadImageToImageBB(profileImage);
            }

            if (imageBBUrl) {
                await updateUserProfile(formData.name, imageBBUrl);
            } else {
                await updateUserProfile(formData.name, '');
            }

            const userData = {
                uid: user.uid,
                name: formData.name,
                email: user.email,
                photoURL: imageBBUrl,
                role: 'user',
                createdAt: new Date().toISOString()
            };

            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            const result = await response.json();

            if (result.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful!',
                    html: `
                        <div class="text-center">
                            <p class="text-lg font-medium">Welcome ${formData.name}!</p>
                            <p class="text-gray-600 mt-2">Your account has been created.</p>
                            <p class="text-sm text-gray-500 mt-3">Please login with your email and password.</p>
                        </div>
                    `,
                    showConfirmButton: true,
                    confirmButtonText: 'Go to Login'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/login');
                    }
                });
                
              
                setTimeout(() => {
                    navigate('/login');
                }, 3000);

            } else {
                Swal.fire('Error', 'Failed to save user data', 'error');
            }

        } catch (error) {
            console.error('Registration error:', error);
            
            let errorMsg = 'Registration failed';
            if (error.code === 'auth/email-already-in-use') {
                errorMsg = 'Email already in use';
            } else if (error.code === 'auth/weak-password') {
                errorMsg = 'Password is too weak (min 6 chars)';
            } else if (error.code === 'auth/invalid-email') {
                errorMsg = 'Invalid email address';
            } else if (error.code === 'auth/network-request-failed') {
                errorMsg = 'Network error. Check internet connection';
            } else if (error.code === 'auth/invalid-profile-attribute') {
                errorMsg = 'Profile photo issue. Try a different image.';
            }
            
            Swal.fire('Error', errorMsg, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-100 p-4">
            <div className="w-full max-w-lg">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
                        <FaUser className="text-white text-3xl" />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold gradient-text mb-2">
                        Create Account
                    </h1>
                    <p className="text-gray-600">Register first, then login</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
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
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Email Address</span>
                            </label>
                            <div className="relative">
                                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="input input-bordered w-full pl-10"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

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

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Profile Photo (Optional)</span>
                            </label>
                            <div className="relative">
                                <FaCamera className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="file-input file-input-bordered w-full pl-10"
                                />
                            </div>
                            {imagePreview && (
                                <div className="mt-3 flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-300">
                                        <img 
                                            src={imagePreview} 
                                            alt="Preview" 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <span className="text-sm text-green-600">
                                        ✓ Photo ready to upload
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="form-control mt-4">
                            <label className="label cursor-pointer justify-start gap-2">
                                <input 
                                    type="checkbox" 
                                    className="checkbox checkbox-primary" 
                                    required 
                                />
                                <span className="label-text">
                                    I agree to Terms & Privacy
                                </span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full mt-6 py-3 font-semibold"
                        >
                            {loading ? (
                                <>
                                    <span className="loading loading-spinner"></span>
                                    Creating Account...
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    <div className="divider my-6">OR</div>

                    <button
                        onClick={handleGoogleSignUp}
                        disabled={loading}
                        className="btn btn-outline w-full gap-3 py-3"
                    >
                        <FaGoogle className="text-red-500 text-lg" />
                        <span className="font-medium">Sign up with Google</span>
                    </button>

                    <div className="text-center mt-8">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary font-semibold hover:underline">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="mt-6 bg-base-200 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-600">
                        After registration, you will be redirected to login page.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;