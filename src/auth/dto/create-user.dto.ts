import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsEnum, isNotEmpty, IsNotEmpty, IsOptional, IsInt } from "class-validator";

enum Role {
  User = "user",
  Admin = "admin",
  Hr = "hr"
}
enum Gender {
  Female = "female",
  Male = "male",
  Unknown = "unknown"
}
export class RegisterDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  age: number;

  @ApiProperty()
  @IsEnum(Role)
  @IsOptional()
  role: string;

  @ApiProperty()
  @IsEnum(Gender)
  @IsOptional()
  gender: string;
}
