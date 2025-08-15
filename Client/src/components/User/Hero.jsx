import React from 'react';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Hero.css"

const Hero = () => {
    return (
        <div className='hero-section py-16 flex justify-center'>
            <div className="container flex flex-col gap-y-5">
                <div className='flex justify-center gap-x-4 text-[20px] sm:text-5xl sm:gap-x-8 text-white font-bold'>
                    <div >O</div>
                    <div >U</div>
                    <div >T</div>
                    <div >D</div>
                    <div >O</div>
                    <div >O</div>
                    <div >R</div>
                    <div >S</div>
                </div>
                <div className='flex justify-center gap-x-4  sm:gap-x-8'>
                    <div className='flex justify-center  gap-x-1 sm:gap-x-3  text-white'>
                        <div >I</div>
                        <div >S</div>
                    </div>
                    <div className='flex justify-center gap-x-1 sm:gap-x-3 text-white'>
                        <div>W</div>
                        <div >H</div>
                        <div >E</div>
                        <div >R</div>
                        <div >E</div>
                    </div>
                    <div className='flex justify-center gap-x-1 sm:gap-x-3'>
                        <div className="text-white">L</div>
                        <div className="text-white">I</div>
                        <div className="text-white">F</div>
                        <div className="text-white">E</div>
                    </div>
                    <div className='flex justify-center gap-x-1 sm:gap-x-3'>
                        <div className="text-white">H</div>
                        <div className="text-white">A</div>
                        <div className="text-white">P</div>
                        <div className="text-white">P</div>
                        <div className="text-white">E</div>
                        <div className="text-white">N</div>
                        <div className="text-white">S</div>
                    </div>
                </div>
                <div className='flex justify-center mt-4'>
                    <motion.div initial={{ x: 500 }} animate={{ x: 0 }} whileHover={{ scale: 1.2 }} className='border-none w-48 bg-white py-3 px-4 rounded-3xl text-sm flex justify-center items-center'>
                        <Link to="/all-tours">DISCOVER OUR TOURS</Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Hero;

