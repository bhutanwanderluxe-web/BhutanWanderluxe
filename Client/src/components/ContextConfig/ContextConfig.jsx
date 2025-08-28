import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext/AuthContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { user } = useAuth(); // get user from AuthContext

    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(1); // pagination: current page
    const limit = 9;
    const [totalResults, setTotalResults] = useState(0);

    const EXPIRATION_TIME = 5 * 60 * 1000; // 5 minutes in ms

    const fetchData = async () => {
        try {
            setLoading(true);
            const cacheKey = `tours_page_${page}`;
            const cached = localStorage.getItem(cacheKey);

            if (cached) {
                const parsed = JSON.parse(cached);
                const isExpired = Date.now() - parsed.timestamp > EXPIRATION_TIME;

                if (!isExpired) {
                    setTours(parsed.data);
                    setTotalResults(parsed.totalResults || 0);
                    setLoading(false);
                    return;
                }
            }

            const config = user?.token
                ? {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
                : {};

            const response = await axios.get(
                `https://bhutanwanderluxe.onrender.com/api/v1/tours?page=${page}&limit=${limit}`,
                config
            );
            console.log("API response:", response.data);

            if (!response) {
                setError("Something went wrong");
                return;
            }

            const fetchedTours = response.data.doc;
            const resultsCount = response.data.results;

            setTours(fetchedTours);
            setTotalResults(resultsCount);

            // Cache the result
            localStorage.setItem(
                cacheKey,
                JSON.stringify({
                    data: fetchedTours,
                    totalResults: resultsCount,
                    timestamp: Date.now(),
                })
            );
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page, user?.token]); // refetch if page or user token changes
    // console.log("tours", tours);

    return (
        <UserContext.Provider
            value={{
                tours,
                loading,
                error,
                page,
                setPage,
                totalResults,
                limit,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
