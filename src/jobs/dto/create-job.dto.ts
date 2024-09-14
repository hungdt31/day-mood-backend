import { IsArray, IsNotEmpty, IsObject, IsNotEmptyObject, ValidateNested, IsDate, IsOptional, IsDateString, IsString } from "class-validator";
import { Type } from "class-transformer";
import { Company } from "src/companies/schemas/company.schema";
import { ApiProperty } from "@nestjs/swagger";

export class CreateJobDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  // check every element in the array is a string
  skills: string[];

  @ApiProperty()
  @IsNotEmpty()
  location: string;

  @ApiProperty()
  @IsNotEmpty()
  salary: string;

  @ApiProperty()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  level: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  startDate: Date;
  
  @ApiProperty()
  @IsDateString()
  @IsOptional()
  endDate: Date;

  @ApiProperty()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  company: Company;
}
