// TrekkingRoutesLight.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    FaMapMarkedAlt,
    FaHiking,
    FaClock,
    FaMountain,
    FaDownload,
    FaChevronDown,
} from "react-icons/fa";

const ROUTES = [
    {
        name: "Druk Path Trek",
        region: "Paro ↔ Thimphu",
        days: 5,
        distanceKm: 49,
        elevationGainM: 2200,
        bestSeason: "Mar-May • Sep-Nov",
        // Use your own optimized SVG/PNG placed under /public/assets/maps/
        mapThumb: "/assets/maps/druk-path.svg",
        gpxHref: "/assets/gpx/druk-path.gpx",
        summary:
            "Classic high-altitude trek connecting Paro and Thimphu via blue pine forests, alpine lakes, and panoramic Himalayan views.",
    },
    {
        name: "Jomolhari Trek (Short)",
        region: "Paro Region",
        days: 7,
        distanceKm: 80,
        elevationGainM: 3500,
        bestSeason: "Apr-May • Oct",
        mapThumb: "/assets/maps/jomolhari-short.svg",
        gpxHref: "/assets/gpx/jomolhari-short.gpx",
        summary:
            "Follows the Paro Chhu valley to Jangothang with iconic views of Mt. Jomolhari, yak pastures, and fortress-like campsites.",
    },
    {
        name: "Phobjikha Valley Day Hike",
        region: "Wangdue/Phobjikha",
        days: 1,
        distanceKm: 12,
        elevationGainM: 300,
        bestSeason: "Oct-Feb (cranes) • Year-round",
        mapThumb: "/assets/maps/phobjikha-day.svg",
        gpxHref: "/assets/gpx/phobjikha-day.gpx",
        summary:
            "Gentle loop around glacial valley wetlands, black-necked crane habitat, and traditional farm hamlets.",
    },
];

const TrekkingRoutes = () => {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section className="py-16 flex justify-center bg-[#F7F8F9]">
            <div className="container max-w-6xl px-4 lg:px-12">
                {/* Heading */}
                <div className="flex justify-center text-center mb-10">
                    <motion.h2
                        whileHover={{ rotate: 1 }}
                        className="text-[24px] lg:text-[28px] font-extrabold text-[#32af6f]"
                    >
                        TREKKING ROUTES
                    </motion.h2>
                </div>

                {/* Cards */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {ROUTES.map((r, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <div
                                key={r.name}
                                className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col"
                            >
                                {/* Map thumbnail */}
                                <img
                                    src={r.mapThumb}
                                    alt={`${r.name} static map`}
                                    loading="lazy"
                                    className="w-full h-40 object-contain bg-white"
                                />

                                {/* Content */}
                                <div className="p-4 flex flex-col gap-3">
                                    <h3 className="font-bold text-lg">{r.name}</h3>
                                    <p className="text-sm text-[#666]">{r.region}</p>

                                    <div className="flex flex-wrap items-center gap-3 text-sm text-[#444]">
                                        <span className="inline-flex items-center gap-2">
                                            <FaClock /> {r.days} days
                                        </span>
                                        <span className="inline-flex items-center gap-2">
                                            <FaHiking /> {r.distanceKm} km
                                        </span>
                                        <span className="inline-flex items-center gap-2">
                                            <FaMountain /> +{r.elevationGainM} m
                                        </span>
                                    </div>

                                    <div className="text-xs text-[#666]">
                                        Best season: <span className="font-medium">{r.bestSeason}</span>
                                    </div>

                                    <button
                                        onClick={() => setOpenIndex(isOpen ? null : i)}
                                        className="mt-2 inline-flex items-center justify-between w-full rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
                                    >
                                        <span className="inline-flex items-center gap-2">
                                            <FaMapMarkedAlt /> Route summary
                                        </span>
                                        <FaChevronDown
                                            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                                        />
                                    </button>

                                    {isOpen && (
                                        <p className="text-sm text-[#555] mt-1">{r.summary}</p>
                                    )}

                                    <div className="mt-2 flex items-center gap-3">
                                        {/* Optional offline GPX link (put .gpx under /public/assets/gpx/) */}
                                        <a
                                            href={r.gpxHref}
                                            download
                                            className="text-sm inline-flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-gray-50"
                                        >
                                            <FaDownload />
                                            GPX (offline)
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Tiny tip */}
                <p className="text-xs text-[#777] mt-6">
                    Tip: Keep files small. Export SVG/PNG maps under 150 KB and optimize GPX by simplifying tracks.
                </p>
            </div>
        </section>
    );
};

export default TrekkingRoutes;
