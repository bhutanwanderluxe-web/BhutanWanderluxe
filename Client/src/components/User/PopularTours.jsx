import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import "./PopularTours.css";

const PopularTours = () => {
    const [tours, setTours] = useState([]);
    const { user, token } = useAuth();

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/v1/tours/top-5-cheap");
                const sorted = res.data.doc?.sort((a, b) => b.ratingsAverage - a.ratingsAverage);
                const top3 = sorted.slice(0, 3);
                setTours(top3);
            } catch (error) {
                console.error("Error fetching tours:", error);
            }
        };

        fetchTours();
    }, []);
    // console.log("token",token);

    const handleBookNow = async (tourId, price) => {
        if (!token || !user?._id) {
            alert("You must be logged in to make a booking.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:5000/api/v1/bookings/",
                { tour: tourId, user: user._id, price },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Booking response:", response.data);
            alert("Booking successful!");
        } catch (error) {
            console.error("Booking failed:", error.response?.data || error.message);
            alert("Booking failed. Please log in again or try later.");
        }
    };

    return (
        <section
            style={{ backgroundColor: "#F3F4F5" }}
            className="popular-tours-section flex justify-center py-16"
        >
            <div className="container flex flex-col gap-y-5">
                <div className="flex justify-center">
                    <h1 className="text-4xl font-extrabold text-[#32af6f] text-center">
                        MOST POPULAR TOURS
                    </h1>
                </div>

                <div className="popular-tours flex flex-col-reverse items-center justify-center gap-y-10 py-10 px-2 md:flex-row md:gap-x-10">
                    {tours.map((tour) => (
                        <div
                            key={tour._id}
                            className="relative tour-card w-[300px] sm:w-[350px] h-[400px]"
                        >
                            <div className="front absolute border h-full w-full flex flex-col gap-y-3">
                                <div className="relative border h-[58%]">
                                    <img
                                        className="h-full w-full object-cover"
                                        src={tour.imageCover}
                                        alt={tour.name}
                                    />
                                    <div className="absolute bottom-0 right-[10px] flex flex-col items-end">
                                        <span
                                            className="px-3 py-2 text-3xl text-white font-extrabold"
                                            style={{ backgroundColor: "#32af6f", opacity: 0.8 }}
                                        >
                                            {tour.name.split(" ")[0].toUpperCase()}
                                        </span>
                                        <span
                                            className="px-3 py-2 text-3xl text-white font-extrabold"
                                            style={{ backgroundColor: "#32af6f", opacity: 0.8 }}
                                        >
                                            {tour.name.split(" ").slice(1).join(" ").toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                                <div className="py-2 px-5">
                                    <div className="border-b flex justify-center p-2 item-center">
                                        {tour.duration} days tour
                                    </div>
                                    <div className="border-b flex justify-center p-2 item-center">
                                        Up to {tour.maxGroupSize} people
                                    </div>
                                    <div className="flex justify-center p-2 item-center">
                                        Difficulty: {tour.difficulty}
                                    </div>
                                </div>
                            </div>
                            <div
                                style={{ backgroundColor: "#32af6f" }}
                                className="back absolute h-full w-full border flex flex-col px-10 py-16 gap-y-8 justify-center items-center"
                            >
                                <span className="text-2xl text-white">ONLY</span>
                                <span className="text-2xl text-white">${tour.price}</span>
                                <button
                                    onClick={() => handleBookNow(tour._id, tour.price)}
                                    className="border p-4 rounded-[30px] bg-white text-[#777] text-[400]"
                                >
                                    BOOK NOW!
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="py-10 flex justify-center items-center">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="border px-10 py-5 rounded-[35px] bg-[#32af6f] text-white"
                    >
                        <Link to="/all-tours">DISCOVER OUR TOURS</Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default PopularTours;
