import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem("userInfo");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (parsed?.result?.user) {
                    setUser(parsed.result.user);
                    setToken(parsed.token || parsed.result.token || null);
                }
            } catch (e) {
                console.error("Error parsing stored userInfo", e);
            }
        }
    }, []);

    const login = (userData, authToken) => {
        setUser(userData);
        setToken(authToken);
        localStorage.setItem(
            "userInfo",
            JSON.stringify({ result: { user: userData }, token: authToken })
        );
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("userInfo");
    };

    // 🔹 ADD THIS FUNCTION
    const signup = async ({ name, email, password, passwordConfirm }) => {
        const res = await axios.post("https://bhutanwanderluxe.onrender.com/api/v1/users/signup", {
            name,
            email,
            password,
            passwordConfirm
        });

        if (res.data?.token && res.data?.user) {
            login(res.data.user, res.data.token);
        }

        return res.data;
    };

    return (
        <AuthContext.Provider value={{ user, token, setUser, login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
