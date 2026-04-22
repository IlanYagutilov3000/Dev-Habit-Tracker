const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const verifyToken = require("../middleware/verifyToken");
const Habit = require("../models/Habit");
const upload = require("../middleware/uploadFile");

const habitSchema = Joi.object({
    userId: Joi.string().optional(),
    name: Joi.string().min(2).required(),
    color: Joi.string().optional()
})

// create an habit
router.post("/", [verifyToken, upload.single('image')], async (req, res) => {
    try {
        const { error } = habitSchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const habit = new Habit({
            userId: req.user._id,
            name: req.body.name,
            color: req.body.color,
            isActive: true,
            image: req.file ? req.file.path : ""
        });

        await habit.save()
        res.status(201).json({ message: "Habit created", habit })

    } catch (error) {
        res.status(500).send(error)
    }
})


// get habit that belongs to the user
router.get("/", verifyToken, async (req, res) => {
    try {
        const habits = await Habit.find({ userId: req.user._id });
        res.status(200).json({ habits })
    } catch (error) {
        res.status(500).send(error)
    }
})

// mark habit as inactive
/* router.patch("/:id/toggle", verifyToken, async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);
        if (!habit) return res.status(404).send("No habit was found");

        if (habit.userId.toString() !== req.user._id.toString()) return res.status(403).send("Access denied");
        habit = await Habit.findByIdAndUpdate(req.params.id, { $set: { isActive: req.body.isActive } }, { new: true });

        res.status(200).json({ habit });

    } catch (error) {
        res.status(500).send(error)
    }
}) */

// mark habit as inactive
router.patch("/:id/toggle", verifyToken, async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);
        if (!habit) return res.status(404).send("Habit not found");

        if (habit.userId.toString() !== req.user._id.toString()) return res.status(403).send("Access denied");

        habit.isActive = !habit.isActive;
        await habit.save();

        res.status(200).json({ habit });
    } catch (error) {
        res.status(500).send("Server error");
    }
});

// update habit
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const { error } = habitSchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let habit = await Habit.findById(req.params.id);
        if (!habit) return res.status(404).send("No habit was found");
        if (habit.userId.toString() !== req.user._id.toString()) return res.status(403).send("Access denied");
        habit = await Habit.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(200).json({ habit })
    } catch (error) {
        res.status(500).send(error)
    }
})

// delete habit
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        let habit = await Habit.findById(req.params.id);
        if (!habit) return res.status(404).send("No habit found");

        if (habit.userId.toString() !== req.user._id.toString()) return res.status(403).send("Access denied");

        await Habit.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Habit was deleted" });

    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router