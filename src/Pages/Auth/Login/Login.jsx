import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { FaEnvelope, FaLock, FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';
import logoImg from '../../../assets/Logo.png'

const Login = () => {
    const { signIn, googleSignIn } = useAuth();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
 
    const from = location.state?.from || '/';
    console.log('Login page - Redirecting to:', from);
    
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.email || !formData.password) {
            toast.error('Please fill all fields');
            return;
        }

        setLoading(true);

        try {
            await signIn(formData.email, formData.password);
            toast.success('Login successful!');

            console.log('Login successful, navigating to:', from);
            navigate(from, { replace: true });
            
        } catch (error) {
            console.error('Login error:', error);
            
            let errorMsg = 'Login failed. Please check your credentials.';
            if (error.code === 'auth/user-not-found') {
                errorMsg = 'User not found. Please check your email.';
            } else if (error.code === 'auth/wrong-password') {
                errorMsg = 'Wrong password. Please try again.';
            } else if (error.code === 'auth/invalid-email') {
                errorMsg = 'Invalid email format.';
            } else if (error.code === 'auth/too-many-requests') {
                errorMsg = 'Too many attempts. Try again later.';
            }
            
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            await googleSignIn();
            toast.success('Google login successful!');
            
            console.log('Google login successful, navigating to:', from);
            navigate(from, { replace: true });
            
        } catch (error) {
            console.error('Google login error:', error);
            toast.error(error.message || 'Google login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md">
                
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <img className='rounded-full' src={logoImg} alt="" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-gray-600">
                        Sign in to your account to continue
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                                    placeholder="your@email.com"
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
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            <div className="flex justify-end mt-2">
                                <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <span className="loading loading-spinner loading-sm mr-2"></span>
                                    Signing in...
                                </span>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <div className="flex items-center my-8">
                        <div className="flex-1 border-t border-gray-300"></div>
                        <span className="px-4 text-gray-500 text-sm">OR</span>
                        <div className="flex-1 border-t border-gray-300"></div>
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="w-full border border-gray-300 py-3 rounded-lg font-medium flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                        <FaGoogle className="text-red-500 text-lg" />
                        Continue with Google
                    </button>

                    <div className="text-center mt-8">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <Link 
                                to="/auth/register" 
                                state={{ from: from }} 
                                className="text-blue-600 font-semibold hover:underline"
                            >
                                Create one
                            </Link>
                        </p>
                    </div>
                </div>

                {from !== '/' && (
                    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                        <p className="text-sm text-blue-700">
                            After login, you'll be redirected back to your booking
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                            {from}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;