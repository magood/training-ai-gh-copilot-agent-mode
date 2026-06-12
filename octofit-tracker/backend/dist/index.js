"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const teams_1 = __importDefault(require("./routes/teams"));
const users_1 = __importDefault(require("./routes/users"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = Number(process.env.PORT) || 8000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend', apiBaseUrl });
});
app.get('/api/', (_req, res) => {
    res.json({
        baseUrl: apiBaseUrl,
        endpoints: {
            users: `${apiBaseUrl}/api/users/`,
            teams: `${apiBaseUrl}/api/teams/`,
            activities: `${apiBaseUrl}/api/activities/`,
            leaderboard: `${apiBaseUrl}/api/leaderboard/`,
            workouts: `${apiBaseUrl}/api/workouts/`,
        },
    });
});
app.use('/api/users/', users_1.default);
app.use('/api/teams/', teams_1.default);
app.use('/api/activities/', activities_1.default);
app.use('/api/leaderboard/', leaderboard_1.default);
app.use('/api/workouts/', workouts_1.default);
async function startServer() {
    try {
        await mongoose_1.default.connect(mongoUri);
        app.listen(port, () => {
            console.log(`Backend listening on ${apiBaseUrl}`);
            console.log(`MongoDB URI: ${mongoUri}`);
        });
    }
    catch (error) {
        console.error('Failed to start backend:', error);
        process.exit(1);
    }
}
void startServer();
