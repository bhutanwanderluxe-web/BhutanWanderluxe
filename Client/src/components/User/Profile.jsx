import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";

const Profile = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleProfileClick = () => {
        if (!user) {
            navigate("/login");
            return;
        }
        navigate("/dashboard"); //  both user and admin go here
    };

    return (
        <div className="profile-section">
            <span
                onClick={handleProfileClick}
                className="text-white text-2xl cursor-pointer"
                title="Go to Dashboard"
            >
                <CgProfile />
            </span>
        </div>
    );
};

export default Profile;
