"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const teams_1 = __importDefault(require("./routes/teams"));
const users_1 = __importDefault(require("./routes/users"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 8000;
const host = '0.0.0.0';
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
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
        await (0, database_1.connectDatabase)();
        app.listen(port, host, () => {
            console.log(`Backend listening on ${apiBaseUrl}`);
            console.log(`MongoDB URI: ${database_1.mongoUri}`);
        });
    }
    catch (error) {
        console.error('Failed to start backend:', error);
        process.exit(1);
    }
}
void startServer();
