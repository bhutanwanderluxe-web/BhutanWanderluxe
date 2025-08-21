import React from 'react'
import Overview from '../User/Overview.jsx'
import AboutWebsite from '../User/AboutWebsite.jsx'
import Features from '../User/Features.jsx'
import PopularTours from '../User/PopularTours.jsx'
import Stories from '../User/Stories.jsx'
import EventCalendar from './EventCalender.jsx'
import TrekkingRoutes from '../User/TrekkingRoutes.jsx'
import PhotoGallery from '../User/PhotoGallery.jsx'

const Home = () => {
    return (
        <div className='' >
            <Overview />
            <AboutWebsite />
            <Features />
            <PopularTours />
            <Stories />
            <EventCalendar />
            <TrekkingRoutes />
            <PhotoGallery />
        </div>
    )
}

export default Home