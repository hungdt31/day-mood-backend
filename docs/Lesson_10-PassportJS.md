# Passport JS

Tài liệu: [https://www.passportjs.org/](https://www.passportjs.org/)

## 1. Definition

- Passport là thư viện giúp việc authentication (xác thực.login) với Node.js một cách dễ dàng.
- Bản chất nó là một middleware, can thiệp vào req và res, như vậy sẽ xác nhận được (authenticated) là user đã đăng nhập hay chưa.
- Lưu ý: authentication vs authorization (passport là xác thực người dùng đã đăng nhập chưa, không liên quan tới phân quyền người dùng).

## 2. Why to use

- Đơn giản hóa việc xác thực người dùng.
- Support hơn 500+ strategies (các loại login khác nhau: Facebook, Google, Apple, Amazon, ...)
- An toàn hơn so với việc bạn tự code, vì ít nhất thư viện đã được sử dụng rộng rãi + được testing về security.

## 3. Local Strategies với NestJS

- **password** là thư viện gốc $\Rightarrow$ giúp tạo ra middleware (can thiệp req và res), và **lưu trữ thông tin người dùng đăng nhập (req.user)**.
- **@nestjs/passport** là thư viện viết theo phonng cách của nestjs, giúp việc can thiệp vào passport dễ dàng hơn.
- **passport-local**: đây là strategy hỗ trợ việc đăng nhập sử dụng usernaem/password
- Sau này, khi cần tạo ra jwt, chúng ta sẽ cài thêm strategy: **passport-jwt**.

Sử dụng với NestJS: [https://docs.nestjs.com/recipes/passport](https://docs.nestjs.com/recipes/passport)
