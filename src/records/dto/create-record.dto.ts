import { RecordStatus } from '@prisma/client';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateRecordDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsPositive()
  user_id: number;

  @IsString()
  mood: string;

  @IsNumber({},{each:true})
  activity_id: number[];

  @IsOptional()
  status: RecordStatus;
}
