import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useUser } from '../ContextConfig/ContextConfig';
import Loading from '../Layout/Loading';
import TourList from '../User/TourList';

const AllTours = () => {
    const { tours, loading, error } = useUser();
    const location = useLocation();


    if (loading) return <Loading />
    if (error) return <h1>Error...</h1>
    let filteredTours = [];

    if (location.state) {

        filteredTours = location.state.tours;
    }
    // console.log("h", tours);

    return (
        <section className="all-tours-section flex justify-center py-16 px-4 sm:px-16 bg-[#F3F4F5]">
            <div className="container w-full max-w-7xl">
                {filteredTours.length > 0 ? (
                    <TourList tours={filteredTours} />
                ) : (
                    <TourList tours={tours} />
                )}
            </div>
        </section>
    );
}

export default AllTours