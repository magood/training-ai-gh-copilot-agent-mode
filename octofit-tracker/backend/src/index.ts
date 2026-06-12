import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

const port = Number(process.env.PORT) || 8000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend' });
});

async function startServer(): Promise<void> {
  try {
    await mongoose.connect(mongoUri);
    app.listen(port, () => {
      console.log(`Backend listening on http://localhost:${port}`);
      console.log(`MongoDB URI: ${mongoUri}`);
    });
  } catch (error) {
    console.error('Failed to start backend:', error);
    process.exit(1);
  }
}

void startServer();
