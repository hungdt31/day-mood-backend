import { PartialType } from '@nestjs/swagger';
import { CreateResumeDto } from './create-resume.dto';
import { HistoryStatus } from '../schemas/resume.entity';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateResumeDto extends PartialType(CreateResumeDto) {
  @IsOptional()
  @IsEnum(HistoryStatus)
  status: HistoryStatus
}
