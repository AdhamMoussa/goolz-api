import { Schema, Document } from 'mongoose';

export const goalCategories = [
  'front end',
  'back end',
  'mobile development',
  'artificial intelligence',
  'blockchain',
  'devops',
  'databases',
  'computer science',
] as const;

export const resourceCategories = [
  'online course/tutorial',
  'book',
  'article',
  'side project',
] as const;

export interface IResource {
  title: string;
  url: string;
  category: typeof resourceCategories[number];
  hoursPerDay: number;
  weeklySchedule: Array<0 | 1 | 2 | 3 | 4 | 5 | 6>;
  startDate: Date;
  endDate: Date;
  completed?: boolean;
}

export interface IGoal {
  title: string;
  category: typeof goalCategories[number];
  startDate: Date;
  endDate: Date;
  learningResources: IResource[];
}

const ResourceSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Resource title is required'],
  },
  url: {
    type: String,
    required: [true, 'Resource URL is required'],
  },
  category: {
    type: String,
    required: [true, 'Resource category is required'],
  },
  hoursPerDay: {
    type: Number,
    required: [true, 'Resource hours-per-day field is required'],
  },
  weeklySchedule: {
    type: [Number],
    required: [true, 'Resource weekly-schedule field is required'],
  },
  startDate: {
    type: Date,
    required: [true, 'Resource start-date is required'],
  },
  endDate: {
    type: Date,
    required: [true, 'Resource end-date is required'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export const GoalSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Goal title is required'],
  },
  category: {
    type: String,
    enum: goalCategories,
    required: [true, 'Goal title is required'],
  },
  startDate: {
    type: Date,
    required: [true, 'Goal start-date is required'],
  },
  endDate: {
    type: Date,
    required: [true, 'Goal end-date is required'],
  },
  learningResources: {
    type: [ResourceSchema],
    required: [true, 'Goal should have at least one resource'],
  },
});
