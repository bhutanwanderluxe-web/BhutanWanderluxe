import React, { useState } from 'react'
import TourSection from './TourSection.jsx';
import UpdateProfile from '../User/UpdateProfile.jsx';
import UpdatePassword from '../User/UpdatePassword.jsx';

const Dashboard = ({ user }) => {
    const [updateProfile, setUpdateProfile] = useState(false);
    const [updatePassword, setUpdatePassword] = useState(false);

    const handleClose = () => {
        setUpdatePassword(false);
        setUpdateProfile(false);
    };

    return (
        <section className="dashboard-section flex justify-center bg-[#F3F4F5] py-16 ">
            <div className="container flex flex-col gap-y-10  ">
                <div className="flex justify-center gap-x-5">
                    <img
                        className="w-32 h-32 rounded-full object-cover"
                        src={user.photo}
                        alt="user_profile"
                    />
                    <div className="user-details flex flex-col gap-y-1 justify-center px-5">
                        <h1 className="text-2xl font-extrabold">{user.name}</h1>
                        <h1 className="text-xl font-bold text-[#777]">{user.email}</h1>
                        <div className="flex gap-x-3 ">
                            <div
                                className="w-[150px] text-center py-2 rounded-3xl bg-[#32af6f] text-white"
                                onClick={() => {
                                    setUpdateProfile(true);
                                    setUpdatePassword(false);
                                }}
                            >
                                Update Profile
                            </div>
                            <div
                                className="border w-[150px] text-center py-2 rounded-3xl border-[#32af6f]"
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

                {/* Render these sections only if user role is "user" */}
                {user.role === "user" && (
                    <>
                        <TourSection />
                        {/* <TransactionSection /> */}
                    </>
                )}
            </div>
        </section>
    );
};


export default Dashboard