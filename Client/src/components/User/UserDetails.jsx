import axios from "axios";
import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";

const UserDetail = ({ user }) => {
    const navigate = useNavigate();
    const { token } = useAuth();

    const deleteUser = async (id) => {
        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
            };
            await axios.delete(`https://bhutanwanderluxe.onrender.com/api/v1/users/${id}`, config);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="grid grid-cols-12 gap-2">
            <div className="col-span-3 text-center text-[#777] text-[15px]">
                {user._id}
            </div>
            <div className="col-span-2 text-center text-[#777] text-[15px]">
                {user.name}
            </div>
            <div className="col-span-3 text-center text-[#777] text-[15px]">
                {user.email}
            </div>
            <div className="text-center text-[#777] text-[15px]">{user.role}</div>

            <div className="col-span-2 text-center text-[#777] text-[15px]">
                Booked Tours{" "}
            </div>
            <div
                className="text-center text-[#777] text-[15px] cursor-pointer"
                onClick={() => {
                    if (window.confirm("Are you sure you want to delete this user?")) {
                        deleteUser(user._id);
                    }
                }}
            >
                <MdEdit />
            </div>
        </div>
    );
};

export default UserDetail;
