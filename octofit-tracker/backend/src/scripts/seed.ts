import { connectDatabase, disconnectDatabase } from '../config/database';
import { ActivityModel } from '../models/Activity';
import { LeaderboardEntryModel } from '../models/LeaderboardEntry';
import { TeamModel } from '../models/Team';
import { UserModel } from '../models/User';
import { WorkoutModel } from '../models/Workout';

async function seedDatabase(): Promise<void> {
  console.log('Seed the octofit_db database with test data');

  await connectDatabase();

  await Promise.all([
    UserModel.deleteMany({}),
    TeamModel.deleteMany({}),
    ActivityModel.deleteMany({}),
    LeaderboardEntryModel.deleteMany({}),
    WorkoutModel.deleteMany({}),
  ]);

  await TeamModel.insertMany([
    {
      name: 'OctoFit Trailblazers',
      city: 'Seattle',
      members: 8,
      captain: 'Mona Octocat',
      weeklyGoalMinutes: 1800,
    },
    {
      name: 'Branch Sprinters',
      city: 'Austin',
      members: 6,
      captain: 'Hubber Lee',
      weeklyGoalMinutes: 1500,
    },
    {
      name: 'Merge Masters',
      city: 'Denver',
      members: 7,
      captain: 'Avery Chen',
      weeklyGoalMinutes: 1680,
    },
  ]);

  await UserModel.insertMany([
    {
      username: 'moctocat',
      email: 'mona@example.com',
      displayName: 'Mona Octocat',
      role: 'captain',
      teamName: 'OctoFit Trailblazers',
      age: 32,
    },
    {
      username: 'hlee',
      email: 'hubber@example.com',
      displayName: 'Hubber Lee',
      role: 'captain',
      teamName: 'Branch Sprinters',
      age: 29,
    },
    {
      username: 'achen',
      email: 'avery@example.com',
      displayName: 'Avery Chen',
      role: 'captain',
      teamName: 'Merge Masters',
      age: 35,
    },
    {
      username: 'jrivera',
      email: 'jordan@example.com',
      displayName: 'Jordan Rivera',
      role: 'member',
      teamName: 'OctoFit Trailblazers',
      age: 27,
    },
  ]);

  await ActivityModel.insertMany([
    {
      username: 'moctocat',
      activityType: 'running',
      durationMinutes: 42,
      caloriesBurned: 420,
      completedAt: new Date('2026-06-10T13:00:00Z'),
    },
    {
      username: 'hlee',
      activityType: 'cycling',
      durationMinutes: 55,
      caloriesBurned: 510,
      completedAt: new Date('2026-06-10T18:30:00Z'),
    },
    {
      username: 'achen',
      activityType: 'strength training',
      durationMinutes: 40,
      caloriesBurned: 330,
      completedAt: new Date('2026-06-11T12:15:00Z'),
    },
    {
      username: 'jrivera',
      activityType: 'rowing',
      durationMinutes: 35,
      caloriesBurned: 360,
      completedAt: new Date('2026-06-11T21:00:00Z'),
    },
  ]);

  await LeaderboardEntryModel.insertMany([
    {
      username: 'hlee',
      displayName: 'Hubber Lee',
      teamName: 'Branch Sprinters',
      rank: 1,
      points: 1480,
    },
    {
      username: 'moctocat',
      displayName: 'Mona Octocat',
      teamName: 'OctoFit Trailblazers',
      rank: 2,
      points: 1395,
    },
    {
      username: 'achen',
      displayName: 'Avery Chen',
      teamName: 'Merge Masters',
      rank: 3,
      points: 1320,
    },
    {
      username: 'jrivera',
      displayName: 'Jordan Rivera',
      teamName: 'OctoFit Trailblazers',
      rank: 4,
      points: 1255,
    },
  ]);

  await WorkoutModel.insertMany([
    {
      title: 'Starter Strength Circuit',
      focusArea: 'full body',
      level: 'beginner',
      durationMinutes: 25,
      exercises: ['bodyweight squats', 'incline push-ups', 'plank holds', 'walking lunges'],
    },
    {
      title: 'Lunch Break Cardio',
      focusArea: 'cardio',
      level: 'intermediate',
      durationMinutes: 30,
      exercises: ['jump rope', 'mountain climbers', 'high knees', 'cooldown walk'],
    },
    {
      title: 'Mobility Reset',
      focusArea: 'flexibility',
      level: 'all levels',
      durationMinutes: 20,
      exercises: ['hip openers', 'thoracic rotations', 'hamstring stretch', 'box breathing'],
    },
  ]);

  console.log('Seed complete');
}

seedDatabase()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnectDatabase();
  });
