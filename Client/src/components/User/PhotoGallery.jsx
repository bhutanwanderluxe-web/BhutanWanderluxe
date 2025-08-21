// PhotoGalleryBento.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Import images (same style as your img1)
import archery1 from "../../assets/gallery/archery-1.jpg";
import punakhaDzong1 from "../../assets/gallery/punakha-dzong-1.jpg";
import dochula1 from "../../assets/gallery/dochula-1.jpg";
import phobjikha1 from "../../assets/gallery/phobjikha-1.jpg";
import jakar1 from "../../assets/gallery/jakar-1.jpg";
import haavalley1 from "../../assets/gallery/haavalley-1.jpeg";
import drukpath1 from "../../assets/gallery/drukpath-1.jpg";
import taktsang1 from "../../assets/gallery/taktsang-1.jpg"; // Assuming this is the Tiger’s Nest image

// Minimal base64 placeholder (light gray)
const BLUR_PLACEHOLDER =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMScgaGVpZ2h0PScxJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxyZWN0IHdpZHRoPTEgaGVpZ2h0PTEgZmlsbD0nI2VlZWVlZScvPjwvc3ZnPg==";

const LazyImage = ({ src, alt, className }) => {
    const imgRef = useRef(null);
    const [currentSrc, setCurrentSrc] = useState(BLUR_PLACEHOLDER);

    useEffect(() => {
        let observer;
        const node = imgRef.current;
        if (!node) return;

        if ("IntersectionObserver" in window) {
            observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((e) => {
                        if (e.isIntersecting) {
                            setCurrentSrc(src);
                            observer.disconnect();
                        }
                    });
                },
                { rootMargin: "150px" }
            );
            observer.observe(node);
        } else {
            setCurrentSrc(src);
        }
        return () => observer && observer.disconnect();
    }, [src]);

    return (
        <img
            ref={imgRef}
            src={currentSrc}
            alt={alt}
            loading="lazy"
            className={className}
        />
    );
};

const IMAGES = [
    { src: taktsang1, caption: "Taktsang (Tiger's Nest), Paro" },
    { src: punakhaDzong1, caption: "Punakha Dzong in spring" },
    { src: dochula1, caption: "Dochula Pass, 108 chortens" },
    { src: phobjikha1, caption: "Phobjikha Valley cranes" },
    { src: jakar1, caption: "Jakar Dzong, Bumthang" },
    { src: haavalley1, caption: "Haa Valley prayer flags" },
    { src: drukpath1, caption: "Alpine lake on Druk Path" },
    { src: archery1, caption: "Traditional archery match" },
].slice(0, 8);

const PhotoGallery = () => {
    return (
        <section className="py-16 bg-[#F7F7F7] flex justify-center">
            <div className="container max-w-6xl px-4 lg:px-8">
                {/* Heading */}
                <div className="flex justify-center text-center mb-10">
                    <motion.h2
                        whileHover={{ rotate: 1 }}
                        className="text-[26px] lg:text-[30px] font-extrabold text-[#32af6f]"
                    >
                        PHOTO GALLERY
                    </motion.h2>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-[masonry] gap-4 auto-rows-[150px] md:auto-rows-[200px]">
                    {IMAGES.map((img, idx) => (
                        <figure
                            key={img.src}
                            className={`relative rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white ${idx === 0
                                ? "md:col-span-2 md:row-span-2" // Large hero tile
                                : idx === 3
                                    ? "md:row-span-2" // Tall tile
                                    : ""
                                }`}
                        >
                            <LazyImage
                                src={img.src}
                                alt={img.caption}
                                className="w-full h-full object-cover"
                            />
                            <figcaption className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-xs p-2">
                                {img.caption}
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PhotoGallery;
