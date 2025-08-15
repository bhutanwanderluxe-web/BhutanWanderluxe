const express = require("express");
const cloudinary = require("cloudinary").v2;
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");
const bookingController = require("./../controllers/bookingController");
const contactRouter = require("./contactRoutes");
const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

router.get("/verified", bookingController.createBookingCheckout, (req, res) => {
    res.render("emailVerified");
});

router.get("/natour-stats", userController.getNatourStats);
router.get("/user-Stats", userController.getUserStats);
router.post("/signup", authController.signup);
router.post("/login", authController.login);
// router.post("/forgotPassword", authController.forgotPassword);
// router.patch("/resetPassword/:token", authController.resetPassword);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPasswordWithOTP', authController.resetPasswordWithOTP);
router.patch('/resetPasswordAfterVerify', authController.resetPasswordAfterVerify);
router.post('/verifyOTP', authController.verifyOTP);
router.post("/google-login", authController.googleLogin);


//  Protect all routes after this point
router.use(authController.protect);

//  Contact route for logged-in users only
router.use("/contact", authController.restrictTo("user"), contactRouter);

router.patch("/updateMyPassword", authController.updatePassword);
router.get("/me", userController.getMe, userController.getUser);
router.patch("/updateMe", userController.updateMe);
router.delete("/deleteMe", userController.deleteMe);
router.get("/bookings", userController.getUserBookings);

//  Admin-only access for all routes below
router.use(authController.restrictTo("admin"));

router
    .route("/")
    .get(userController.getAllUsers)
    .post(userController.createUser);

router
    .route("/:id")
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

router
    .route('/:id/disable')
    .patch(userController.disableUser);

module.exports = router;
