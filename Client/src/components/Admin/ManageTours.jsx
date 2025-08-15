import React, { useState } from "react";
import { useUser } from "../ContextConfig/ContextConfig";
import Loading from "../Layout/Loading";
import SingleTour from "./SingleTour";

const ManageTours = () => {
    const { tours, loading, error } = useUser();

    const [currentPage, setCurrentPage] = useState(1);
    const toursPerPage = 2;

    const indexOfLastTour = currentPage * toursPerPage;
    const indexOfFirstTour = indexOfLastTour - toursPerPage;
    const currentTours = tours.slice(indexOfFirstTour, indexOfLastTour);
    const totalPages = Math.ceil(tours.length / toursPerPage) || 1; // ensure at least 1 page

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages || page === currentPage) return;
        setCurrentPage(page);
    };

    if (loading) return <Loading />;
    if (error) return <h1 className="text-center text-red-500">Error loading tours.</h1>;

    return (
        <section className="manage-tours-section py-6 px-4 sm:px-6 lg:px-10">
            <div className="container mx-auto flex flex-col gap-y-6">

                {/* Keep min height so pagination stays in place */}
                <div style={{ minHeight: `${toursPerPage * 250}px` }}>
                    {currentTours.map((tour) => (
                        <SingleTour key={tour._id} tour={tour} />
                    ))}
                </div>

                {/* Pagination */}
                <div className="pt-4 flex justify-center items-center gap-2 flex-wrap">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
                    >
                        Prev
                    </button>

                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => handlePageChange(i + 1)}
                            className={`px-3 py-1 text-sm rounded ${currentPage === i + 1
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
                        className="px-3 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ManageTours;
