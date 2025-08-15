import React from 'react';
import TourListBooked from './TourListBooked';
import TourListPending from './TourListPending';
import TourListCancelled from './TourListCancelled';

const BookedTour = ({ allBookings, status }) => {
    // Filter bookings based on selected status
    // console.log("all",allBookings);

    const filteredBookings = allBookings.filter(
        (booking) => booking.status === status
    );
    // console.log("filter",filteredBookings);

    return (
        <div className="booked-tours grid grid-cols-3 gap-4">
            {status === 'pending' && <TourListPending bookings={filteredBookings} />}
            {status === 'booked' && <TourListBooked bookings={filteredBookings} />}
            {status === 'cancelled' && <TourListCancelled bookings={filteredBookings} />}
        </div>
    );
};

export default BookedTour;
