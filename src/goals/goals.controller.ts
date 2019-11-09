import { Controller, Get } from '@nestjs/common';

import { GoalsService } from './goals.service';
import { IGoal } from './goals.model';

@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Get()
  async getAllGoals(): Promise<IGoal[]> {
    return await this.goalsService.getAllGoals();
  }
}
