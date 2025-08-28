import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import Profile from "../User/Profile";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../AuthContext/AuthContext";

const Header = () => {
    const { user, logout } = useAuth(); // Get user and logout from AuthContext
    const [search, setSearch] = useState("");
    const [tours, setTours] = useState([]);
    const navigate = useNavigate();

    const handleSearch = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:5000/api/v1/tours/search/${search}`
            );

            if (data) {
                setTours(data.tour);
            }

            if (data.tour.length === 0) {
                toast("Tour not found");
            } else {
                navigate("/all-tours", { state: { tours: data.tour } });
                setSearch("");
                // Don't reload the page here, navigate is enough
            }
        } catch (err) {
            toast(err.message);
        }
    };

    return (
        <div className="header-section flex justify-center items-center bg-black py-2 relative">
            <div className="container flex justify-between items-center px-10">
                <div className="flex justify-center items gap-x-2 text-3xl text-[#32af6f]">
                    <Link to={user?.role === "user" ? "/" : "/admin"}>
                        <i className="bi bi-back"></i> <span>BhutanWanderluxe</span>
                    </Link>
                </div>

                {user?.role === "user" && (
                    <div className="border-none border-yellow hidden justify-center item-center md:flex">
                        <div>
                            <input
                                className="border-none rounded-l-xl"
                                type="search"
                                placeholder="Search tour"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div
                            className="flex justify-center items-center bg-white p-2 rounded-r-xl cursor-pointer"
                            onClick={handleSearch}
                        >
                            <CiSearch />
                            <ToastContainer />
                        </div>
                    </div>
                )}

                <div className="flex justify-center items-center gap-x-4">
                    {user ? (
                        <>
                            <Profile user={user} />
                            <button
                                onClick={() => {
                                    logout(); // Call logout from context
                                    navigate("/login");
                                }}
                                className="text-white border px-3 py-1 rounded-2xl hover:bg-white hover:text-black"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <div className="flex justify-center items-center px-3 py-2 gap-x-10 hidden md:flex">
                            <motion.div whileHover={{ y: -2 }} className="text-white">
                                <Link to={"/login"}>LOGIN</Link>
                            </motion.div>
                            <motion.div
                                whileHover={{ y: -2 }}
                                className="border px-4 py-2 rounded-3xl text-white hover:text-black hover:bg-white"
                            >
                                <Link to={"/signup"}>SIGNUP</Link>
                            </motion.div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
