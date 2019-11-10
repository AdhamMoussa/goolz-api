import {
  IsString,
  IsDateString,
  ValidateNested,
  IsUrl,
  Max,
  Min,
  IsInt,
  IsArray,
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsIn,
  IsInstance,
} from 'class-validator';
import { Type } from 'class-transformer';

import { goalCategories, resourceCategories } from '../goals.schema';

class LearningResourcesDTO {
  @IsString()
  title!: string;

  @IsString()
  @IsUrl()
  url!: string;

  @IsString()
  @IsIn(Array(...resourceCategories))
  category!: typeof resourceCategories[number];

  @IsInt()
  @Max(24)
  @Min(1)
  hoursPerDay!: number;

  @IsArray()
  @ArrayMaxSize(7)
  @ArrayMinSize(1)
  @ArrayUnique()
  @IsInt({ each: true })
  @Max(6, { each: true })
  @Min(0, { each: true })
  weeklySchedule!: Array<0 | 1 | 2 | 3 | 4 | 5 | 6>;

  @IsDateString()
  startDate!: Date;

  @IsDateString()
  endDate!: Date;
}

export class CreateGoalDTO {
  @IsString()
  title!: string;

  @IsString()
  @IsIn(Array(...goalCategories))
  category!: typeof goalCategories[number];

  @IsDateString()
  startDate!: Date;

  @IsArray({})
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @IsInstance(LearningResourcesDTO, { each: true })
  @Type(() => LearningResourcesDTO)
  learningResources!: LearningResourcesDTO[];
}
