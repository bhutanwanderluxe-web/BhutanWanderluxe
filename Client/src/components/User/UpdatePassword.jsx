import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';

const UpdatePassword = ({ handleClose }) => {
    const navigate = useNavigate();
    const { user, token } = useAuth();

    const [passwordCurrent, setPasswordCurrent] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState(null);

    const handleChanges = async () => {
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axios.patch(
                'https://bhutanwanderluxe.onrender.com/api/v1/users/updateMyPassword',
                { passwordCurrent, password, passwordConfirm },
                config
            );

            console.log(data); // You can optionally update user data in context here
            handleClose(); // Close modal if password update succeeds
        } catch (error) {
            console.error(error);
            setError(
                error.response?.data?.message || 'Password update failed. Please try again.'
            );
        }
    };

    return (
        <section className="update-profile-section flex flex-col gap-y-3 p-5">
            <div>
                <input
                    className="w-full rounded-lg"
                    type="password"
                    placeholder="current password"
                    value={passwordCurrent}
                    onChange={(e) => setPasswordCurrent(e.target.value)}
                />
            </div>
            <div>
                <input
                    className="w-full rounded-lg"
                    type="password"
                    placeholder="new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <input
                    className="w-full rounded-lg"
                    type="password"
                    placeholder="confirm new password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                />
            </div>

            {error && (
                <div className="text-red-600 text-sm font-medium">{error}</div>
            )}

            <div className="flex justify-center gap-x-2">
                <div
                    className="border p-2 w-[150px] text-center rounded-lg text-lg bg-[#32af6f] text-white hover:cursor-pointer"
                    onClick={handleChanges}
                >
                    Save Changes
                </div>
                <div
                    className="border p-2 w-[150px] text-center rounded-lg text-lg bg-[#C70039] hover:cursor-pointer"
                    onClick={handleClose}
                >
                    Close
                </div>
            </div>
        </section>
    );
};

export default UpdatePassword;
