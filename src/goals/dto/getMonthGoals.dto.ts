import { IsDateString } from 'class-validator';

export class GetMonthGoalsDTO {
  @IsDateString()
  date!: string;
}
