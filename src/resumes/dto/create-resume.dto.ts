import { IsNotEmpty, ValidateNested, IsString, IsEnum, IsMongoId, IsNotEmptyObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class FileCvDto {
  @IsMongoId()
  _id: string;

  @IsString()
  @IsNotEmpty()
  filename: string;

  @IsString()
  @IsNotEmpty()
  folderType: string;
}

export class CreateResumeDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  message: string;

  @IsMongoId()
  @IsNotEmpty()
  jobId: string;

  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ type: FileCvDto })
  @ValidateNested()
  @Type(() => FileCvDto)
  fileCV: FileCvDto;
}