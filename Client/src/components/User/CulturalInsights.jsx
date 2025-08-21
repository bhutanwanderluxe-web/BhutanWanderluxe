import React from 'react'
import { motion } from "framer-motion"

const CulturalInsights = () => {
    return (
        <section className="cultural-insights py-16 flex justify-center" style={{ backgroundColor: "#FAF9F6" }}>
            <div className="container flex flex-col gap-y-10">
                {/* Heading */}
                <div className='flex text-center justify-center p-2'>
                    <motion.h1
                        whileHover={{ rotate: 2 }}
                        className='text-[25px] hover:text-[30px] text-[#32af6f] font-extrabold'
                    >
                        DISCOVER BHUTAN'S RICH CULTURE
                    </motion.h1>
                </div>

                {/* Content */}
                <div className='flex flex-col-reverse lg:items-center justify-center gap-y-10 lg:flex lg:flex-row-reverse lg:gap-x-10 lg:px-16'>

                    {/* Left Side (Now Image) */}
                    <div className='p-2 lg:w-3/6'>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className='hover:border-[15px] p-4 hover:rounded-[15px] hover:border-[#32af6f]'
                        >
                            <img
                                className="w-full h-full object-cover rounded-lg"
                                src="https://upload.wikimedia.org/wikipedia/commons/f/f4/Bhutanese_Festival_Dance.jpg"
                                alt="Bhutan cultural dance"
                                loading="lazy"
                            />
                        </motion.div>
                    </div>

                    {/* Right Side (Now Text) */}
                    <div className='p-2 lg:w-3/6 lg:px-10 flex flex-col gap-y-6'>
                        <div className='flex flex-col gap-y-3'>
                            <h2 className='text-[15px] text-[#777] font-bold'>
                                A LAND OF LIVING TRADITIONS
                            </h2>
                            <p className='text-[15px] text-[#555]'>
                                Bhutan is one of the few places where ancient traditions still shape everyday life.
                                From vibrant festivals like <strong>Tsechus</strong> to the national dress of <strong>Gho</strong> and <strong>Kira</strong>,
                                culture here is not a performance—it's a way of life.
                            </p>
                        </div>

                        <div className='flex flex-col gap-y-3'>
                            <h2 className='text-[15px] text-[#777] font-bold'>
                                SPIRITUALITY IN EVERY STEP
                            </h2>
                            <p className='text-[15px] text-[#555]'>
                                Buddhism is deeply woven into Bhutan's identity. Prayer flags flutter on mountain passes,
                                monks chant in centuries-old monasteries, and every journey is a chance to discover
                                peace and mindfulness.
                            </p>
                        </div>

                        <div className='flex flex-col gap-y-3'>
                            <h2 className='text-[15px] text-[#777] font-bold'>
                                RESPECTING LOCAL CUSTOMS
                            </h2>
                            <p className='text-[15px] text-[#555]'>
                                Visitors are warmly welcomed, but it's important to show respect—remove shoes before entering temples,
                                dress modestly, and follow local etiquette when visiting religious sites.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CulturalInsights
