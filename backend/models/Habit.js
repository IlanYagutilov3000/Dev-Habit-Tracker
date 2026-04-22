const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    color: {
        type: String,
        default: "#8EFFC1"
    },
    isActive: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });

const Habit = mongoose.model("habit", habitSchema);
module.exports = Habit; 