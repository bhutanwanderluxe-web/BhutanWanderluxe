import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';

const UpdateProfile = ({ handleClose }) => {
    const navigate = useNavigate();
    const { user, token, updateUser } = useAuth();

    const [name, setName] = useState(user?.name || '');
    // const [email, setEmail] = useState(user?.email || '');
    const [photo, setPhoto] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChanges = async () => {
        if (!token) {
            navigate('/login');
            return;
        }

        setError(null);
        setLoading(true);

        try {
            const formData = new FormData();
            if (name) formData.append('name', name);
            // if (email) formData.append('email', email);
            if (photo) formData.append('photo', photo);

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axios.patch(
                'http://localhost:5000/api/v1/users/updateMe',
                formData,
                config
            );

            if (data.status === 'success') {
                // Update user info in context
                updateUser(data.data); // Assuming your context has this method
                handleClose();
            } else {
                setError('Failed to update profile.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="update-profile-section flex flex-col gap-y-3 p-5">
            <div>
                <input
                    className="w-full rounded-lg"
                    type="text"
                    placeholder="Update name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div>
                <input
                    className="w-full rounded-lg"
                    type="file"
                    onChange={(e) => setPhoto(e.target.files[0])}
                />
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <div className="flex justify-center gap-x-2">
                <button
                    className="border p-2 w-[150px] text-center rounded-lg text-lg bg-[#32af6f] text-white hover:cursor-pointer"
                    onClick={handleChanges}
                    disabled={loading}
                >
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                    className="border p-2 w-[150px] text-center rounded-lg text-lg bg-[#C70039] hover:cursor-pointer"
                    onClick={handleClose}
                    disabled={loading}
                >
                    Close
                </button>
            </div>
        </section>
    );
};

export default UpdateProfile;
