import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const BookingSection = ({ tour }) => {
    const navigate = useNavigate();
    const { user, token } = useAuth();

    const [showModal, setShowModal] = useState(false);

    const handleBookNow = async () => {
        if (!token || !user?._id) {
            toast.error("Please log in to book a tour.");
            navigate("/login");
            return;
        }

        try {
            const response = await axios.post(
                "https://bhutanwanderluxe.onrender.com/api/v1/bookings/",
                {
                    tour: tour._id,
                    user: user._id,
                    price: tour.price,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            toast.success("Booking successful!");
            setShowModal(false);
        } catch (error) {
            console.error("Booking failed:", error.response?.data || error.message);
            toast.error("Booking failed. Please try again.");
        }
    };

    return (
        <section className="booking-section flex justify-center py-10 px-0 lg:py-16 lg:px-10 bg-[#F3F4F5] border">
            <div className="container flex flex-col lg:flex-row px-4 lg:px-16 py-10 rounded-xl bg-white">

                {/* Tour Images */}
                <div className="md:w-2/6 relative h-32 hidden lg:block">
                    {tour.images &&
                        tour.images.slice(0, 3).map((img, index) => (
                            <img
                                key={index}
                                className={`w-32 h-32 object-cover rounded-full absolute left-${index * 10} z-${40 - index * 10}`}
                                src={img}
                                alt={`Tour image ${index + 1}`}
                            />
                        ))}
                </div>

                {/* Booking Content */}
                <div className="lg:w-4/6 flex flex-col gap-y-5 lg:flex-row items-center justify-center lg:gap-x-5">
                    <div>
                        <h1 className="text-[#32af6f] text-3xl font-bold">
                            WHAT ARE YOU WAITING FOR?
                        </h1>
                        <p className="text-lg text-[#777]">
                            {tour.duration} days. 1 adventure. Infinite memories. Make it yours today!
                        </p>
                    </div>
                    <motion.div whileHover={{ y: -2 }}>
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-[#32af6f] text-white text-xl font-bold p-3 rounded-3xl"
                        >
                            Book Now
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-md w-96">
                        <h2 className="text-lg font-bold mb-4">Confirm Booking</h2>
                        <p className="mb-4">Are you sure you want to book this tour for ${tour.price}?</p>
                        <div className="flex justify-end gap-4">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-[#32af6f] text-white rounded"
                                onClick={handleBookNow}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default BookingSection;
