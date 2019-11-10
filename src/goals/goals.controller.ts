import { Controller, Get, Post, Body } from '@nestjs/common';

import { GoalsService } from './goals.service';
import { IGoal } from './goals.schema';

@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Get()
  async getAllGoals(): Promise<IGoal[]> {
    return await this.goalsService.getAllGoals();
  }

  @Get('by_month')
  async getMonthGoals(@Body('date') date: string): Promise<IGoal[]> {
    return await this.goalsService.getMonthGoals(date);
  }

  @Post()
  async createGoal(@Body() goal: IGoal): Promise<IGoal> {
    return await this.goalsService.createGoal(goal);
  }
}
