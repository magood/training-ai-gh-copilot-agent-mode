import { Schema, model } from 'mongoose';

export interface Workout {
  title: string;
  focusArea: string;
  level: string;
  durationMinutes: number;
  exercises: string[];
}

const workoutSchema = new Schema<Workout>(
  {
    title: { type: String, required: true },
    focusArea: { type: String, required: true },
    level: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    exercises: [{ type: String, required: true }],
  },
  { collection: 'workouts', timestamps: true },
);

export const WorkoutModel = model<Workout>('Workout', workoutSchema);
