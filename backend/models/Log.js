const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    habitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Habit",
        required: true
    },
    note: {
        type: String,
        minlength: 2,
    },
    date: {
        type: Date,
        default: () => new Date().setHours(0, 0, 0, 0)
    }
}, { timestamps: true })

logSchema.index({ userId: 1, habitId: 1, date: 1 }, { unique: true });

const Log = mongoose.model("log", logSchema);
module.exports = Log