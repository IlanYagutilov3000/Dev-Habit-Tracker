const express = require("express");
const router = express.Router();
const Joi = require("joi");
const verifyToken = require("../middleware/verifyToken");
const Log = require("../models/Log");
const calculateStreak = require("../helpers/streakCalculator");


// create a log
router.post("/", verifyToken, async (req, res) => {
    try {
        const log = new Log({
            userId: req.user._id,
            habitId: req.body.habitId,
            note: req.body.note,

        });
        await log.save()
        res.status(201).json({ message: "Log created", log })
    } catch (error) {
        res.status(500).send(error)
    }
})

//get logs
router.get("/", verifyToken, async (req, res) => {
    const startDate = req.query.startDate || new Date('2000-01-01')
    const endDate = req.query.endDate || new Date()
    try {
        const logs = await Log.find({
            userId: req.user._id,  // filter by user
            date: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        })
        const { currentStreak, longestStreak } = calculateStreak(logs)
        res.status(200).json({ logs, currentStreak, longestStreak })
    } catch (error) {
        res.status(500).send(error)
    }
})

// delete a log
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const log = await Log.findById(req.params.id);
        if (!log) return res.status(404).send("Log was not found")
        if (log.userId.toString() !== req.user._id.toString()) return res.status(403).send("Access denied");

        await Log.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Log was deleted" });

    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports = router