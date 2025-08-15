const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Booking = require("../modals/bookingModal");
const catchAsync = require("../utils/catchAsync");
const Tour = require("../modals/tourModal");
const factory = require("./handlerFactory");

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
    // 1) Get the currently booked tour
    const tour = await Tour.findById(req.params.tourId);
    console.log(tour.name, tour.summary, tour.imageCover, tour.price);


    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],

        success_url: `${req.protocol}://${req.get(
            "host"
        )}/api/v1/users/verified/?tour=${req.params.tourId}&user=${req.user.id
            }&price=${tour.price}`,
        cancel_url: `${req.protocol}://127.0.0.1:5173/product/${tour.id}`,
        customer_email: req.user.email,
        client_reference_id: req.params.tourId,
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    unit_amount: tour.price * 100,
                    product_data: {
                        name: tour.name,
                        description: tour.summary,
                        images: [`${tour.imageCover}`],
                    },
                },
                quantity: 1,
            },
        ],
        mode: "payment",
    });

    // 3) Create session as response
    res.status(200).json({
        status: "success",
        session,
    });
});

exports.createBookingCheckout = catchAsync(async (req, res, next) => {
    const { tour, user, price } = req.query;

    if (!tour && !user && !price) return next();
    await Booking.create({ tour, user, price });

    res.redirect(req.originalUrl.split("?")[0]);
});

// In controllers/bookingController.js

exports.getMyBookings = catchAsync(async (req, res, next) => {
    const bookings = await Booking.find({ user: req.user.id }); // No populate
    res.status(200).json({
        status: 'success',
        results: bookings.length,
        bookings,
    });
});

exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBookings = factory.getAll(Booking, [
    { path: 'tour', select: 'name' },
    { path: 'user', select: 'name photo' },
]);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
