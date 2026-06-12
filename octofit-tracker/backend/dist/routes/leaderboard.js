"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LeaderboardEntry_1 = require("../models/LeaderboardEntry");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const leaderboard = await LeaderboardEntry_1.LeaderboardEntryModel.find().sort({ rank: 1 }).lean();
    res.json(leaderboard);
});
exports.default = router;
