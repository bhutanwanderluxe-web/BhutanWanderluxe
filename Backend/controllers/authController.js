const crypto = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../modals/userModal");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const sendEmail = require("./../utils/email");


//Generate JWT token
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id); // still valid
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };
    if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

    res.cookie("jwt", token, cookieOptions);

    user.password = undefined;

    res.status(statusCode).json({
        status: "success",
        token,
        result: { user },
    });
};

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        // role: req.body.role,  
    });
    console.log(newUser);
    createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
    console.log('Login attempt:', req.body);
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
        return next(new AppError("Please provide email and password!", 400));
    }
    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select("+password").populate({ path: "bookings" });

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError("Incorrect email or password", 401));
    }

    // 3) If everything ok, send token to client
    createSendToken(user, 200, res);
});

exports.googleLogin = async (req, res) => {
    try {
        const { email, name, picture, sub } = req.body;

        if (!email || !sub) {
            return res.status(400).json({
                status: "fail",
                message: "Missing required Google user information",
            });
        }

        let user = await User.findOne({ googleId: sub });

        // If no user with Google ID, try email
        if (!user) {
            user = await User.findOne({ email });

            if (user) {
                //  SAFEGUARD: Don't override admin accounts
                if (user.role === 'admin') {
                    return res.status(403).json({
                        status: 'fail',
                        message: 'Cannot use Google login for admin account.',
                    });
                }

                // Update user with Google ID
                user.googleId = sub;
                user.photo = picture;
                await user.save();
            } else {
                // No user at all — create one
                user = await User.create({
                    name,
                    email,
                    googleId: sub,
                    photo: picture,
                    role: 'user', // default to normal user
                });
            }
        }

        // Send token and user info
        createSendToken(user, 200, res);
    } catch (error) {
        console.error("Google Login Error:", error);
        res.status(500).json({
            status: "error",
            message: "Google login failed",
            error: error.message,
        });
    }
};


exports.protect = catchAsync(async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token;
    console.log(req.headers.authorization);
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(
            new AppError("You are not logged in! Please log in to get access.", 401)
        );
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(
            new AppError(
                "The user belonging to this token does no longer exist.",
                401
            )
        );
    }

    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(
            new AppError("User recently changed password! Please log in again.", 401)
        );
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    console.log(req.user);
    next();
});

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        // roles ['admin', 'lead-guide']. role='user'
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError("You do not have permission to perform this action", 403)
            );
        }

        next();
    };
};


exports.forgotPassword = catchAsync(async (req, res, next) => {
    // console.log("email", req.body.email);
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new AppError("There is no user with that email address.", 404));
    }

    // 1. Generate a 6-digit numeric OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 2. Hash the OTP before saving
    const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

    // 3. Set it on the user
    user.passwordResetOTP = hashedOTP;
    user.passwordResetOTPExpires = Date.now() + 1 * 60 * 1000; // valid for 1 min

    await user.save({ validateBeforeSave: false });

    // 4. Send the OTP via email
    const message = `Your OTP for password reset is: ${otp}. It is valid for 1 minute.`;

    try {
        console.log("Before sending email...");
        await sendEmail({
            email: user.email,
            subject: "Your password reset OTP (valid for 1 min)",
            message,
        });
        console.log("Email sent successfully!");

        res.status(200).json({
            status: "success",
            message: "OTP sent to email!",
        });
    } catch (err) {
        console.error("Error sending email:", err); // Log the real error!
        user.passwordResetOTP = undefined;
        user.passwordResetOTPExpires = undefined;
        await user.save({ validateBeforeSave: false });

        return next(new AppError("Error sending OTP email. Try again later.", 500));
    }

});


exports.resetPasswordWithOTP = catchAsync(async (req, res, next) => {
    const { email, otp, password, passwordConfirm } = req.body;

    // 1. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        return next(new AppError("User not found", 404));
    }

    // 2. Check if OTP is valid
    const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

    if (
        !user.passwordResetOTP ||
        user.passwordResetOTP !== hashedOTP ||
        user.passwordResetOTPExpires < Date.now()
    ) {
        return next(new AppError("Invalid or expired OTP", 400));
    }

    // 3. Set the new password
    user.password = password;
    user.passwordConfirm = passwordConfirm;

    // 4. Clear OTP fields
    user.passwordResetOTP = undefined;
    user.passwordResetOTPExpires = undefined;

    await user.save();

    // 5. (Optional) Auto-login after reset
    createSendToken(user, 200, res);
});

// In your authController.js
exports.verifyOTP = catchAsync(async (req, res, next) => {
    const { email, otp } = req.body;
    console.log("Verify OTP Request Body:", { email, otp });

    const user = await User.findOne({ email });
    if (!user) {
        return next(new AppError("No user found with this email", 400));
    }
    // console.log(user.passwordResetOTP);
    if (!user.passwordResetOTP || !user.passwordResetOTPExpires) {
        return next(new AppError("No OTP found. Request a new one.", 400));
    }
    // const passwordResetOTP = user.passwordResetOTP

    const hashedOTP = crypto.createHash("sha256").update(otp.toString()).digest("hex");
    // console.log("hh", { passwordResetOTP, hashedOTP });

    if (
        user.passwordResetOTP !== hashedOTP ||
        user.passwordResetOTPExpires < Date.now()
    ) {
        return next(new AppError("Invalid or expired OTP", 400));
    }

    res.status(200).json({ status: 'success', message: 'OTP verified' });
});

// Route: PATCH /api/v1/users/resetPasswordAfterVerify
exports.resetPasswordAfterVerify = catchAsync(async (req, res, next) => {
    const { email, password, passwordConfirm } = req.body;

    const user = await User.findOne({ email });
    if (!user) return next(new AppError("User not found", 404));

    user.password = password;
    user.passwordConfirm = passwordConfirm;
    user.passwordResetOTP = undefined;
    user.passwordResetOTPExpires = undefined;

    await user.save();

    createSendToken(user, 200, res); // optional: auto login
});

exports.updatePassword = catchAsync(async (req, res, next) => {
    // 1) Get user from collection
    const user = await User.findById(req.user.id).select("+password");
    console.log(user);
    // 2) Check if POSTed current password is correct
    if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
        return next(new AppError("Your current password is wrong.", 401));
    }

    // 3) If so, update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();
    // User.findByIdAndUpdate will NOT work as intended!

    // 4) Log user in, send JWT
    createSendToken(user, 200, res);
});


