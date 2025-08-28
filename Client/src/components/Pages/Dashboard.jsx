import React, { useState } from "react";
import TourSection from "./TourSection.jsx";
import UpdateProfile from "../User/UpdateProfile.jsx";
import UpdatePassword from "../User/UpdatePassword.jsx";
import { useAuth } from "../AuthContext/AuthContext";

const Dashboard = () => {
    const { user } = useAuth();
    const [updateProfile, setUpdateProfile] = useState(false);
    const [updatePassword, setUpdatePassword] = useState(false);

    const handleClose = () => {
        setUpdatePassword(false);
        setUpdateProfile(false);
    };

    if (!user) {
        return <p className="text-center py-20">Loading...</p>;
    }
    console.log(user);

    return (
        <section className="dashboard-section flex justify-center bg-[#F3F4F5] py-16 ">
            <div className="container flex flex-col gap-y-10">
                <div className="flex justify-center gap-x-5">
                    <img
                        className="w-32 h-32 rounded-full object-cover"
                        src={user.photo}
                        alt="user_profile"
                    />
                    <div className="user-details flex flex-col gap-y-1 justify-center px-5">
                        <h1 className="text-2xl font-extrabold">{user.name}</h1>
                        <h1 className="text-xl font-bold text-[#777]">{user.email}</h1>
                        <div className="flex gap-x-3">
                            <div
                                className="w-[150px] text-center py-2 rounded-3xl bg-[#32af6f] text-white cursor-pointer"
                                onClick={() => {
                                    setUpdateProfile(true);
                                    setUpdatePassword(false);
                                }}
                            >
                                Update Profile
                            </div>
                            <div
                                className="border w-[150px] text-center py-2 rounded-3xl border-[#32af6f] cursor-pointer"
                                onClick={() => {
                                    setUpdateProfile(false);
                                    setUpdatePassword(true);
                                }}
                            >
                                Update Password
                            </div>
                        </div>
                        <div>
                            {updateProfile && <UpdateProfile handleClose={handleClose} />}
                            {updatePassword && <UpdatePassword handleClose={handleClose} />}
                        </div>
                    </div>
                </div>

                {/* Only render TourSection if role is user */}
                {user.role === "user" && <TourSection />}
            </div>
        </section>
    );
};

export default Dashboard;