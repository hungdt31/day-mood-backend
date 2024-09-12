import { IsEnum, IsNotEmpty } from "class-validator"

enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

enum Module {
  USER = "USERS",
  PERMISSION = "PERMISSIONS",
  ROLE = "ROLES",
  COMPANY = "COMPANIES",
  RESUME = "RESUMES",
}

export class CreatePermissionDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  apiPath: string

  @IsNotEmpty()
  @IsEnum(Method)
  method: string

  @IsNotEmpty()
  @IsEnum(Module)
  module: string 
}
