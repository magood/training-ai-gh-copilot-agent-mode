"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutModel = void 0;
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    focusArea: { type: String, required: true },
    level: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    exercises: [{ type: String, required: true }],
}, { collection: 'workouts', timestamps: true });
exports.WorkoutModel = (0, mongoose_1.model)('Workout', workoutSchema);
