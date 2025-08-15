import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../AuthContext/AuthContext";
import { useNavigate } from 'react-router-dom';

const CreateTour = () => {
    const { user, token } = useAuth(); // get authenticated user with token
    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [maxGroupSize, setMaxGroupSize] = useState("");
    const [location, setLocation] = useState(""); // New single location string
    const [imageCover, setImageCover] = useState(null);
    const [summary, setSummary] = useState("");
    const [price, setPrice] = useState("");
    const [tourGuide, setTourGuide] = useState("");
    const navigate = useNavigate();


    const handleCreateTour = async () => {
        if (!location.trim()) {
            return toast("Please enter a valid location/address.");
        }

        if (!token) {
            return toast("You must be logged in to create a tour.");
        }

        const formData = new FormData();
        if (name) formData.append("name", name);
        if (difficulty) formData.append("difficulty", difficulty);
        if (location) formData.append("location", location.trim());
        if (duration) formData.append("duration", duration);
        if (price) formData.append("price", price);
        if (summary) formData.append("summary", summary);
        if (imageCover) formData.append("imageCover", imageCover);
        if (maxGroupSize) formData.append("maxGroupSize", maxGroupSize);
        if (tourGuide) formData.append("tourGuide", tourGuide);

        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    authorization: `Bearer ${token}`,
                },
            };
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }

            const response = await axios.post(
                "http://localhost:5000/api/v1/tours",
                formData,
                config
            );
            if (response.data.status === "success") {
                toast("Tour is created successfully");
                // Optionally clear form or redirect here
            }
        } catch (error) {
            toast(error.message);
        }
    };

    return (
        <section className="create-tours-section">
            <div className="container px-4 py-4 lg:px-16 lg:py-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                            <option value="" disabled>
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
                            type="text"
                            placeholder="Tour Guide"
                            value={tourGuide}
                            onChange={(e) => setTourGuide(e.target.value)}
                            className="w-full h-full rounded-xl border border-[#777]"
                        />
                    </div>
                    <div className="lg:col-span-2">
                        <input
                            type="file"
                            placeholder="Image cover"
                            onChange={(e) => setImageCover(e.target.files[0])}
                            className="w-full h-full rounded-xl border border-[#777]"
                        />
                    </div>

                    <div className="lg:col-span-2 flex gap-4">
                        <button
                            className="flex-1 border p-2 rounded-xl bg-[#32af6f] text-center text-white hover:cursor-pointer"
                            onClick={handleCreateTour}
                        >
                            Create Tour
                        </button>

                        <button
                            className="flex-1 border p-2 rounded-xl bg-gray-400 text-center text-white hover:cursor-pointer"
                            onClick={() => navigate("/admin")}
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

export default CreateTour;
