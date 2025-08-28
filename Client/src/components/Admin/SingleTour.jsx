import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';

const SingleTour = ({ tour, onDelete }) => {
    const navigate = useNavigate();
    const { user, token } = useAuth();

    const deleteTour = async (id) => {
        if (!user || !token) return navigate("/login");

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            await axios.delete(`https://bhutanwanderluxe.onrender.com/api/v1/tours/${id}`, config);
            onDelete(id);
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Failed to delete tour.');
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-4 border rounded-xl shadow-md p-4 w-full">
            {/* Tour Image */}
            <div className="w-full lg:w-2/6">
                <img
                    className="w-full h-48 sm:h-64 lg:h-full object-cover rounded-xl"
                    src={tour.imageCover}
                    alt={tour.name}
                />
            </div>

            {/* Tour Info */}
            <div className="w-full lg:w-4/6 flex flex-col gap-y-4 justify-between">
                {/* Top: Tour title, difficulty, duration */}
                <div className="flex flex-wrap gap-2 items-center">
                    <h1 className="text-xl sm:text-2xl font-bold">{tour.name}</h1>
                    <p className="text-sm sm:text-base bg-gray-100 px-2 py-1 rounded"><strong>Difficulty:</strong> {tour.difficulty}</p>
                    <p className="text-sm sm:text-base"><strong>Duration:</strong> {tour.duration}-day tour</p>
                </div>

                {/* Summary */}
                <div>
                    <p className="text-[#777] text-sm sm:text-base italic">{tour.summary}</p>
                </div>

                {/* Price and Ratings */}
                <div className="flex flex-wrap justify-between items-center gap-4">
                    <div className="flex flex-col gap-1 text-sm sm:text-base">
                        <span><strong>Price:</strong> ${tour.price}</span>
                        <span><strong>Ratings:</strong> {tour.ratingsAverage} / {tour.ratingsQuantity}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2">
                        <button
                            className="bg-[#32af6f] text-white px-4 py-2 rounded-lg hover:bg-[#2e9c60] transition"
                            onClick={() => navigate('/admin/update-tour', { state: { tour } })}
                        >
                            Edit Tour
                        </button>
                        <button
                            className="bg-[#C70039] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                            onClick={() => {
                                if (confirm("Are you sure you want to delete this tour?")) {
                                    deleteTour(tour.id);
                                }
                            }}
                        >
                            Delete Tour
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleTour;
