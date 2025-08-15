import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BookedTour from "../User/BookedTour";
import { useAuth } from "../AuthContext/AuthContext";

const TourSection = () => {
    const [status, setStatus] = useState("booked"); // default status
    const [allBookings, setAllBookings] = useState([]);
    const { user, token } = useAuth();
    const navigate = useNavigate();

    const fetchTours = async (token) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axios.get(
                "http://localhost:5000/api/v1/bookings/my-bookings",
                config
            );

            setAllBookings(data.bookings);
        } catch (error) {
            console.error("Failed to fetch tours:", error);
        }
    };

    useEffect(() => {
        if (!user || !token) {
            navigate("/login");
        } else {
            fetchTours(token);
        }
    }, [user, token, navigate]);

    return (
        <section className="tour-section">
            <div className="container flex flex-col gap-y-3">
                <h1 className="text-3xl text-[#32af6f] text-center font-bold">
                    Your Tours
                </h1>
                <div className="flex justify-center gap-x-10">
                    <div
                        className="hover:cursor-pointer"
                        onClick={() => setStatus("booked")}
                        style={{ color: `${status === "booked" ? "green" : "#777"}` }}
                    >
                        Booked
                    </div>
                    <div
                        className="hover:cursor-pointer"
                        onClick={() => setStatus("pending")}
                        style={{ color: `${status === "pending" ? "green" : "#777"}` }}
                    >
                        Pending
                    </div>
                    <div
                        className="hover:cursor-pointer"
                        onClick={() => setStatus("cancelled")}
                        style={{ color: `${status === "cancelled" ? "green" : "#777"}` }}
                    >
                        Cancelled
                    </div>
                </div>
                <div>
                    <BookedTour allBookings={allBookings} status={status} />
                </div>
            </div>
        </section>
    );
};

export default TourSection;
