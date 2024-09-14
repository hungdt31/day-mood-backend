# Swagger

**Tài liệu**: [https://docs.nestjs.com/openapi/introduction](https://docs.nestjs.com/openapi/introduction)

## 1. Introduction

Là một bộ công cụ mã nguồn mở được sử dụng để thiết kế, xây dựng, tài liệu hóa và sử dụng các dịch vụ API (Application Programming Interface) một cách dễ dàng.

Hiện tại, nó được tích hợp với OpenAPI Specification (OAS), giúp định nghĩa các API theo một chuẩn thống nhất.

```bash
npm install --save @nestjs/swagger
```

Để thể hiện thông tin `dto`, chúng ta cần thêm decorator `@ApiProperty()`, ví dụ:

```ts
// ....
import { ApiProperty } from "@nestjs/swagger";

export class CreateJobDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  skills: string[];

  @ApiProperty()
  @IsNotEmpty()
  location: string;

  @ApiProperty()
  @IsNotEmpty()
  salary: string;

  // ....
}
```

Hoặc nếu bạn không tạo tài liệu ngay khi code, ta sử dụng `plugin` của `nest-cli`: [https://docs.nestjs.com/openapi/cli-plugin](https://docs.nestjs.com/openapi/cli-plugin)

```ts
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true,
    "plugins": [
      "@nestjs/swagger" // add this line to your code
    ]
  }
}
```

## 2. Các vấn đề chính

- Add tags cho controller:

```ts
//...
@ApiTags('users')
@Controller({ path: 'users', version: '1' })
//...
```

- Set up bearer token: [https://docs.nestjs.com/openapi/security](https://docs.nestjs.com/openapi/security) + [https://stackoverflow.com/questions/54802832/is-it-possible-to-add-authentication-to-access-to-nestjs-swagger-explorer](https://stackoverflow.com/questions/54802832/is-it-possible-to-add-authentication-to-access-to-nestjs-swagger-explorer)
- Set up dto for login with passport: [https://stackoverflow.com/questions/57457231/how-nestjs-uses-nestjs-swagger-to-generate-documentation-on-passport-strategies](https://stackoverflow.com/questions/57457231/how-nestjs-uses-nestjs-swagger-to-generate-documentation-on-passport-strategies)
- How to generate 2 different swagger based on the controller version: [https://stackoverflow.com/questions/71060554/nestjs-swagger-documentation-based-on-versioning](https://stackoverflow.com/questions/71060554/nestjs-swagger-documentation-based-on-versioning)
