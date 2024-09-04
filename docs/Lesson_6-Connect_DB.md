# Connect Database

Tài liệu: [https://docs.nestjs.com/techniques/database](https://docs.nestjs.com/techniques/database)

Chúng ta code backend thông qua ORM/ODM để chọn nhanh, không tính việc viết "raw query" truyền thống.

## 1. Các loại database hỗ trợ

- Nest hỗ trợ với bất kỳ loại SQL và NoSQL database nào, giống hệt như việc làm với Express (or Fastify).
- Với SQL, hỗ trợ các thư viện nổi tiếng sau: (mysql, sql server, postgres, oracle ...)
  - MikroORM: [https://mikro-orm.io/](https://mikro-orm.io/)
  - Sequelize: [https://mikro-orm.io/](https://mikro-orm.io/)
  - Knex.js: [https://knexjs.org/](https://knexjs.org/)
  - TypeORM: [https://typeorm.io/](https://typeorm.io/)
  - Prisma: [https://www.prisma.io/](https://www.prisma.io/)

Với NoSQL, hỗ trợ MongoDB: [https://www.mongodb.com/](https://www.mongodb.com/)

Đặc biệt, NestJS hỗ trợ TypeORM, Sequelize và Mongoose (mongodb) với các package `@nestjs/typeorm`, `@nestjs/sequelize`, `@nestjs/mongoose`.

$\Rightarrow$ giúp việc coding càng trở nên dễ dàng hơn.

## 2. Connect to MongoDB Compass

- Tạo tài khoản với MongoDB Atlas, bảo mật cluster trước khi sử dụng:
![alt text](/images/Lesson6/account.png)
- Chú ý đến địa chỉ IP khi kết nối database bằng phần mềm MongoDB Compass:
![alt text](/images/Lesson6/network.png)

![alt text](/images/Lesson6/image.png)

## 3. Connect to NestJS

- Đối **ENV Variables** dùng file `.env` [https://www.npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv) hoặc Config service [https://docs.nestjs.com/techniques/configuration](https://docs.nestjs.com/techniques/configuration).
- [https://github.com/nestjsx/nestjs-config/issues/19](https://github.com/nestjsx/nestjs-config/issues/19)
- Khai báo MongooseModule (set up uri connecting to MongoDB) cho AppModule để thông báo Service đến các Modules cần sử dụng.

```ts
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
```
- Đối với file `main.ts`:

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );
  const configService = app.get(ConfigService);
  app.useStaticAssets(join(__dirname, '..', 'public')); // js, css, img, ...
  app.setBaseViewsDir(join(__dirname, '..', 'views')); // views
  app.setViewEngine('ejs');
  await app.listen(configService.get<string>('PORT'));
}
bootstrap();
```

- Đối với file Controller:

```ts
import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  handleHomePage() {
    // port from .env
    console.log(">> check port = ", this.configService.get<string>('PORT'));  
    // TODO
  }
}
```
