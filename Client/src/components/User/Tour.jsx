import React from 'react'
import { useParams } from 'react-router-dom';
import TourHero from './TourHero';
import AboutTour from './AboutTour';
import TourImages from './TourImages';
import BookingSection from './BookingSection';
import { useUser } from '../ContextConfig/ContextConfig';
import WeatherForcast from './WeatherForcast/WeatherForcast';
import TourReviews from './TourReviews';

const Tour = () => {
    const { tours } = useUser();
    const { tourId } = useParams();
    // const tourId = match.params.id;
    const tour = tours.find(p => p._id === tourId || p.id === tourId);
    // console.log("tours",tour);

    if (!tour) return <div>Tour  not found</div>;
    return (
        <>
            <TourHero tour={tour} />
            <AboutTour tour={tour} />
            <TourImages tour={tour} />
            <WeatherForcast tour={tour} />
            <BookingSection tour={tour} />
            <TourReviews tour={tour} />
        </>
    )
}

export default Tour