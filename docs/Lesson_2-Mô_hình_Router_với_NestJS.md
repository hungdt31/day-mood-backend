# Mô hình Router với NestJS

## Mô tả

![Router](/images/Lesson2/router.png)

- Controller là trung tâm hoạt động điều hướng, xử lý request, trả về response.
- Các router trong Nest Js còn hỗ trợ middleware, cho phép các xử lý trung gian được thực hiện trước hoặc sau khi yêu cầu được xử lý bởi endpoint.

## Điều hướng

Controller phụ trách phần điều hướng trang

- @Controller(): khi sử dụng decorator này, nếu bạn không truyền tham số $\Rightarrow$ sinh ra route "/"

- @Controller("/prefix): truyền tham số $\Rightarrow$ sinh ra route "/prefix"

- NestJS sẽ tự động "cộng gộp" Controller và method, có nghĩa là
  - @Controller()
  
    @Get('/user') $\Rightarrow$ sinh ra route "/user" với method GET
  - Ở file `*.controller.ts` nên đặt class theo tiền tố route để dễ review code.
