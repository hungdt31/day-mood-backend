import { IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { Type } from 'class-transformer';

class Image {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty()
  @IsNotEmpty()
  filename: string;

  @ApiProperty()
  @IsNotEmpty()
  folderType: string;
}

export class CreateCompanyDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  industry: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: Image })
  @ValidateNested()
  @Type(() => Image)
  logo: Image;

  @ApiProperty({ type: [Image] })
  @ValidateNested({ each: true })
  @Type(() => Image)
  covers: Image[];
}