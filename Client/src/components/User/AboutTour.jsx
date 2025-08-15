import React from "react";
import { BsGraphUpArrow } from "react-icons/bs";
import { MdOutlinePersonOutline, MdOutlineStarBorder } from "react-icons/md";

const AboutTour = ({ tour }) => {
    if (!tour) {
        return <div>Loading tour...</div>;
    }

    const tourName = tour?.name || "TOUR";
    // console.log("tour", tour);

    return (
        <section className="about-tour-section flex justify-center py-16">
            <div className="container flex flex-col md:flex-row">

                {/* LEFT PANEL */}
                <div className="bg-[#F3F4F5] md:w-3/6 flex flex-col gap-y-10 py-10">

                    {/* QUICK FACTS */}
                    <div className="flex flex-col justify-start items-center gap-y-5">
                        <div className="text-[#32af6f] text-xl md:text-2xl">QUICK FACTS</div>

                        <div className="flex gap-x-2 items-center text-sm md:text-md">
                            <span className="text-[#32af6f]"><BsGraphUpArrow /></span>
                            <span className="text-[#777] mr-4">DIFFICULTY</span>
                            <span className="text-[#777]">{tour?.difficulty || "Not specified"}</span>
                        </div>

                        <div className="flex gap-x-2 items-center text-sm md:text-md">
                            <span className="text-[#32af6f]"><MdOutlinePersonOutline /></span>
                            <span className="text-[#777] mr-4">PARTICIPANTS</span>
                            <span className="text-[#777]">{tour?.maxGroupSize || "N/A"} People</span>
                        </div>

                        <div className="flex gap-x-2 items-center text-sm md:text-md">
                            <span className="text-[#32af6f]"><MdOutlineStarBorder /></span>
                            <span className="text-[#777] mr-4">RATINGS</span>
                            <span className="text-[#777]">
                                {tour?.ratingsAverage || "0"} / {tour?.ratingsQuantity || "0"}
                            </span>
                        </div>
                    </div>

                    {/* TOUR GUIDE */}
                    <div className="flex flex-col justify-start items-center gap-y-5">
                        <div className="text-[#32af6f] text-xl md:text-2xl">YOUR TOUR GUIDE</div>
                        <div className="flex gap-x-2 items-center text-sm md:text-md">
                            <span className="text-[#32af6f]"><MdOutlineStarBorder /></span>
                            <span className="text-[#777] mr-4">TOUR GUIDE</span>
                            <span className="text-[#777]">{tour?.tourGuide || "No guide assigned"}</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT PANEL */}
                <div className="md:w-3/6 flex flex-col gap-y-10 py-10">
                    <div>
                        <h1 className="text-[#32af6f] text-3xl font-bold text-center">ABOUT {tourName}</h1>
                    </div>
                    <div className="flex flex-col gap-y-5 items-center justify-center px-4 sm:px-10 text-[#777] text-lg">
                        {tour?.summary || "No summary available for this tour."}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutTour;
