import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { IGoal } from './goals.model';

@Injectable()
export class GoalsService {
  constructor(
    @InjectModel('Goal') private readonly GoalModel: Model<IGoal & Document>,
  ) {}

  async getAllGoals(): Promise<IGoal[]> {
    return await this.GoalModel.find();
  }
}
