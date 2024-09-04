# Restful API

## 1. Generate resources

Tài liệu: [https://docs.nestjs.com/recipes/crud-generator](https://docs.nestjs.com/recipes/crud-generator)

Để tránh tạo ra file test, bạn có thể chèn cờ "--no-spec" như sau:

```bash
nest g resource users --no-spec
```

Cài đặt và sử dụng Postman: [https://www.postman.com/downloads/](https://www.postman.com/downloads/)

## 2. Design API

**Chú ý:** khi sử dụng NoSQL, đổi tên folder `entities` thành `schemas`, file định dạng `*.schema.ts`

Tạo schema user: [https://docs.nestjs.com/techniques/mongodb](https://docs.nestjs.com/techniques/mongodb)

```ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

// ở SQL document = table
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  phone: string;
  
  @Prop()
  address: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

```

### 2.1 Create a User

Tài liệu:

- [https://docs.nestjs.com/controllers#request-payloads](https://docs.nestjs.com/controllers#request-payloads)
- [https://docs.nestjs.com/techniques/mongodb#model-injection](https://docs.nestjs.com/techniques/mongodb#model-injection)

Tạo API với endpoint: 

**POST** http://localhost:8000/users

Body: { email, password, name, address, phone, age }

```ts
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel : Model<User>) {}

  async create(myEmail: string, myPassword: string, myName: string) {
    let user = await this.userModel.create({
      email: myEmail,
      password: myPassword,
      name: myName,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return {
      messege: "Create user success",
      user
    };
  }
  // TODO some method
}
```

- **Hash User's Password**

Package dùng để hash: [https://www.npmjs.com/package/bcryptjs](https://www.npmjs.com/package/bcryptjs)

```bash
npm i bcryptjs
npm i @types/bcryptjs
```

### 2.2. Data Transfer Object

- Một mô hình đơn giản được sử dụng để định nghĩa và kiểm tra dữ liệu từ request người dùng gửi lên server thông qua network.
- **Mục đích:**
  - Định nghĩa cấu trúc dữ liệu: DTO giúp xác định rõ ràng cấu trúc của dữ liệu mà ứng dụng sẽ nhận vào hoặc gửi ra.
  - Đóng gói dữ liệu: DTO giúp đóng gói và truyền dữ liệu giữa các lớp hoặc mô-đun trong ứng dụng.
  - Kiểm tra và xác thực dữ liệu: DTO thường được sử dụng cùng với các công cụ như class-validator trong NestJS để kiểm tra và xác thực dữ liệu trước khi nó được xử lý trong ứng dụng.

$\Rightarrow$ Kiểm tra và bảo mật, dễ bảo trì, rõ ràng.

Ví dụ:

```ts
export class CreateUserDto {
  email: string;
  password: string;
  name: string;
  address: string;
}
```

### 2.3. Pipes

Tài liệu: [https://docs.nestjs.com/pipes](https://docs.nestjs.com/pipes)

- Các loại Pipes:
  - Transformation: Biến đổi dữ liệu đầu vào thành định dạng mong muốn.
  - Validation: Kiểm tra và xác thực dữ liệu, đảm bảo dữ liệu đúng định dạng trước khi xử lý.
- Các Pipes có sẵn từ `@nestjs/common` package.
  - `ValidationPipe`
  - `ParseIntPipe`
  - `ParseFloatPipe`
  - `ParseBoolPipe`
  - `ParseArrayPipe`
  - `ParseUUIDPipe`
  - `ParseEnumPipe`
  - `DefaultValuePipe`
  - `ParseFilePipe`

#### 2.3.1. Validation

Tài liệu: [https://docs.nestjs.com/techniques/validation](https://docs.nestjs.com/techniques/validation)

[https://www.npmjs.com/package/class-validator](https://www.npmjs.com/package/class-validator)

[https://www.npmjs.com/package/class-transformer/v/0.1.0-beta.10](https://www.npmjs.com/package/class-transformer/v/0.1.0-beta.10)

- Khai báo Global Validation cho root:

```ts
app.useGlobalPipes(new ValidationPipe());
```

- Set up DTO để tự động bắt lỗi và trả về message

```ts
import { IsEmail, IsNotEmpty } from "class-validator";
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  name: string;
  address: string;
}
```

- Kết quả:

![Bad request](/images/Lesson7/bad_request.png)

### 2.4. Get User by Id

Tạo API với endpoint: **GET** http://localhost:8000/users/:id

Body: không cần truyền, gửi qua id ở url

```ts
findOne(id: string) {
  if (!mongoose.Types.ObjectId.isValid(id)) return "Id is invalid";
  return this.userModel.findOne({_id: id});
}
```

### 2.5. Update a User

**Lưu ý: omit password, email**

Tạo API với endpoint: **PUT** http://localhost:8000/users/:id

Body: truyền dữ liệu cần cập nhật, truyền id qua url để xác định User cần thay đổi

### 2.6. Delete a User

Tạo API với endpoint: **DELETE** http://localhost:8000/users/:id

Truyền id qua url để xác định User cần xóa.
