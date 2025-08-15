const Event = require("../modals/eventModal");
const factory = require("./handlerFactory");

// Create Event
exports.createEvent = factory.createOne(Event);

// Get All Events
exports.getAllEvents = factory.getAll(Event);

// Get Single Event
exports.getEvent = factory.getOne(Event);

// Update Event
exports.updateEvent = factory.updateOne(Event);

// Delete Event
exports.deleteEvent = factory.deleteOne(Event);
