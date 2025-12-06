import { Link } from 'react-router';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import logImg from '../../../../assets/Logo.png'

const Footer = () => {
    return (
        <footer className="footer flex flex-col footer-center p-10 bg-neutral text-neutral-content">
            {/* Top Section - Contact Details */}
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8 w-full max-w-7xl">

                <div className="space-y-2 text-left md:space-y-4">
                    <div className="flex items-center gap-3">
                        <FaPhone className="text-secondary text-xl" />
                        <div>
                            <p className="text-lg font-semibold">Call Us</p>
                            <p className="text-sm opacity-90">+880 1581885762</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <FaEnvelope className="text-secondary text-xl" />
                        <div>
                            <p className="text-lg font-semibold">Email Us</p>
                            <p className="text-sm opacity-90">ebrahimsikder2288@gmail.com</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <FaMapMarkerAlt className="text-secondary text-xl" />
                        <div>
                            <p className="text-lg font-semibold">Visit Us</p>
                            <p className="text-sm opacity-90">Narayanganj, Dhaka</p>
                        </div>
                    </div>
                </div>


                <div className="space-y-2 md:space-y-4">
                    <div className="flex items-center gap-3 justify-center">
                        <FaClock className="text-secondary text-2xl" />
                        <p className="text-xl font-bold">Working Hours</p>
                    </div>
                    <div className="space-y-2">
                        <p className="font-medium">Saturday - Thursday</p>
                        <p className="text-sm opacity-90">9:00 AM - 8:00 PM</p>
                        <p className="font-medium mt-4">Friday</p>
                        <p className="text-sm opacity-90">10:00 AM - 6:00 PM</p>
                    </div>
                </div>


                <div className="space-y-2 md:space-y-4">
                    <p className="text-xl font-bold">Follow Us</p>
                    <div className="flex justify-center gap-4">
                        <a href="#" className="btn btn-circle btn-outline hover:bg-primary hover:border-primary hover:text-white transition-all">
                            <FaFacebook className="text-xl" />
                        </a>
                        <a href="#" className="btn btn-circle btn-outline hover:bg-primary hover:border-primary hover:text-white transition-all">
                            <FaTwitter className="text-xl" />
                        </a>
                        <a href="#" className="btn btn-circle btn-outline hover:bg-primary hover:border-primary hover:text-white transition-all">
                            <FaInstagram className="text-xl" />
                        </a>
                        <a href="#" className="btn btn-circle btn-outline hover:bg-primary hover:border-primary hover:text-white transition-all">
                            <FaLinkedin className="text-xl" />
                        </a>
                    </div>
                    <p className="text-sm opacity-90 mt-4">Connect with us on social media</p>
                </div>
            </div>

            <div className="divider bg-white mx-auto my-1 h-px w-full max-w-6xl"></div>

            {/* Bottom Section - Copyright */}
            <div className="text-center">
                <div className="mb-4 flex flex-col items-center">
                    <img className='h-16 w-16 rounded-full border-2 border-white p-1' src={logImg} alt="" />
                    <div>
                        <Link to="/" className="text-2xl font-bold gradient-text">Smart Home</Link>
                        <p className="mt-2 opacity-90">Your one-stop solution for home & ceremony decorations</p>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-6 text-sm opacity-80">
                    <Link to="/privacy" >Privacy Policy</Link>
                    <Link to="/terms" >Terms of Service</Link>
                    <Link to="/faq" >FAQ</Link>
                    <Link to="/careers" >Careers</Link>
                </div>
                <p className="mt-6 opacity-70">
                    © {new Date().getFullYear()} Smart Home. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;