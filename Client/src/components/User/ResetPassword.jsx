import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const { email } = location.state || {};
        if (!email) {
            alert("Missing email. Please go back and verify first.");
            return navigate('/forgot-password');
        }
        setEmail(email);
    }, [location, navigate]);

    const handleResetPassword = async () => {
        if (!password || !passwordConfirm) {
            return alert("Please fill in both password fields.");
        }

        if (password !== passwordConfirm) {
            return alert("Passwords do not match.");
        }

        try {
            setLoading(true);
            const response = await axios.patch(
                'https://bhutanwanderluxe.onrender.com/api/v1/users/resetPasswordAfterVerify',
                {
                    email,
                    password,
                    passwordConfirm,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            alert("Password reset successful!");
            navigate('/login');
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Failed to reset password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="reset-password-section py-16 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md px-4">
                <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
                <div className="flex flex-col gap-4">
                    <input
                        type="password"
                        placeholder="New Password"
                        className="w-full border-b-2 border-[#32af6f] px-2 py-3 focus:outline-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full border-b-2 border-[#32af6f] px-2 py-3 focus:outline-none"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                    />

                    <button
                        onClick={handleResetPassword}
                        disabled={loading}
                        className={`w-full py-3 rounded-2xl text-white text-lg font-medium transition ${loading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-[#32af6f] hover:bg-[#27975f] cursor-pointer'
                            }`}
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ResetPassword;
