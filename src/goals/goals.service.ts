import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { startOfMonth, endOfMonth, max } from 'date-fns';

import { IGoal } from './goals.schema';

import { CreateGoalDTO } from './dto/createGoal.dto';

@Injectable()
export class GoalsService {
  constructor(
    @InjectModel('Goal') private readonly GoalModel: Model<IGoal & Document>,
  ) {}

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

  async createGoal(goalDto: CreateGoalDTO): Promise<IGoal> {
    // determine goal end date = max end date of resources
    const resourcesEndDates = goalDto.learningResources.map(
      ({ endDate }) => new Date(endDate),
    );

    const goalEndDate = max(resourcesEndDates);

    const dbGoal: IGoal = {
      ...goalDto,
      endDate: goalEndDate,
    };

    return await this.GoalModel.create(dbGoal);
  }
}
