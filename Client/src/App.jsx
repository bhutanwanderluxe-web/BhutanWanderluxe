import React, { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import your components here
import Home from "./components/Pages/Home";
import AllTours from "./components/Pages/AllTours";
import Login from "./components/Pages/Login";
import Signup from "./components/Pages/Signup";
import Admin from "./components/Pages/Admin";
import Contact from "./components/User/ContactUs";
import AboutWebsite from "./components/User/AboutWebsite";
import CulturalInsights from "./components/User/CulturalInsights";
import Ettiquette from "./components/User/Ettiquette";
import CreateTour from "./components/Admin/CreateTour";
import UpdateTours from "./components/User/UpdateTours";
import Layout from "./components/Pages/Layout";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Tour from "./components/User/Tour";
import UserDashboard from "./components/Pages/UserDashboard";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ManageUsers from "./components/Admin/ManageUsers";
import ManageTours from "./components/Admin/ManageTours";
import ManageBookings from "./components/Admin/ManageBookings";
import ManageReviews from "./components/Admin/ManageReviews";
import ManageEvents from "./components/Admin/ManageEvents";
import CreateEvent from "./components/Admin/CreateEvent";
import UpdateEvent from "./components/Admin/UpdateEvent";

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <>
      <BrowserRouter>
        {/* ToastContainer can go here or inside Layout */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={theme === "dark" ? "dark" : "light"}
        />
        <Routes>
          <Route path="/" element={<Layout toggleTheme={toggleTheme} />}>
            <Route path="" element={<Home />} />
            <Route path="all-tours" element={<AllTours />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route
              path="/about"
              element={
                <>
                  <AboutWebsite />
                  <CulturalInsights />
                  <Ettiquette />
                </>
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="product/:tourId" element={<Tour />} />
            <Route path="admin" element={<Admin toggleTheme={toggleTheme} />}>
              <Route index element={<AdminDashboard />} />
              <Route path="create-tour" element={<CreateTour />} />
              <Route path="create-event" element={<CreateEvent />} />
              <Route path="manage-tour" element={<ManageTours />} />
              <Route path="manage-events" element={<ManageEvents />} />
              <Route path="update-tour" element={<UpdateTours />} />
              <Route path="update-event" element={<UpdateEvent />} />
              <Route path="manage-users" element={<ManageUsers />} />
              <Route path="manage-bookings" element={<ManageBookings />} />
              <Route path="manage-reviews" element={<ManageReviews />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
