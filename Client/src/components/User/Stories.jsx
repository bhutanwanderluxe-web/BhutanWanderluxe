import React from 'react'
import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";

const Stories = () => {
    return (
        <section className="  stories-section flex justify-center py-16 ">
            <div className="container  p-2 flex flex-col justify-center gap-y-5">
                <div className='flex justify-center text-[#32af6f] text-[300] font-bold text-2xl ease-in-out duration-300 hover:text-3xl hover:rotate-2'>
                    <h1>WE MAKE PEOPLE GENUINELY HAPPY</h1>
                </div>
                <div className='  flex flex-col  md:items-center md:justify-center gap-y-10  p-2'>
                    <div className='stories   flex flex-col items-center  md:flex-row  md:p-5 md:gap-x-3 rounded-[20px]'>
                        <div className='  md:w-2/6  flex justify-center items-center '>
                            <img className='rounded-full w-32 h-32 md:w-48 md:h-48 object-cover' src="https://res.cloudinary.com/dltk6m7c5/image/upload/v1715168237/uurz7kmqewh0lt7vdxeb.png" alt="" />
                        </div>
                        <div className='w-5/6 md:w-4/6 flex flex-col gap-y-3'>
                            <h1 className='text-[#777] text-xl font-bold '>I HAD THE BEST WEEK EVER WITH MY FAMILY</h1>
                            <p className='text-[#777] text-md  md:text-lg flex  '>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis delectus cum, quisquam adipisci tenetur nihil reprehenderit consequatur autem ut tempore, modi molestias itaque, harum quas numquam placeat dolorem ducimus! Corrupti velit eius adipisci. Ipsum adipisci earum vitae accusantium hic. Vitae.</p>
                        </div>
                    </div>
                    <div className='stories  flex flex-col items-center  md:flex-row  md:p-5 md:gap-x-5 rounded-[20px]'>
                        <div className='  md:w-2/6  flex justify-center items-center '>
                            <img className='rounded-full w-32 h-32 md:w-48 md:h-48 object-cover' src="https://res.cloudinary.com/dltk6m7c5/image/upload/v1715166465/xzjjpi9y9emmerpgjvzo.jpg" alt="" />
                        </div>
                        <div className='w-5/6 md:w-4/6 flex flex-col gap-y-3'>
                            <h1 className='text-[#777] text-xl font-bold '>I HAD THE BEST WEEK EVER WITH MY FAMILY</h1>
                            <p className='text-[#777] text-md  md:text-lg flex  '>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis delectus cum, quisquam adipisci tenetur nihil reprehenderit consequatur autem ut tempore, modi molestias itaque, harum quas numquam placeat dolorem ducimus! Corrupti velit eius adipisci. Ipsum adipisci earum vitae accusantium hic. Vitae.</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <div className="w-[150px] flex justify-center items-center gap-x-1 text-[#32af6f] py-2 text-lg border-b border-[#32af6f] hover:text-white hover:bg-[#32af6f]">
                        <Link
                            to="/about"
                            className="flex items-center gap-x-1"
                        >
                            Read all stories <GoArrowRight />
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Stories