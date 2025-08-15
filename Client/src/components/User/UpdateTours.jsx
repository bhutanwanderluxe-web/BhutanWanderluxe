import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useAuth } from "../AuthContext/AuthContext";
import "./UpdateTours.css";

const UpdateTours = () => {
    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [maxGroupSize, setMaxGroupSize] = useState("");
    const [location, setLocation] = useState("");
    const [imageCover, setImageCover] = useState(null);
    const [summary, setSummary] = useState("");
    const [price, setPrice] = useState("");
    const [images, setImages] = useState([]);

    const locationState = useLocation();
    const navigate = useNavigate();
    const { token } = useAuth();

    const tourId = locationState.state.tour.id;
    console.log(tourId);

    const [loading, setLoading] = useState(false);

    const handleUpdateTour = async () => {
        if (!token) {
            navigate("/login");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        if (name) formData.append("name", name);
        if (difficulty) formData.append("difficulty", difficulty);
        if (location) formData.append("location", location);
        if (duration) formData.append("duration", duration);
        if (price) formData.append("price", price);
        if (summary) formData.append("summary", summary);
        if (imageCover) formData.append("imageCover", imageCover);
        if (images.length > 0) {
            images.forEach((image) => {
                formData.append("images", image);
            });
        }
        if (maxGroupSize) formData.append("maxGroupSize", maxGroupSize);

        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.patch(
                `http://localhost:5000/api/v1/tours/${tourId}`,
                formData,
                config
            );

            if (response.data.status === "success") {
                toast.success("Tour is updated successfully");
                // Prefer to update state or navigate rather than reload
                // window.location.reload();
            } else {
                toast.error("Failed to update tour");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="update-tours-section border">
            <div className="container px-4 py-4 lg:px-16 lg:py-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Inputs omitted for brevity (keep yours here) */}

                    <div>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full h-full rounded-xl"
                        />
                    </div>
                    <div>
                        <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            className="w-full h-full rounded-xl px-3 py-2"
                        >
                            <option value="" disabled hidden>
                                Select Difficulty
                            </option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="difficult">Difficult</option>
                        </select>
                    </div>

                    <div>
                        <input
                            type="number"
                            placeholder="Duration"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="w-full h-full rounded-xl"
                        />
                    </div>

                    <div className="lg:col-span-2">
                        <input
                            type="text"
                            placeholder="Location (Address)"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full h-full rounded-xl"
                        />
                    </div>

                    <div>
                        <input
                            type="number"
                            placeholder="Maximum group size"
                            value={maxGroupSize}
                            onChange={(e) => setMaxGroupSize(e.target.value)}
                            className="w-full h-full rounded-xl"
                        />
                    </div>
                    <div className="lg:col-span-2">
                        <input
                            type="number"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full h-full rounded-xl"
                        />
                    </div>
                    <div className="lg:col-span-2">
                        <textarea
                            placeholder="Summary"
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            className="w-full h-full rounded-xl border border-[#777] px-3 py-2"
                            rows={4}
                        />
                    </div>

                    <div className="lg:col-span-2">
                        <input
                            type="file"
                            placeholder="Image Cover"
                            onChange={(e) => setImageCover(e.target.files[0])}
                            className="w-full h-full rounded-xl border border-[#777]"
                        />
                    </div>
                    <input
                        type="file"
                        multiple
                        onChange={(e) => setImages([...e.target.files])}
                        className="w-full h-full rounded-xl border border-[#777]"
                        accept="image/*"
                    />
                    <div className="lg:col-span-2 flex gap-4">
                        <button
                            className="flex-1 border p-2 rounded-xl bg-[#32af6f] text-center text-white hover:cursor-pointer"
                            onClick={handleUpdateTour}
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "Update Tour"}
                        </button>

                        <button
                            className="flex-1 border p-2 rounded-xl bg-gray-400 text-center text-white hover:cursor-pointer"
                            onClick={() => navigate(-1)}
                        >
                            Cancel
                        </button>

                        <ToastContainer />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default UpdateTours;
