import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../AuthContext/AuthContext";

const TourReviewForm = ({ tourId, onReviewSubmitted }) => {
    const { user, token } = useAuth();
    const [rating, setRating] = useState(5);
    const [review, setReview] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError("You must be logged in to submit a review.");
            toast.error("You must be logged in to submit a review.");
            return;
        }

        setSubmitting(true);
        setError(null);
        setSuccessMessage("");
        console.log(user._id, "jsjad");
        console.log(tourId, "jsjad");

        try {
            await axios.post(
                "http://localhost:5000/api/v1/reviews",
                {
                    review,
                    rating,
                    tour: tourId,
                    user: user._id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            setSuccessMessage("Review submitted successfully!");
            toast.success(" Review submitted successfully!");
            setReview("");
            setRating(5);
            if (onReviewSubmitted) onReviewSubmitted();
        } catch (err) {
            const isDuplicate =
                err.response?.status === 500 &&
                err.response?.data?.message?.includes("duplicate");
            console.log(err.response?.data?.message, "dsa");
            console.log(err.response, "dsa");
            const msg = isDuplicate
                ? "You have already submitted a review for this tour."
                : "Failed to submit review. Please try again.";
            setError(msg);
            toast.error(msg);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded mt-6">
            <h3 className="text-lg font-semibold mb-2">Leave a Review</h3>

            <div className="mb-3">
                <label className="block mb-1">Rating (1-5)</label>
                <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full p-2 border rounded"
                    required
                >
                    {[5, 4, 3, 2, 1].map((r) => (
                        <option key={r} value={r}>
                            {r} Star{r > 1 && "s"}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-3">
                <label className="block mb-1">Your Review</label>
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="w-full p-2 border rounded"
                    rows="4"
                    required
                />
            </div>

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            {successMessage && <p className="text-green-500 text-sm mb-2">{successMessage}</p>}

            <button
                type="submit"
                disabled={submitting}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                {submitting ? "Submitting..." : "Submit Review"}
            </button>
        </form>
    );
};

export default TourReviewForm;
