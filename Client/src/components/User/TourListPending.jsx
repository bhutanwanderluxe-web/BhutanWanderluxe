import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../AuthContext/AuthContext";

const TourListPending = ({ bookings }) => {
    const { user } = useAuth(); // get user from auth context
    const [fetchedBookings, setFetchedBookings] = useState([]);
    const [cache, setCache] = useState({}); // simple in-memory cache

    useEffect(() => {
        const fetchTours = async () => {
            const updatedBookings = await Promise.all(
                bookings.map(async (booking) => {
                    const tourId =
                        typeof booking.tour === "object"
                            ? booking.tour._id
                            : booking.tour;

                    // Use cache if available
                    if (cache[tourId]) {
                        return { ...booking, tour: cache[tourId] };
                    }

                    try {
                        const res = await axios.get(
                            `http://localhost:5000/api/v1/tours/${tourId}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${user?.token}`, // include token if needed
                                },
                            }
                        );

                        const tourData = res.data.data;
                        setCache((prev) => ({ ...prev, [tourId]: tourData }));

                        return { ...booking, tour: tourData };
                    } catch (err) {
                        console.error(`Failed to fetch tour ${tourId}`, err);
                        return { ...booking, tour: null };
                    }
                })
            );

            setFetchedBookings(updatedBookings);
        };

        if (bookings.length > 0) {
            fetchTours();
        }
    }, [bookings, user?.token, cache]);

    return (
        <>
            {fetchedBookings.map((booking) => {
                const tour = booking.tour;

                if (!tour) return null; // skip if tour fetch failed

                return (
                    <div
                        key={booking._id}
                        className="border p-3 bg-white rounded-xl flex flex-col gap-y-3 ease-in-out duration-300 hover:-translate-y-[3px]"
                    >
                        <div className="border">
                            <img className="w-full h-full" src={tour.data.imageCover} alt="" />
                        </div>

                        <div className="flex flex-col gap-y-3">
                            <div className="tour-name">
                                <h1 className="text-2xl font-bold">{tour.data.name}</h1>
                            </div>

                            <div className="text-[#777] font-bold text-[15px]">
                                <span className="uppercase">{tour.data.difficulty}</span>{" "}
                                {tour.data.duration}-day tour
                            </div>

                            <div className="text-[#777] text-[15px]">
                                <i>{tour.data.summary}</i>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div className="text-[#777] text-[300] text-sm">
                                    <i className="bi bi-geo-alt text-[#32af6f] mr-1"></i>
                                    {tour.data.location}
                                </div>
                                <div className="text-[#777] text-[300] text-sm">
                                    <i className="bi bi-person text-[#32af6f] mr-1"></i>
                                    {tour.data.maxGroupSize}
                                </div>
                            </div>

                            <div className="flex gap-x-2">
                                <div className="w-3/6 flex flex-col gap-y-1">
                                    <div className="text-[#777]">
                                        <span className="text-[#777] text-sm font-bold">
                                            ${tour.data.price}
                                        </span>{" "}
                                        per person
                                    </div>
                                    <div className="text-[#777]">
                                        <span className="text-[#777] text-sm font-bold">
                                            {tour.data.ratingsAverage}
                                        </span>{" "}
                                        rating
                                    </div>
                                </div>

                                <div className="w-3/6 flex justify-center items-center">
                                    <motion.div
                                        whileHover={{ y: -2 }}
                                        className="border p-2 rounded-3xl bg-[#32af6f] text-white"
                                    >
                                        <Link to={`/product/${tour.data._id}`}>Details</Link>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default TourListPending;
