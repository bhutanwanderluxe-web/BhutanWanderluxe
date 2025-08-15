const express = require("express");
const eventController = require("../controllers/eventController");
const authController = require("../controllers/authController");

const router = express.Router();

router
    .route("/")
    .get(eventController.getAllEvents) // Public: view events
    .post(
        authController.protect,
        authController.restrictTo("admin"),
        eventController.createEvent
    );

router
    .route("/:id")
    .get(eventController.getEvent) // Public: view single event
    .patch(
        authController.protect,
        authController.restrictTo("admin"),
        eventController.updateEvent
    )
    .delete(
        authController.protect,
        authController.restrictTo("admin"),
        eventController.deleteEvent
    );

module.exports = router;
