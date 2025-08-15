const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Event must have a title"],
    },
    description: {
        type: String,
        default: "",
    },
    start: {
        type: Date,
        required: [true, "Event must have a start date"],
    },
    end: {
        type: Date,
        required: [true, "Event must have an end date"],
    },
    imageEvent: {
        type: String,
        required: [true, "An event must have an image"],
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, { timestamps: true });

// export default mongoose.model("Event", eventSchema);
const Event = mongoose.model("Event", eventSchema);

module.exports = Event;