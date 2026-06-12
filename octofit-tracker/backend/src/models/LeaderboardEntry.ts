import { Schema, model } from 'mongoose';

export interface LeaderboardEntry {
  username: string;
  displayName: string;
  teamName: string;
  rank: number;
  points: number;
}

const leaderboardEntrySchema = new Schema<LeaderboardEntry>(
  {
    username: { type: String, required: true },
    displayName: { type: String, required: true },
    teamName: { type: String, required: true },
    rank: { type: Number, required: true },
    points: { type: Number, required: true },
  },
  { collection: 'leaderboard', timestamps: true },
);

export const LeaderboardEntryModel = model<LeaderboardEntry>('LeaderboardEntry', leaderboardEntrySchema);
