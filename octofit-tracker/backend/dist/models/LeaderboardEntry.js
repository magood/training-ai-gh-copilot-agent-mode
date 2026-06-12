"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardEntryModel = void 0;
const mongoose_1 = require("mongoose");
const leaderboardEntrySchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    displayName: { type: String, required: true },
    teamName: { type: String, required: true },
    rank: { type: Number, required: true },
    points: { type: Number, required: true },
}, { collection: 'leaderboard', timestamps: true });
exports.LeaderboardEntryModel = (0, mongoose_1.model)('LeaderboardEntry', leaderboardEntrySchema);
