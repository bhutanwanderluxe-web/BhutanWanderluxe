import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';

const Footer = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <section className="footer-section bg-[#F3F4F5] dark:bg-gray-900 py-6 px-8 text-black dark:text-white">
            <div className="container flex flex-col sm:flex-row justify-between items-center gap-y-4">

                {/* Logo */}
                <div className="flex items-center gap-x-3 text-2xl font-semibold text-[#32af6f] dark:text-green-400">
                    <i className="bi bi-back"></i>
                    BhutanWanderluxe
                </div>

                {/* Links */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                    <ul className="flex flex-col sm:flex-row gap-3 text-[#777] dark:text-gray-300 text-sm">
                        {user?.role === 'user' && (
                            <>
                                <li
                                    className="cursor-pointer hover:text-[#32af6f] dark:hover:text-green-400"
                                    onClick={() => navigate('/about')}
                                >
                                    About Us
                                </li>
                                <li
                                    className="cursor-pointer hover:text-[#32af6f] dark:hover:text-green-400"
                                    onClick={() => navigate('/contact')}
                                >
                                    Contact Us
                                </li>
                            </>
                        )}
                    </ul>
                    <p className="text-[#777] dark:text-gray-400 text-xs sm:ml-4">
                        © 2025
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Footer;
