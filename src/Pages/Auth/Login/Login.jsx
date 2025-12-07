import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { FaEnvelope, FaLock, FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import logoImg from '../../../assets/Logo.png'
import useAuth from '../../../hooks/useAuth';

const Login = () => {
    const { signIn, googleSignIn } = useAuth();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    
    // Get where user came from, or default to dashboard
    const from = location.state?.from?.pathname || '/';

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            await googleSignIn();
            Swal.fire('Success', 'Logged in with Google!', 'success');
            navigate(from, { replace: true });
        } catch (error) {
            Swal.fire('Error', error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.email || !formData.password) {
            Swal.fire('Error', 'Please fill all fields', 'error');
            return;
        }

        setLoading(true);

        try {
            await signIn(formData.email, formData.password);
            Swal.fire('Success', 'Login successful!', 'success');
            navigate(from, { replace: true });
        } catch (error) {
            let errorMsg = 'Login failed';
            if (error.code === 'auth/user-not-found') errorMsg = 'User not found';
            if (error.code === 'auth/wrong-password') errorMsg = 'Wrong password';
            if (error.code === 'auth/invalid-email') errorMsg = 'Invalid email';
            Swal.fire('Error', errorMsg, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-100 p-4">
            <div className="w-full max-w-md">
                
                <div className="text-center mb-8">
                    <div className="from-primary to-secondary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-2xl font-bold"><img src={logoImg} alt="" /></span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold gradient-text mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-gray-600 text-sm md:text-base">
                        Sign in to your account
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-5 md:p-8">
                    
                    <form onSubmit={handleSubmit} className="space-y-5 mt-6">
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
                                    className="input input-bordered w-full pl-5"
                                    placeholder="Your Email"
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
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="input input-bordered w-full pl-5 pr-10"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-gray-500"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            <div className="label">
                                <Link to="/forgot-password" className="label-text-alt text-primary hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full py-3 font-semibold text-lg"
                        >
                            {loading ? (
                                <>
                                    <span className="loading loading-spinner"></span>
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <div className="divider text-sm text-gray-500">OR</div>

                    <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="btn btn-outline w-full gap-3 mb-6 py-3 hover:bg-gray-50"
                    >
                        <FaGoogle className="text-red-500 text-lg" />
                        <span className="font-medium">Continue with Google</span>
                    </button>

                    <div className="text-center mt-8">
                        <p className="text-gray-600 text-sm">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-primary font-semibold hover:underline">
                                Create one
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="mt-6 bg-base-200 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-600 mb-2">After login, you will be redirected to:</p>
                    <div className="text-xs space-y-1">
                        <p className="text-gray-700"><strong>Regular User:</strong> Dashboard</p>
                        <p className="text-gray-700"><strong>Admin:</strong> Admin Dashboard</p>
                        <p className="text-gray-700"><strong>Decorator:</strong> Decorator Dashboard</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;