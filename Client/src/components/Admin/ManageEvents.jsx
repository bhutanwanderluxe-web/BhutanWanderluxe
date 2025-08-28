import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ManageEvents = () => {
    const { token } = useAuth();
    const navigate = useNavigate();

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteId, setDeleteId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const eventsPerPage = 7;

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get("https://bhutanwanderluxe.onrender.com/api/v1/events");
            setEvents(data.data || data.doc || []);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to load events");
        } finally {
            setLoading(false);
        }
    };

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
    const totalPages = Math.ceil(events.length / eventsPerPage) || 1;

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        setDeleting(true);
        try {
            await axios.delete(`https://bhutanwanderluxe.onrender.com/api/v1/events/${deleteId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Event deleted!");
            setIsModalOpen(false);

            const remainingEvents = events.length - 1;
            if ((currentPage - 1) * eventsPerPage >= remainingEvents) {
                setCurrentPage(Math.max(currentPage - 1, 1));
            }

            fetchEvents();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to delete event");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold text-[#32af6f] mb-4">Manage Events</h2>

            {loading ? (
                <p className="text-gray-500 text-center">Loading events...</p>
            ) : (
                <div className="min-h-[460px] flex flex-col justify-between">
                    {/* Table */}
                    <table className="min-w-full text-sm text-left rounded-lg border border-gray-200 shadow-md">
                        <thead className="bg-gray-100 text-gray-700 uppercase">
                            <tr>
                                <th className="px-6 py-3">Title</th>
                                <th className="px-6 py-3">Description</th>
                                <th className="px-6 py-3">Start Date</th>
                                <th className="px-6 py-3">End Date</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentEvents.length > 0 ? (
                                currentEvents.map((event) => (
                                    <tr
                                        key={event._id}
                                        className="border-t border-gray-200 hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-3">{event.title}</td>
                                        <td className="px-6 py-3">{event.description}</td>
                                        <td className="px-6 py-3">
                                            {new Date(event.start).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-3">
                                            {new Date(event.end).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-3 text-right space-x-2">
                                            <button
                                                className="bg-[#32af6f] text-white px-3 py-1 rounded-lg hover:bg-[#2e9c60] transition"
                                                onClick={() =>
                                                    navigate("/admin/update-event", { state: { event } })
                                                }
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(event._id)}
                                                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="text-center py-4 text-gray-500"
                                    >
                                        No events found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="pt-6 flex justify-center items-center gap-2 flex-wrap">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Prev
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-3 py-1 rounded ${currentPage === i + 1
                                        ? "bg-[#32af6f] text-white"
                                        : "bg-gray-100 hover:bg-gray-200"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {/* Delete confirmation modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
                        <h3 className="text-lg font-bold mb-4">
                            Are you sure you want to delete this event?
                        </h3>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 rounded border border-gray-300"
                                disabled={deleting}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 rounded bg-red-600 text-white"
                                disabled={deleting}
                            >
                                {deleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageEvents;
