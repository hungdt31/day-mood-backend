# Nestjs Guard

## 1. Middleware

Tài liệu: [https://expressjs.com/en/guide/using-middleware.html](https://expressjs.com/en/guide/using-middleware.html)

Với Node.js, chúng ta có 1 khái niệm là middleware **myFunction(req, res, next) { ... }**

**request** $\Rightarrow$ middleware $\Rightarrow$ **response**

**req $\Rightarrow$ routes $\Rightarrow$ middleware $\Rightarrow$ controller $\Rightarrow$ service $\Rightarrow$ res**

Có 2 trường hợp xảy ra:

- req $\rightarrow$ route $\rightarrow$ middleware : dữ liệu không hợp lệ, không thực thi tiếp $\rightarrow$ res (thông báo lỗi).
- req $\rightarrow$ route $\rightarrow$ middleware : dữ liệu hợp lệ $\rightarrow$ next() $\rightarrow$ controller $\rightarrow$ service $\rightarrow$ res.

Hiểu đơn giản, middleware giúp bạn can thiệp vào giữa req và res.

## 2. Guards

Tài liệu: [https://docs.nestjs.com/guards](https://docs.nestjs.com/guards)

- Làm nhiệm vụ giống middleware: **But middleware, by its nature, is dumb.**
- Ngoài khả năng truy cập req, res, nó còn được sử dụng [Execution Context (không gian thực thi code)](https://viblo.asia/p/tim-hieu-ve-execution-context-trong-javascript-3NVRkm3KG9xn)

```ts
// file: roles.guard.ts
// using the @UseGuards() decorator
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}
```

**Tóm tắt sự khác biệt:**

- **Mục đích:** Middleware dùng để xử lý các tác vụ chung, trong khi Guards dùng để quyết định quyền truy cập.
- **Thứ tự thực thi:** Middleware chạy trước Guards. Guards chạy trước Interceptors và Pipes.
- **Phạm vi áp dụng:** Middleware áp dụng rộng rãi hơn (toàn bộ ứng dụng hoặc nhóm route), trong khi Guards áp dụng ở cấp độ cụ thể hơn (method, controller, hoặc global).

## 3. Extending guards

Sử dụng khi bạn muốn custom response của endpoint decorated với guards. Chẳng hạn trong chiến lực `jwt`, chú ý đến hàm override `handleRequest(err, user, info)`:

```ts
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
```

## 4. Global guards

- **Đăng ký JwtAuthGuard làm Global Guard:** Sử dụng APP_GUARD để thiết lập JwtAuthGuard bảo vệ tất cả các endpoint.

```typescript
providers: [
  { provide: APP_GUARD, useClass: JwtAuthGuard }
]
```

- **Tạo decorator `@Public()`:**
Sử dụng SetMetadata để tạo metadata đánh dấu route là public:

```typescript
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
```

- **Sử dụng `@Public()` cho các route cần bỏ qua bảo mật:**

```typescript
@Public()
@Get()
findAll() {
  return [];
}
```

- **Cập nhật JwtAuthGuard:**
Sử dụng Reflector để kiểm tra nếu route được đánh dấu là public và bỏ qua kiểm tra xác thực nếu có.

```typescript
// ...
constructor(private reflector: Reflector) { super(); }

canActivate(context: ExecutionContext) {
  const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
    context.getHandler(),
    context.getClass(),
  ]);
  return isPublic || super.canActivate(context);
}
```
