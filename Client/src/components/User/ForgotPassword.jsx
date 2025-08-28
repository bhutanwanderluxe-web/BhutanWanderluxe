import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';

const ForgotPassword = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/'); // or '/dashboard' or wherever logged-in users go
        }
    }, [user, navigate]);

    const [email, setEmail] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendOTP = async () => {
        if (!email) return alert("Please enter your email.");

        try {
            setLoading(true);
            await axios.post(
                'https://bhutanwanderluxe.onrender.com/api/v1/users/forgotPassword',
                { email },
                { headers: { 'Content-Type': 'application/json' } }
            );

            alert("OTP has been sent to your email!");
            setOtpSent(true);
        } catch (error) {
            console.error(error);
            alert("Failed to send OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        if (!otp) return alert("Please enter the OTP.");
        try {
            setLoading(true);
            const res = await axios.post(
                'https://bhutanwanderluxe.onrender.com/api/v1/users/verifyOTP',
                { email, otp },
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (res.data.status === 'success') {
                alert("OTP verified!");
                navigate('/reset-password', { state: { email } });
            } else {
                alert("Invalid OTP. Try again.");
            }
        } catch (error) {
            console.error(error);
            alert("OTP verification failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-16 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md px-4">
                <h2 className="text-2xl font-bold text-center mb-6">
                    {otpSent ? 'Enter OTP' : 'Forgot Password'}
                </h2>

                <div className="flex flex-col gap-4">
                    {!otpSent && (
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full border-b-2 border-[#32af6f] px-2 py-3 focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    )}

                    {otpSent && (
                        <>
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                className="w-full border-b-2 border-[#32af6f] px-2 py-3 focus:outline-none"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />

                            <button
                                onClick={handleSendOTP}
                                disabled={loading}
                                className={`w-full py-2 rounded-xl text-sm font-medium transition ${loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#dbeafe] text-[#1e3a8a] hover:bg-[#bfdbfe] cursor-pointer'
                                    }`}
                            >
                                {loading ? 'Resending OTP...' : 'Resend OTP'}
                            </button>
                        </>
                    )}

                    <button
                        onClick={otpSent ? handleVerifyOTP : handleSendOTP}
                        disabled={loading}
                        className={`w-full py-3 rounded-2xl text-white text-lg font-medium transition ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#32af6f] hover:bg-[#27975f] cursor-pointer'
                            }`}
                    >
                        {loading
                            ? otpSent
                                ? 'Verifying OTP...'
                                : 'Sending OTP...'
                            : otpSent
                                ? 'Verify OTP'
                                : 'Send OTP'}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ForgotPassword;
