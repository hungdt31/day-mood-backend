import { Optional } from "@nestjs/common";
import { Prop } from "@nestjs/mongoose";
import { Transform, Type } from "class-transformer";
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
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  address: string;

  @IsInt()
  @Type(() => Number)
  age: number;

  @IsEnum(Role)
  @IsOptional()
  role: string;

  @IsEnum(Gender)
  @IsOptional()
  gender: string;
}
