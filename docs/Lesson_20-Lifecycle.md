# Lifecycle Events

Link tài liệu: [https://docs.nestjs.com/fundamentals/lifecycle-events](https://docs.nestjs.com/fundamentals/lifecycle-events)

[https://viblo.asia/p/cach-request-lifecycle-hoat-dong-trong-nestjs-y3RL1awpLao](https://viblo.asia/p/cach-request-lifecycle-hoat-dong-trong-nestjs-y3RL1awpLao)

## 1. Request Lifecycle

![Nestjs-request-cycle](/images/Lesson20/nestjs.webp)

### 1.1. Middleware

Middleware được gọi đầu tiên khi request đến server, chúng ta thường dùng để xử lý và thay đổi thông tin request trước khi truyền đến *route handler*. Đây là thành phần đầu tiên được gọi nên thông thường khi cấu hình dự án chúng ta sẽ sử dụng chúng đầu tiên.

- **Global Bound Middleware**: đăng ký global trên toàn ứng dụng của chúng ta và sẽ được áp dụng cho tất cả các request được gửi đến. Chúng ta thường thấy khi sử dụng các package như **cors**, **helmet**, **body-parser**,... với cú pháp ```app.use()```.
- **Module Bound Middleware**: sử dụng trong một module bất kỳ để thực hiện các chức năng riêng.

### 1.2. Guards

Giống với Middleware nhưng khác ở truy cập vào **ExcecutionContext** instance nên có thể biết được *handler* nào tiếp theo sẽ được gọi sau khi gọi hàm ```next()```.

#### 1.2.1. Global guards

package **@nestjs/throttler** dùng để giới hạn request gọi đến một API nhất định, nếu truy cập vượt quá giới hạn sẽ trả về lỗi Too many requests

#### 1.2.2. Controller Guards

thường được dùng với **Jwt Authentication** (dùng jwt để protect route).

#### 1.2.3. Route guards

dùng các guard có tính chất riêng.

### 1.3. Interceptors

Cho phép chúng ta xử lý các *request* và *response* trước khi chúng được xử lý bởi controller hoặc được trả về cho client. Vì thế chúng ta có thể chèn thêm custom logic vào quá trình xử lý *request/response* của ứng dụng.

**Interceptors** thường được sử dụng cho các trường hợp sau đây:

- **Logging**: Ghi lại thông tin request và response để giám sát và phân tích.
- **Caching**: Lưu cache của các response để giảm thiểu việc truy vấn database hoặc service bên ngoài.
- **Transformation**: Chuyển đổi request hoặc response để phù hợp với định dạng mong muốn.
- **Error handling**: Xử lý lỗi và trả về response phù hợp.

Vì **Interceptors** xử lý cả request lẫn response nên sẽ có 2 phần:

- **Pre**: trước khi đến method handler của controller
- **Post**: sau khi có response trả về từ method handler.

#### 1.3.1. Global Interceptors

Tạo ```LoggingInterceptor``` để ghi lại thông tin user request đến API cũng như thời gian mà API phản hồi dữ liệu đến người dùng

#### 1.3.2. Controller Interceptors

```TimeoutInterceptor``` sẽ là ví dụ về **Controller Interceptors**, chúng ta có thể dùng để control response nếu request vượt quá thời gian định trước.

#### 1.3.3. Route Interceptors

**Interceptors** thường thấy khi dùng với Route Interceptors là ```ExcludeNull```, giúp loại bỏ các trường null khỏi response trước khi trả về cho user.

### 1.4. Pipes

Mục đích chính của Pipe là để kiểm tra, chuyển đổi và/hoặc sàng lọc dữ liệu được gửi và nhận về từ client.

Các trường hợp khi nên sử dụng Pipe bao gồm:

- **Xác thực dữ liệu**: Kiểm tra xem dữ liệu được gửi từ client có đúng định dạng và có hợp lệ hay không.
- **Chuyển đổi dữ liệu**: Chuyển đổi định dạng dữ liệu được gửi từ client thành dạng dữ liệu mà server có thể hiểu được, hoặc ngược lại chuyển đổi định dạng dữ liệu gửi về cho client.
- **Sàng lọc dữ liệu**: Lọc bỏ dữ liệu không cần thiết, nhạy cảm hoặc nguy hiểm.
