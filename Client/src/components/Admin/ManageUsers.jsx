import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../AuthContext/AuthContext";

const ManageUsers = () => {
    const { token } = useAuth(); //  Get token from context
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingStates, setLoadingStates] = useState({});
    const [filter, setFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);

    const cacheRef = useRef({}); // for storing per-filter results

    const usersPerPage = 7;

    const fetchUsers = async () => {
        try {
            setLoading(true);

            // Serve from cache
            if (cacheRef.current[filter]) {
                setUsers(cacheRef.current[filter]);
                setLoading(false);
                return;
            }

            let url = "http://localhost:5000/api/v1/users";
            if (filter === "active") url += "?active=true";
            else if (filter === "inactive") url += "?active=false";

            const res = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const filteredUsers = res.data.doc.filter((user) => user.role !== "admin");
            cacheRef.current[filter] = filteredUsers; // cache result
            setUsers(filteredUsers);
            setCurrentPage(1);
        } catch (error) {
            console.error("Fetch error:", error);
            toast.error("Failed to fetch users.");
        } finally {
            setLoading(false);
        }
    };


    const toggleUserStatus = async (userId, isActive) => {
        try {
            setLoadingStates((prev) => ({ ...prev, [userId]: true }));

            await axios.patch(
                `http://localhost:5000/api/v1/users/${userId}/disable`,
                { active: !isActive },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success(`User ${!isActive ? "enabled" : "disabled"} successfully.`);
            cacheRef.current = {}; // clear all cache
            await fetchUsers();
        } catch (err) {
            console.error("Toggle error:", err);
            toast.error("Failed to update user status.");
        } finally {
            setLoadingStates((prev) => ({ ...prev, [userId]: false }));
        }
    };

    useEffect(() => {
        if (token) fetchUsers(); //  Only fetch if token exists
    }, [filter, token]);

    // Pagination logic
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const handlePageChange = (pageNum) => {
        setCurrentPage(pageNum);
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (searchTerm.trim() === "") {
                setFilteredUsers(users);
            } else {
                const lower = searchTerm.toLowerCase();
                const filtered = users.filter(
                    (user) =>
                        user.name?.toLowerCase().includes(lower) ||
                        user.email?.toLowerCase().includes(lower) ||
                        user._id?.toLowerCase().includes(lower)
                );
                setFilteredUsers(filtered);
                setCurrentPage(1); // reset to first page on new search
            }
        }, 700); // debounce delay

        return () => clearTimeout(delayDebounce);
    }, [searchTerm, users]);


    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold text-[#32af6f] mb-4">Manage Users</h2>

            {/* Filter Buttons */}
            <div className="flex gap-3 mb-6 flex-wrap">
                {["all", "active", "inactive"].map((type) => (
                    <button
                        key={type}
                        onClick={() => setFilter(type)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium duration-200 ${filter === type
                            ? "bg-[#32af6f] text-white"
                            : "border border-[#32af6f] text-[#32af6f]"
                            }`}
                    >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                ))}
            </div>

            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name, email or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#32af6f]"
                />
            </div>

            {/* Users Table */}
            {loading ? (
                <p>Loading users...</p>
            ) : users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <>
                    {/* Users Table + Pagination Wrapper */}
                    <div className="min-h-[460px] flex flex-col justify-between">
                        <table className="min-w-full text-sm text-left rounded-lg border border-gray-200 shadow-md">
                            <thead className="bg-gray-100 text-gray-700 uppercase">
                                <tr>
                                    <th className="px-6 py-3">UserId</th>
                                    <th className="px-6 py-3">Name</th>
                                    <th className="px-6 py-3">Email</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.map((user) => {
                                    const isLoading = loadingStates[user._id];
                                    const isActive = user.active;

                                    return (
                                        <tr
                                            key={user._id}
                                            className="border-t border-gray-200 hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-3">{user._id}</td>
                                            <td className="px-6 py-3">{user.name}</td>
                                            <td className="px-6 py-3">{user.email}</td>
                                            <td className="px-6 py-3">
                                                <span
                                                    className={`inline-block px-2 py-1 text-xs rounded-full ${isActive
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                        }`}
                                                >
                                                    {isActive ? "Active" : "Inactive"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-3">
                                                <button
                                                    onClick={() => toggleUserStatus(user._id, isActive)}
                                                    disabled={isLoading}
                                                    className={`w-[100px] py-1 rounded-full text-sm font-semibold duration-200 ${isActive
                                                        ? "bg-red-500 hover:bg-red-600"
                                                        : "bg-green-500 hover:bg-green-600"
                                                        } text-white ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                                                        }`}
                                                >
                                                    {isLoading ? "Processing..." : isActive ? "Disable" : "Enable"}
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {/* Pagination fixed at bottom of visible table section */}
                        <div className="pt-6 flex justify-center items-center gap-2 flex-wrap">
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
                    </div>
                </>
            )}
        </div>
    );
};

export default ManageUsers;
