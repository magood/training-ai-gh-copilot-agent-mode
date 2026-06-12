import { Schema, model } from 'mongoose';

export interface Team {
  name: string;
  city: string;
  members: number;
  captain: string;
  weeklyGoalMinutes: number;
}

const teamSchema = new Schema<Team>(
  {
    name: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    members: { type: Number, required: true },
    captain: { type: String, required: true },
    weeklyGoalMinutes: { type: Number, required: true },
  },
  { collection: 'teams', timestamps: true },
);

export const TeamModel = model<Team>('Team', teamSchema);
