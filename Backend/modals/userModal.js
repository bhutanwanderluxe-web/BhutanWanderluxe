const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please tell us your name!"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        // lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    photo: {
        type: String,
        default: 'default.jpg',
    },
    role: {
        type: String,
        enum: ["user", "guide", "lead-guide", "admin"],
        default: "user",
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    password: {
        type: String,
        required: function () {
            return !this.googleId;
        },
        minlength: 8,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: function () {
            return !this.googleId;
        },
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: "Passwords are not the same!",
        },
    },
    passwordResetOTP: String,
    passwordResetOTPExpires: Date,
    passwordChangedAt: Date,
    // passwordResetToken: String,
    // passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        // select: false,
    },

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

userSchema.pre('save', async function (next) {
    // Only run if password was modified
    if (!this.isModified('password')) return next();

    // Hash the password
    this.password = await bcrypt.hash(this.password, 12);

    // Remove passwordConfirm from DB
    this.passwordConfirm = undefined;
    next();
});


userSchema.virtual('bookings', {
    ref: "Booking",
    foreignField: "user",
    localField: "_id",
})

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );

        return JWTTimestamp < changedTimestamp;
    }

    // False means NOT changed
    return false;
};

userSchema.methods.createPasswordResetOTP = function () {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit

    this.passwordResetOTP = crypto
        .createHash("sha256")
        .update(otp)
        .digest("hex");

    this.passwordResetOTPExpires = Date.now() + 1 * 60 * 1000; // 1 min

    return otp; // return plain OTP to email to user
};

const User = mongoose.model("User", userSchema);

module.exports = User;
