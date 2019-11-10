import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GoalsController } from './goals.controller';
import { GoalsService } from './goals.service';
import { GoalSchema } from './goals.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Goal', schema: GoalSchema }])],
  controllers: [GoalsController],
  providers: [GoalsService],
})
export class GoalsModule {}
