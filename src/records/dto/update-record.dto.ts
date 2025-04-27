import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateRecordDto } from './create-record.dto';

export class UpdateRecordDto extends PartialType(
  OmitType(CreateRecordDto, ['user_id', 'mood', 'activity_id'] as const)
) {}