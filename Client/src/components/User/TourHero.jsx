import React from 'react'
import "./Hero.css"
import { CiLocationOn } from "react-icons/ci";
import { LuClock } from "react-icons/lu";

const TourHero = ({ tour }) => {
    const location = tour.startLocation;
    let tourName = tour.name;
    tourName = tourName.toUpperCase();
    return (
        <section className="hero-section h-96 relative ">
            <img className='h-full w-full object-cover' src={`${tour.imageCover}`} alt="" />
            <div className='hero  absolute top-0 left-0 w-full h-full flex justify-center items-center'>
                <div className='short-intro flex flex-col gap-y-2'>
                    <div><h1 className='text-white  text-2xl sm:text-5xl font-extrabold'>{tourName}</h1></div>
                    <div className='flex px-2 sm:px-5 '>
                        <div className=' w-3/6 text-white flex justify-center items-center gap-x-2 font-bold'><span className='font-bold'><LuClock /></span>{tour.duration} days</div>
                        <div className=' w-3/6 text-white flex justify-center items-center gap-x-2 font-bold'><span className='font-bold'><CiLocationOn /></span>{tour.location}</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TourHero;