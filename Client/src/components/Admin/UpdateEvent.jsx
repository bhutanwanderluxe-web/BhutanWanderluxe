import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateEvent = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const eventData = location.state?.event;

    const [form, setForm] = useState({
        title: "",
        description: "",
        start: "",
        end: "",
    });
    const [imageEvent, setImageEvent] = useState(null);
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        if (!eventData) {
            toast.error("No event data found");
            navigate("/admin/manage-events");
            return;
        }
        setForm({
            title: eventData.title,
            description: eventData.description,
            start: eventData.start.split("T")[0],
            end: eventData.end.split("T")[0],
        });
        setPreviewImage(eventData.imageEvent || "");
    }, [eventData, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("title", form.title);
            formData.append("description", form.description);
            formData.append("start", form.start);
            formData.append("end", form.end);
            if (imageEvent) {
                formData.append("imageEvent", imageEvent);
            }

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            };

            await axios.patch(
                `http://localhost:5000/api/v1/events/${eventData._id}`,
                formData,
                config
            );

            toast.success("Event updated successfully!");
            navigate("/admin/manage-events");
        } catch (err) {
            toast.error("Failed to update event");
        }
    };

    if (!eventData) {
        return <p className="text-center text-gray-500">Loading event...</p>;
    }

    return (
        <div className="max-w-lg mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Edit Event</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                    <label className="block font-medium text-gray-700 mb-1">Title</label>
                    <input
                        className="border p-2 w-full rounded"
                        placeholder="Enter event title"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        className="border p-2 w-full rounded"
                        placeholder="Enter event description"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                </div>

                {/* Start Date */}
                <div>
                    <label className="block font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                        type="date"
                        className="border p-2 w-full rounded"
                        value={form.start}
                        onChange={(e) => setForm({ ...form, start: e.target.value })}
                    />
                </div>

                {/* End Date */}
                <div>
                    <label className="block font-medium text-gray-700 mb-1">End Date</label>
                    <input
                        type="date"
                        className="border p-2 w-full rounded"
                        value={form.end}
                        onChange={(e) => setForm({ ...form, end: e.target.value })}
                    />
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block font-medium text-gray-700 mb-1">Event Image</label>
                    {previewImage && (
                        <div className="mb-2">
                            <p className="text-sm text-gray-600">Current Image:</p>
                            <img
                                src={previewImage}
                                alt="Event"
                                className="w-full h-40 object-cover rounded-lg border"
                            />
                        </div>
                    )}
                    <input
                        type="file"
                        className="w-full h-full rounded-xl border border-[#777]"
                        onChange={(e) => {
                            setImageEvent(e.target.files[0]);
                            setPreviewImage(URL.createObjectURL(e.target.files[0]));
                        }}
                    />
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded">
                        Update
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/admin/manage-events")}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateEvent;
