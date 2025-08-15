import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();

    const handleProfileClick = () => {
        // console.log("Profile component loaded for user:", user);

        navigate("/dashboard");
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
