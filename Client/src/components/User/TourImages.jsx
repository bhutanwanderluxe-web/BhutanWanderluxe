import React from 'react';

const TourImages = ({ tour }) => {
    const { images } = tour;

    return (
        <section className="tour-images-section flex justify-center py-16 bg-[#32af6f] px-0">
            <div className="container mx-0 flex px-2 flex-col gap-y-5 sm:flex-row sm:gap-x-5">
                {images && images.map((imageUrl, index) => (
                    <div key={index} className="w-full border">
                        <img
                            className="w-full h-full object-cover"
                            src={imageUrl}
                            alt={`Tour image ${index + 1}`}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TourImages;
