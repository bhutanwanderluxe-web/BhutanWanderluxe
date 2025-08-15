import React from 'react'
import Hero from './Hero'

//F3F4F5
const Overview = () => {
    return (
        <section className='overview-section bg-[#32af6f]   h-[50vh] sm:h-[80vh] flex flex-col gap-y-1 relative  '>
            <div className='z-20'>
                <Hero />
            </div>
            <div className='w-full h-full absolute top-0 left-0'>
                <img className='w-full h-full ' src="https://res.cloudinary.com/dltk6m7c5/image/upload/v1714434137/p61iw0ysojf6kganhhwz.jpg" alt="" />
            </div>

        </section>
    )
}

export default Overview