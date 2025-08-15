import React, { useState } from 'react';
import { BsMoonStars } from 'react-icons/bs';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { Link, Outlet } from 'react-router-dom';

const Admin = ({ toggleTheme }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="admin-section flex flex-col lg:flex-row bg-[#F3F4F5] dark:bg-gray-900 dark:text-white min-h-screen relative">

            {/* Hamburger for small screens */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 text-3xl bg-white dark:bg-gray-800 p-2 rounded-md shadow-md"
            >
                {isOpen ? <HiX /> : <HiMenuAlt3 />}
            </button>

            {/* Sidebar (slide-out on small screens, always visible on lg) */}
            <div
                className={`bg-white dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 fixed lg:static z-40 top-0 left-0 h-full w-64 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
            >
                <div className='flex flex-col h-full'>
                    <div className='flex flex-row flex-wrap gap-5 lg:flex-col lg:gap-y- p-2 lg:p-4'>
                        <div className="border-b border-[#32af6f] text-center text-3xl font-bold w-full">Admin</div>

                        {[
                            { path: "/admin", label: "Dashboard" },
                            { path: "/admin/create-tour", label: "Create Tour" },
                            { path: "/admin/create-event", label: "Create Event" },
                            { path: "/admin/manage-tour", label: "Manage Tour" },
                            { path: "/admin/manage-users", label: "Manage Users" },
                            { path: "/admin/manage-bookings", label: "Manage Bookings" },
                            { path: "/admin/manage-reviews", label: "Manage Reviews" },
                            { path: "/admin/manage-events", label: "Manage Events" },
                        ].map(({ path, label }) => (
                            <div
                                key={path}
                                className="border border-[#32af6f] hover:bg-[#32af6f] hover:text-white text-center p-2 text-lg rounded-xl duration-300 w-full"
                            >
                                <Link to={path} onClick={() => setIsOpen(false)}>
                                    {label}
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Change Theme closer to menu */}
                    <div className='border-t border-[#32af6f] p-4 mt-2'>
                        <button
                            onClick={toggleTheme}
                            className='flex justify-center items-center gap-x-3 hover:text-[#32af6f] w-full'
                        >
                            <BsMoonStars /> Change Theme
                        </button>
                    </div>
                </div>

            </div>

            {/* Main content */}
            <div className="flex-1 lg:w-5/6 p-5 ml-0 lg:ml-0">
                <Outlet />
            </div>
        </section>
    );
};

export default Admin;
