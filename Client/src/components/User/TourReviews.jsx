import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext/AuthContext";

const TourReviews = ({ tour }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, token } = useAuth();
    const tourId = tour._id;
    // console.log(user, token);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                if (!token) {
                    console.warn("User is not logged in.");
                    setLoading(false);
                    return;
                }

                const { data } = await axios.get(
                    `http://localhost:5000/api/v1/reviews/tour/${tourId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const allReviews = data.data.reviews || [];
                // console.log(allReviews, "d");

                const sorted = allReviews
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 3);

                setReviews(sorted);
            } catch (error) {
                console.error("Failed to fetch reviews:", error);
            } finally {
                setLoading(false);
            }
        };

        if (tourId) fetchReviews();
    }, [tourId, user]);

    if (loading) {
        return <p className="text-center text-gray-500">Loading reviews...</p>;
    }

    if (reviews.length === 0) {
        return <p className="text-center text-gray-500">No reviews yet for this tour.</p>;
    }

    return (
        <div className="mt-6 mb-16">
            <h3 className="text-xl font-semibold mb-4 text-center">What People Are Saying</h3>
            <div className="flex flex-col items-center gap-4">
                {reviews.map((review) => (
                    <div
                        key={review._id}
                        className="bg-white p-4 rounded shadow-md w-full max-w-md"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {review.user?.photo && (
                                    <img
                                        src={review.user.photo}
                                        alt={review.user.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                )}
                                <span className="font-bold text-blue-600">
                                    {review.user?.name || "Anonymous"}
                                </span>
                            </div>
                            <span className="text-yellow-500">⭐ {review.rating}</span>
                        </div>
                        <p className="text-gray-700 mt-2 pl-5">{review.review}</p>
                        <p className="text-sm text-gray-400 mt-1 pl-5">
                            {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TourReviews;
