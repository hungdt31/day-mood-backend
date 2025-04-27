import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
      example: 'Một ngày vui vẻ',
      description: 'Title of the record',
      required: true
    })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Có nhiều điều thú vị',
    description: 'Content of the record',
    required: false
  })

  @IsString()
  @IsOptional()
  content: string;
  @ApiProperty({
    example: 1,
    description: 'User id',
    required: true
  })
  @IsPositive()
  user_id: number;

  @ApiProperty({
    example: 'Joyful',
    description: 'Mood of the record',
    required: true
  })
  @IsString()
  mood: string;

  @ApiProperty({
    example: [1,2,3],
    description: 'Activity ids',
    required: true
  })
  @IsNumber({},{each:true})
  activity_id: number[];

  @ApiProperty({
    example: 'ACTIVE',
    description: 'Status of the record',
    required: true
  })
  @IsOptional()
  status: RecordStatus;
}
