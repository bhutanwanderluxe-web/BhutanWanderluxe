import React from "react";
import { motion } from "framer-motion";
import {
    FaCheckCircle,
    FaTimesCircle,
    FaShoePrints,
    FaCamera,
    FaHands,
    FaPrayingHands
} from "react-icons/fa";

const Ettiquette = () => {
    const dos = [
        { icon: <FaCheckCircle size={24} color="#32af6f" />, text: "Greet locals with a warm smile." },
        { icon: <FaPrayingHands size={24} color="#32af6f" />, text: "Remove shoes before entering temples." },
        { icon: <FaHands size={24} color="#32af6f" />, text: "Dress modestly in religious sites." },
        { icon: <FaCamera size={24} color="#32af6f" />, text: "Ask permission before taking photos." }
    ];

    const donts = [
        { icon: <FaTimesCircle size={24} color="#d9534f" />, text: "Do not point at people or sacred objects." },
        { icon: <FaShoePrints size={24} color="#d9534f" />, text: "Never wear shoes inside monasteries." },
        { icon: <FaTimesCircle size={24} color="#d9534f" />, text: "Avoid public displays of affection." },
        { icon: <FaTimesCircle size={24} color="#d9534f" />, text: "Do not disturb ongoing prayers or rituals." }
    ];

    return (
        <section className="dos-donts py-16 flex justify-center bg-[#FAF9F6]">
            <div className="container flex flex-col gap-y-10 max-w-6xl">
                {/* Heading */}
                <div className="flex text-center justify-center p-2">
                    <motion.h1
                        whileHover={{ rotate: 1 }}
                        className="text-[25px] hover:text-[30px] text-[#32af6f] font-extrabold"
                    >
                        DO'S & DON'TS IN BHUTAN
                    </motion.h1>
                </div>

                {/* Content */}
                <div className="flex flex-col lg:flex-row gap-y-10 lg:gap-x-16 lg:px-10">
                    {/* Do's */}
                    <div className="flex-1 bg-white shadow-lg rounded-xl p-6 border-t-4 border-[#32af6f]">
                        <h2 className="text-lg font-bold text-[#32af6f] mb-4">Do's</h2>
                        <ul className="space-y-4">
                            {dos.map((item, index) => (
                                <li key={index} className="flex items-center gap-x-3 text-[#555]">
                                    {item.icon}
                                    <span>{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Don'ts */}
                    <div className="flex-1 bg-white shadow-lg rounded-xl p-6 border-t-4 border-[#d9534f]">
                        <h2 className="text-lg font-bold text-[#d9534f] mb-4">Don'ts</h2>
                        <ul className="space-y-4">
                            {donts.map((item, index) => (
                                <li key={index} className="flex items-center gap-x-3 text-[#555]">
                                    {item.icon}
                                    <span>{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Ettiquette;
