import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [imageEvent, setImageEvent] = useState(null); // file upload

  const handleCreateEvent = async () => {
    if (!token) {
      return toast("You must be logged in to create an event.");
    }

    if (!imageEvent) {
      return toast("Please upload an event image.");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("start", start);
    formData.append("end", end);
    formData.append("imageEvent", imageEvent);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        "https://bhutanwanderluxe.onrender.com/api/v1/events",
        formData,
        config
      );

      if (response.data.status === "success") {
        toast("Event created successfully");
        navigate("/admin/manage-events");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create event");
    }
  };

  return (
    <section className="create-event-section">
      <div className="container px-4 py-4 lg:px-16 lg:py-10">
        <div className="grid grid-cols-1 gap-4">
          {/* Title */}
          <div>
            <input
              type="text"
              placeholder="Event Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-full rounded-xl border border-[#777] px-3 py-2"
            />
          </div>

          {/* Description */}
          <div className="lg:col-span-2">
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-full rounded-xl border border-[#777] px-3 py-2"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Start Date */}
            <div>
              <input
                type="date"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className="w-full h-[50px] rounded-xl border border-[#777] px-3"
              />
              <p className="text-sm text-gray-500 mt-1">Start Date</p>
            </div>

            {/* End Date */}
            <div>
              <input
                type="date"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                className="w-full h-[50px] rounded-xl border border-[#777] px-3"
              />
              <p className="text-sm text-gray-500 mt-1">End Date</p>
            </div>
          </div>

          {/* Image Upload */}
          <div className="lg:col-span-2">
            <input
              type="file"
              placeholder="Image event"
              onChange={(e) => setImageEvent(e.target.files[0])}
              className="w-full h-full rounded-xl border border-[#777]"
            />
          </div>

          {/* Buttons */}
          <div className="lg:col-span-2 flex gap-4">
            <button
              className="flex-1 border p-2 rounded-xl bg-[#32af6f] text-center text-white hover:cursor-pointer"
              onClick={handleCreateEvent}
            >
              Create Event
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

export default CreateEvent;
