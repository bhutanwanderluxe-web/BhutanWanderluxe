const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    tour: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tour',
        required: [true, 'Booking must belong to a Tour!']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Booking must belong to a User!']
    },
    price: {
        type: Number,
        required: [true, 'Booking must have a price.']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    paid: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['pending', 'booked', 'cancelled'],
        default: 'pending'
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});


bookingSchema.pre(/^find/, function (next) {
    this.populate('user').populate({
        path: 'tour',
        select: 'email'
    });
    next();
});

bookingSchema.pre(/^find/, function (next) {
    this.populate('tour').populate({
        path: 'tour',
        select: 'name'
    });
    next();
});

bookingSchema.pre('save', function (next) {
    if (this.paid) {
        this.status = 'booked';
    }
    next();
});


const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;