import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../AuthContext/AuthContext";

const BOOKINGS_PER_PAGE = 8;
const CACHE_KEY = "cachedBookings";
const CACHE_TIME = 5 * 60 * 1000;

const ManageBookings = () => {
    const { user, token } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
    const debounceTimer = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !token) navigate("/login");
    }, [user, token, navigate]);

    const fetchBookings = async (useCache = true) => {
        if (!token) return;

        if (useCache) {
            const cached = JSON.parse(localStorage.getItem(CACHE_KEY));
            if (cached && Date.now() - cached.timestamp < CACHE_TIME) {
                setBookings(cached.data);
                return;
            }
        }

        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const { data } = await axios.get("http://localhost:5000/api/v1/bookings", config);
            setBookings(data.doc);
            localStorage.setItem(CACHE_KEY, JSON.stringify({ data: data.doc, timestamp: Date.now() }));
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    const invalidateCache = () => localStorage.removeItem(CACHE_KEY);

    const updatePaymentStatus = async (id) => {
        if (!window.confirm("Mark this booking as paid?")) return;
        try {
            await axios.patch(
                `http://localhost:5000/api/v1/bookings/${id}`,
                { paid: true, status: "booked" },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            invalidateCache();
            fetchBookings(false);
        } catch (error) {
            console.error("Failed to update payment", error);
        }
    };

    const cancelBooking = async (id) => {
        try {
            await axios.patch(
                `http://localhost:5000/api/v1/bookings/${id}`,
                { status: "cancelled" },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            invalidateCache();
            fetchBookings(false);
        } catch (error) {
            console.error("Failed to cancel booking", error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this cancelled booking?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/v1/bookings/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Booking deleted!");
            invalidateCache();
            fetchBookings(false);
        } catch (error) {
            toast.error("Failed to delete booking");
        }
    };

    useEffect(() => {
        fetchBookings();
    }, [token]);

    const handlePageChange = (page) => setCurrentPage(page);

    useEffect(() => {
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => setDebouncedQuery(searchQuery), 600);
        return () => clearTimeout(debounceTimer.current);
    }, [searchQuery]);

    const filteredBookings = bookings.filter((booking) => {
        const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
        const query = debouncedQuery.toLowerCase();
        const matchesSearch =
            booking._id?.toLowerCase().includes(query) ||
            booking.user?.name?.toLowerCase().includes(query) ||
            booking.tour?.name?.toLowerCase().includes(query);
        return matchesStatus && matchesSearch;
    });

    const totalPages = Math.ceil((filteredBookings?.length || 0) / BOOKINGS_PER_PAGE);
    const currentBookings = filteredBookings.slice(
        (currentPage - 1) * BOOKINGS_PER_PAGE,
        currentPage * BOOKINGS_PER_PAGE
    );

    return (
        <section className="max-w-7xl mx-auto p-4 flex flex-col min-h-[80vh]">
            <h2 className="text-2xl font-bold text-center mb-6">Manage Bookings</h2>

            {/* Filters */}
            <div className="flex flex-wrap justify-between gap-4 mb-6 items-center">
                <select
                    className="border rounded px-4 py-2 text-sm"
                    value={statusFilter}
                    onChange={(e) => {
                        setStatusFilter(e.target.value);
                        setCurrentPage(1);
                    }}
                >
                    <option value="all">All</option>
                    <option value="booked">Booked</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                </select>

                <input
                    type="text"
                    placeholder="Search by ID, User, Tour..."
                    className="border px-4 py-2 rounded w-full sm:w-72"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                    }}
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto flex-grow">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                    <thead>
                        <tr className="bg-gray-100 text-left text-sm font-semibold">
                            <th className="py-3 px-4 border-b">Booking ID</th>
                            <th className="py-3 px-4 border-b">User</th>
                            <th className="py-3 px-4 border-b">Tour</th>
                            <th className="py-3 px-4 border-b">Price</th>
                            <th className="py-3 px-4 border-b">Date</th>
                            <th className="py-3 px-4 border-b">Payment</th>
                            <th className="py-3 px-4 border-b">Status</th>
                            <th className="py-3 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody style={{ minHeight: "350px" }}>
                        {currentBookings.length > 0 ? (
                            currentBookings.map((b) => (
                                <tr key={b._id} className="hover:bg-gray-50 text-sm">
                                    <td className="py-3 px-4 border-b">
                                        {b._id?.length > 12 ? `${b._id.slice(0, 12)}...` : b._id}
                                    </td>
                                    <td className="py-3 px-4 border-b">{b.user?.name}</td>
                                    <td className="py-3 px-4 border-b">{b.tour?.name}</td>
                                    <td className="py-3 px-4 border-b">${b.price}</td>
                                    <td className="py-3 px-4 border-b">
                                        {new Date(b.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="py-3 px-4 border-b">
                                        {b.paid ? (
                                            <span className="bg-green-500 text-white px-3 py-1 rounded text-xs">
                                                Paid
                                            </span>
                                        ) : (
                                            <button
                                                onClick={() => updatePaymentStatus(b._id)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                                            >
                                                Mark Paid
                                            </button>
                                        )}
                                    </td>
                                    <td className="py-3 px-4 border-b">
                                        {b.status !== "cancelled" ? (
                                            <button
                                                onClick={() => cancelBooking(b._id)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                                            >
                                                Cancel
                                            </button>
                                        ) : (
                                            <span className="bg-gray-400 text-white px-3 py-1 rounded text-xs">
                                                Cancelled
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-3 px-4 border-b">
                                        <button
                                            onClick={() => handleDelete(b._id)}
                                            disabled={b.status !== "cancelled"}
                                            className={`px-3 py-1 text-xs rounded ${b.status === "cancelled"
                                                    ? "bg-black text-white hover:bg-gray-800"
                                                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                }`}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="8"
                                    className="text-center py-6 text-gray-500"
                                >
                                    No bookings found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>


            {/* Pagination */}
            <div className="mt-6 flex justify-center gap-2 flex-wrap">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                >
                    Prev
                </button>
                {Array.from({ length: totalPages || 1 }).map((_, i) => (
                    <button
                        key={i}
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
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </section>
    );
};

export default ManageBookings;
