import { PartialType } from '@nestjs/mapped-types';
import { CreateDataExampleDto } from './create-data-example.dto';

export class UpdateDataExampleDto extends PartialType(CreateDataExampleDto) {}
