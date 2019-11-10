import { Controller, Get, Post, Body } from '@nestjs/common';

import { GoalsService } from './goals.service';
import { IGoal } from './goals.schema';

import { CreateGoalDTO } from './dto/createGoal.dto';
import { GetMonthGoalsDTO } from './dto/getMonthGoals.dto';

@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Get()
  async getAllGoals(): Promise<IGoal[]> {
    return await this.goalsService.getAllGoals();
  }

  @Get('by_month')
  async getMonthGoals(@Body() body: GetMonthGoalsDTO): Promise<IGoal[]> {
    return await this.goalsService.getMonthGoals(body.date);
  }

  @Post()
  async createGoal(@Body() goalDto: CreateGoalDTO): Promise<IGoal> {
    return await this.goalsService.createGoal(goalDto);
  }
}
