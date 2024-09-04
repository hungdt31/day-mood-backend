# MVC

## 1. Template View Engine

- Tham khảo: [https://docs.nestjs.com/techniques/mvc](https://docs.nestjs.com/techniques/mvc)

- Dùng decorator `@Render()` để tạo view ở đường dẫn cụ thể với phương thức GET:

```ts

import { Get, Controller, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  root() {
    return { message: 'Hello world!' };
  }
}
```

- Set up view engine cho app ở file `main.ts`:

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );
  app.useStaticAssets(join(__dirname, '..', 'public')); // js, css, img, ...
  app.setBaseViewsDir(join(__dirname, '..', 'views')); // views
  app.setViewEngine('ejs');
  await app.listen(3000);
}
bootstrap();
```

- `Model` trong MVC được sử dụng khi `Service` kết nối với database.

## 2. Vấn đề tồn đọng với SSR

Thực tế, chúng ta có 2 cách để render ra dữ liệu: CSR và SSR.

- CSR: Client Side Rendering, có nghĩa là client sẽ render ra dữ liệu HTML (ví dụ sử dụng React truyền thống).

![CSR](/images/Lesson5/CSR.png)

- SSR: Server Side Rendering, server sẽ render dữ liệu HTML.

![SSR](/images/Lesson5/SSR.png)

**Khi nào sử dụng SSR**: khi bạn muốn client nhận được phản hồi nhanh nhất (server phải mạnh).
