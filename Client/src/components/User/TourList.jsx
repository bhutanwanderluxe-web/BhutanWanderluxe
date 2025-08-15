import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser } from "../ContextConfig/ContextConfig";
import { useAuth } from "../AuthContext/AuthContext";

const TourList = () => {
    const {
        tours,
        loading,
        error,
        currentPage,
        totalPages,
        setCurrentPage,
        fetchData,
    } = useUser();

    const { user, token } = useAuth(); //  get user & token from context
    const [showModal, setShowModal] = useState(false);
    const [selectedTour, setSelectedTour] = useState(null);
    const [bookingLoading, setBookingLoading] = useState(false);

    const handleConfirm = async () => {
        if (!selectedTour) return;

        if (!user || !token || !user._id) {
            toast.error("You must be logged in to book.");
            setShowModal(false);
            return;
        }

        setBookingLoading(true);
        try {
            await axios.post(
                "http://localhost:5000/api/v1/bookings/",
                {
                    tour: selectedTour._id,
                    user: user._id,
                    price: selectedTour.price,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            toast.success("Booking successful!");
            // Optionally trigger a re-fetch here
            // fetchData(currentPage);
        } catch (error) {
            toast.error("Booking failed. Please try again later.");
        }
        setBookingLoading(false);
        setShowModal(false);
    };

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages || page === currentPage) return;
        setCurrentPage(page);
        fetchData(page);
    };

    return (
        <div className="flex flex-col items-center gap-y-10 px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
                {loading ? (
                    <p className="text-center col-span-full">Loading tours...</p>
                ) : error ? (
                    <p className="text-red-500 col-span-full">{error}</p>
                ) : (
                    tours.map((tour) => (
                        <div
                            key={tour._id}
                            className="border p-3 bg-white rounded-xl flex flex-col shadow-md hover:shadow-lg transition duration-300"
                        >
                            <div className="w-full h-[200px] overflow-hidden rounded">
                                <img
                                    className="w-full h-full object-cover"
                                    src={tour.imageCover}
                                    alt={tour.name}
                                />
                            </div>
                            <div className="flex flex-col gap-y-2 mt-3 flex-1">
                                <h1 className="text-xl font-bold">{tour.name}</h1>
                                <p className="text-[#777] text-sm italic">{tour.summary}</p>
                                <div className="text-[#777] text-sm">
                                    <span className="uppercase font-medium">
                                        {tour.difficulty}
                                    </span>{" "}
                                    {tour.duration}-day tour
                                </div>
                                <div className="flex justify-between text-sm text-[#777]">
                                    <span>
                                        <i className="bi bi-geo-alt text-[#32af6f] mr-1"></i>
                                        {tour.location}
                                    </span>
                                    <span>
                                        <i className="bi bi-person text-[#32af6f] mr-1"></i>
                                        {tour.maxGroupSize}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm text-[#777]">
                                    <span>
                                        <strong>${tour.price}</strong> per person
                                    </span>
                                    <span>
                                        <strong>{tour.ratingsAverage}</strong> rating
                                    </span>
                                </div>
                                <div className="flex justify-between mt-4">
                                    <motion.div
                                        whileHover={{ y: -2 }}
                                        className="px-3 py-2 bg-[#32af6f] text-white rounded-xl text-sm"
                                    >
                                        <Link to={`/product/${tour._id}`}>Details</Link>
                                    </motion.div>
                                    <motion.button
                                        whileHover={{ y: -2 }}
                                        className="px-4 py-2 bg-[#C70039] text-white rounded-xl text-sm"
                                        onClick={() => {
                                            setSelectedTour(tour);
                                            setShowModal(true);
                                        }}
                                        disabled={bookingLoading}
                                    >
                                        {bookingLoading && selectedTour?._id === tour._id ? (
                                            <svg
                                                className="animate-spin h-5 w-5 mr-2 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8v8z"
                                                ></path>
                                            </svg>
                                        ) : (
                                            "Book"
                                        )}
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Prev
                    </button>

                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => handlePageChange(i + 1)}
                            className={`px-3 py-1 rounded ${currentPage === i + 1
                                ? "bg-[#32af6f] text-white"
                                : "bg-gray-100 hover:bg-gray-200"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Booking Modal */}
            <AnimatePresence>
                {showModal && selectedTour && (
                    <motion.div
                        className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white p-6 rounded-lg shadow-lg flex flex-col gap-y-4 w-[300px]"
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -50, opacity: 0 }}
                        >
                            <h2 className="text-lg font-bold text-center">Confirm Booking</h2>
                            <p className="text-center text-sm">
                                Do you want to book <b>{selectedTour.name}</b> for ${selectedTour.price}?
                            </p>
                            <div className="flex justify-around gap-x-4 mt-4">
                                <button
                                    className="px-4 py-2 bg-[#32af6f] text-white rounded-md"
                                    onClick={handleConfirm}
                                    disabled={bookingLoading}
                                >
                                    {bookingLoading ? "Booking..." : "Confirm"}
                                </button>
                                <button
                                    className="px-4 py-2 bg-gray-400 text-white rounded-md"
                                    onClick={() => setShowModal(false)}
                                    disabled={bookingLoading}
                                >
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TourList;
