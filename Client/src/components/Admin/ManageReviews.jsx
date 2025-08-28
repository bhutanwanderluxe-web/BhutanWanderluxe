import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

const REVIEWS_PER_PAGE = 2;
const CACHE_KEY = "cachedReviews";
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const ManageReviews = () => {
    const { user, token } = useAuth();
    const navigate = useNavigate();

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [ratingFilter, setRatingFilter] = useState("All"); // ⭐ New

    useEffect(() => {
        if (!user || !token) {
            navigate("/login");
        }
    }, [user, token, navigate]);

    const getCachedReviews = () => {
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) return null;

        const parsed = JSON.parse(cached);
        const now = Date.now();

        if (now - parsed.timestamp > CACHE_DURATION) {
            localStorage.removeItem(CACHE_KEY);
            return null;
        }

        return parsed.data;
    };

    const fetchReviews = async () => {
        if (!token) return;

        const cached = getCachedReviews();
        if (cached) {
            setReviews(cached);
            setLoading(false);
            return;
        }

        try {
            const { data } = await axios.get("https://bhutanwanderluxe.onrender.com/api/v1/reviews", {
                headers: { Authorization: `Bearer ${token}` },
            });

            const freshReviews = data.doc || [];
            setReviews(freshReviews);

            localStorage.setItem(
                CACHE_KEY,
                JSON.stringify({ data: freshReviews, timestamp: Date.now() })
            );
        } catch (error) {
            console.error("Error fetching reviews", error);
            toast.error("Failed to load reviews");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget || !token) return;
        const reviewId = deleteTarget._id;

        try {
            await axios.delete(`https://bhutanwanderluxe.onrender.com/api/v1/reviews/${reviewId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast.success("Review deleted");

            const updated = reviews.filter((r) => r._id !== reviewId);
            setReviews(updated);
            setDeleteTarget(null);

            localStorage.setItem(
                CACHE_KEY,
                JSON.stringify({ data: updated, timestamp: Date.now() })
            );
        } catch (error) {
            console.error("Delete failed", error);
            toast.error("Could not delete review");
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [token]);

    // ⭐ Filter by selected rating
    const filteredReviews =
        ratingFilter === "All"
            ? reviews
            : reviews.filter((r) => Math.floor(r.rating) === parseInt(ratingFilter));

    const totalPages = Math.ceil(filteredReviews.length / REVIEWS_PER_PAGE);
    const currentReviews = filteredReviews.slice(
        (currentPage - 1) * REVIEWS_PER_PAGE,
        currentPage * REVIEWS_PER_PAGE
    );

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    if (loading) return <p className="text-center text-gray-500">Loading reviews...</p>;

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Manage Reviews</h2>

            {/* Rating Filter */}
            <div className="flex justify-center mb-6">
                <label className="mr-3 font-semibold text-gray-700 self-center">Filter by Rating:</label>
                <select
                    value={ratingFilter}
                    onChange={(e) => {
                        setRatingFilter(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 hover:border-green-400 transition duration-200"
                >
                    <option value="All">All Ratings</option>
                    <option value="5">⭐ 5</option>
                    <option value="4">⭐ 4</option>
                    <option value="3">⭐ 3</option>
                    <option value="2">⭐ 2</option>
                    <option value="1">⭐ 1</option>
                </select>
            </div>

            {filteredReviews.length === 0 ? (
                <p className="text-center text-gray-500">No reviews found.</p>
            ) : (
                <>
                    <div className="space-y-4 max-w-2xl mx-auto min-h-[400px]">
                        {currentReviews.map((review) => (
                            <div key={review._id} className="bg-white rounded shadow p-4 relative">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-5">
                                        <img
                                            src={review.user?.photo || "/default-user.jpg"}
                                            alt="User"
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <h4 className="text-blue-600 font-semibold">
                                                {review.user?.name || "Anonymous"}
                                            </h4>
                                            <p className="text-sm text-gray-500">
                                                Tour: {review.tour?.name || "Unknown"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-gray-700 mt-3">Review: {review.review}</p>
                                <div className="flex justify-between items-center text-sm text-gray-400 mt-1">
                                    <p>{new Date(review.createdAt).toLocaleString(undefined, {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true
                                    })}</p>
                                    <span className="text-yellow-500 font-semibold">⭐{review.rating}</span>
                                </div>

                                <button
                                    onClick={() => setDeleteTarget(review)}
                                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex justify-center items-center gap-2 flex-wrap">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Prev
                        </button>

                        {[...Array(totalPages)].map((_, i) => (
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
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}

            {deleteTarget && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-md w-[90%] max-w-md text-center">
                        <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
                        <p className="text-gray-600 mb-4">
                            Are you sure you want to delete this review by{" "}
                            <span className="font-bold">{deleteTarget.user?.name || "Anonymous"}</span>?
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setDeleteTarget(null)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageReviews;
