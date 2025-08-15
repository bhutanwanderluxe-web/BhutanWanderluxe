import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../AuthContext/AuthContext';
const Contact = () => {
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        message: '',
    });

    useEffect(() => {
        if (user?.email) {
            setFormData(prev => ({ ...prev, email: user.email }));
        }
    }, [user]);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();

        if (!user?.token) {
            toast.error("You must be logged in.");
            return;
        }

        try {
            await axios.post(
                "http://localhost:5000/api/v1/users/contact/send",
                {
                    email: formData.email,
                    message: formData.message,
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

            toast.success("Message sent!");
            setFormData(prev => ({ ...prev, message: '' }));
        } catch (error) {
            console.error(error);
            toast.error("Failed to send message.");
        }
    };

    return (
        <section className="min-h-screen py-16 px-4 sm:px-10 bg-white dark:bg-gray-900 text-black dark:text-white">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-4xl font-bold mb-8 text-center text-[#32af6f]">Contact Us</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800"
                            disabled
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Message</label>
                        <textarea
                            name="message"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800"
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-[#32af6f] hover:bg-[#2a995e] text-white font-semibold rounded-lg transition"
                    >
                        Send Message
                    </button>
                </form>
                <ToastContainer />
            </div>
        </section>
    );
};

export default Contact;
