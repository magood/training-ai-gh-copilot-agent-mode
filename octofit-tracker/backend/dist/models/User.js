"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    role: { type: String, required: true },
    teamName: { type: String, required: true },
    age: { type: Number, required: true },
}, { collection: 'users', timestamps: true });
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
