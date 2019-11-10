import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { startOfMonth, endOfMonth } from 'date-fns';

import { IGoal } from './goals.schema';

@Injectable()
export class GoalsService {
  constructor(@InjectModel('Goal') private readonly GoalModel: Model<IGoal>) {}

  async getAllGoals(): Promise<IGoal[]> {
    return await this.GoalModel.find();
  }

  async getMonthGoals(date: string): Promise<IGoal[]> {
    const firstDayInMonth: Date = startOfMonth(new Date(date));
    const lastDayInMonth: Date = endOfMonth(new Date(date));

    return await this.GoalModel.find({
      startDate: {
        $gte: firstDayInMonth,
        $lte: lastDayInMonth,
      },
    });
  }

  async createGoal(goal: IGoal): Promise<IGoal> {
    return await this.GoalModel.create(goal);
  }
}
