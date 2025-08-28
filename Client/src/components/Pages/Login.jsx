import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // fixed import here
import { useAuth } from "../../components/AuthContext/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault(); // prevent form submission reload

        try {
            const { data } = await axios.post(
                "https://bhutanwanderluxe.onrender.com/api/v1/users/login",
                { email, password },
                { headers: { "Content-Type": "application/json" } }
            );

            if (data) {
                localStorage.setItem("userInfo", JSON.stringify(data));
                // If your context login expects user and token separately, pass accordingly
                login(data.result.user, data.token || data.result.token);

                if (data?.result?.user?.role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            }
        } catch (error) {
            console.log(error);
            // Optionally show a toast or message for user feedback
        }
    };

    const handleGoogleLogin = async (credentialResponse) => {
        try {
            const decoded = jwtDecode(credentialResponse.credential);
            console.log("Decoded Google User:", decoded);

            const { data } = await axios.post(
                "https://bhutanwanderluxe.onrender.com/api/v1/users/google-login",
                {
                    email: decoded.email,
                    name: decoded.name,
                    picture: decoded.picture,
                    sub: decoded.sub,
                }
            );

            if (data) {
                localStorage.setItem("userInfo", JSON.stringify(data));
                login(data.result.user, data.token || data.result.token);

                if (data?.result?.user?.role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            }
        } catch (error) {
            console.error("Google login error", error);
        }
    };

    return (
        <section className="login-section py-10 bg-[#F3F4F5] flex justify-center">
            <div className="container flex flex-col justify-between items-center gap-y-10">
                <div>
                    <h1 className="text-xl">Natours</h1>
                </div>
                <div>
                    <h1 className="text-xl sm:text-3xl font-bold">Good to see you again!</h1>
                </div>
                <div className="w-[200px] sm:w-[300px]">
                    <form className="login-form flex flex-col gap-y-5" onSubmit={handleLogin}>
                        <div className="form-group border-b-2 border-[#32af6f] flex justify-start items-center h-[50px]">
                            <input
                                className="w-full h-full border-none"
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group border-b-2 border-[#32af6f] flex justify-start items-center h-[50px]">
                            <input
                                className="w-full h-full border-none"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group text-right">
                            <Link to={"/forgot-password"} className="hover:text-[#32af6f] hover:underline">
                                Forgot password?
                            </Link>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex justify-center items-center border h-[50px] bg-[#32af6f] text-white text-lg rounded-2xl hover:cursor-pointer w-full"
                            >
                                LOGIN
                            </button>
                        </div>
                        <div className="flex justify-center">
                            <GoogleLogin
                                onSuccess={handleGoogleLogin}
                                onError={() => {
                                    console.log("Google Login Failed");
                                }}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Login;
