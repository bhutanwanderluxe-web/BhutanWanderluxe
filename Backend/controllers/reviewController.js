const Review = require("../modals/reviewModal");
const factory = require("./handlerFactory");
const catchAsync = require('./../utils/catchAsync');

exports.setTourUserIds = (req, res, next) => {
    // Allow nested routes
    if (!req.body.tour) req.body.tour = req.params.tourId;
    if (!req.body.user) req.body.user = req.user.id;
    next();
};


exports.getReviewsForTour = catchAsync(async (req, res, next) => {
    const { tourId } = req.params;

    const reviews = await Review.find({ tour: tourId })
        .sort({ createdAt: -1 }); // optional: newest first

    res.status(200).json({
        status: "success",
        results: reviews.length,
        data: {
            reviews,
        },
    });
});


exports.getAllReviews = factory.getAll(Review, [
    { path: 'tour', select: 'name' },
    { path: 'user', select: 'name photo' },
]);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
