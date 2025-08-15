import React from 'react'
import { motion } from "framer-motion"

const AboutWebsite = () => {
    return (
        <section className="about-tours py-16 flex justify-center" style={{ backgroundColor: "#F3F4F5" }}>
            <div className="container flex flex-col gap-y-10">
                <div className='flex  text-center justify-center p-2'>
                    <motion.h1 whileHover={{ rotate: 2 }} className='text-[25px] hover:text-[30px] text-[#[32af6f]] font-extrabold'>EXCITING TOURS FOR ADVENTUROUS PEOPLE</motion.h1>
                </div>
                <div className=' flex flex-col-reverse  lg:items-center justify-center gap-y-10 lg:flex lg:flex-row lg:gap-x-10   lg:px-16  '>
                    <div className=' p-2 lg:w-3/6 lg:px-10 flex flex-col  gap-y-2 '>
                        <div className='flex flex-col gap-y-5'>
                            <h1 className='text-[15px] text-[#777] font-bold'>YOU'RE GOING TO FALL IN LOVE WITH NATURE</h1>
                            <p className='text-[15px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, optio nesciunt recusandae sapiente numquam dignissimos ducimus ullam eum. Enim, fugit?</p>
                        </div>
                        <div className='flex flex-col gap-y-5'>
                            <h1 className='text-[15px] text-[#777] font-bold'>LIKE ADVENTUROUS LIKE YOU HAVE NEVER BEFORE</h1>
                            <p className='text-[15px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, optio nesciunt recusandae sapiente numquam dignissimos ducimus ullam eum. Enim, fugit?</p>
                        </div>
                    </div>
                    <div className=' p-2 lg:w-3/6  '>
                        <div className=' hover:border-[15px] p-4 hover:rounded-[15px] hover:border-[#32af6f] '><img className="w-full h-full" src="https://res.cloudinary.com/dltk6m7c5/image/upload/v1714434319/puydp4p4qx1g2424z2xv.jpg" alt="" /></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutWebsite;