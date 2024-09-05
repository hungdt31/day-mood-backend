# JSON Web Token

## 1. Definition

Tài liệu: [https://jwt.io/](https://jwt.io/)

**JWT - JSON Web Token** là một chuỗi ký tự đã được mã hóa (tương tự như việc hash password).

Mục đích mã hóa token là để trao đổi giữa các hệ thống khác nhau và không làm lộ thông tin nhạy cảm (ví dụ như frontend và backend).

**Ví dụ về JWT:**

*eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c*

**JWT gồm 3 thành phần:**

- Header (algorithm & token type): chứa thuật toán mã hóa, và loại token.
- Payload (data): data được truyền đi giữa các bên sử dụng, được sử dụng dưới dạng json (object).
- Verify signature (chữ ký): client ký vào token (đánh dấu), chỉ có server (nắm giữa secret) là có thể giải mã token này.

## 2. Why to use

- Sử dụng JWT như là 1 cách an toàn để trao đổi thông tin giữa các bên liên quan. (client/server)
- Hỗ trợ thuật toán mạnh mẽ (encoded), và chỉ có secret của server mới có thể giải mã (decoded).
- **When?** Có các hệ thống khác nhau, cần có hình thức để xác thực user.

## 3. Phân loại Token

### 3.1. Access Token

- Được backend issued (backend là người tạo ra token này và lưu trữ secret để decode token).
- Thông thường được mã hóa dưới dạng JWT.
- Trường hợp hay gặp nhất, là user login. Nếu login thành công $\Rightarrow$ server sẽ trả về cho client bộ access_token/refresh_token
- Ứng với mỗi lời gọi request (API), client sẽ cần truyền thêm vào header access-token.
- Backend sẽ lấy thông tin của user trong token (ví dụ như username, email, id: những thông tin để định dạng user là ai)
- **Lưu ý:** không truyền thông tin nhạy cảm trong token (ví dụ như password, otp, ...)

### 3.2. Refresh Token

- Để đảm bảo an toàn, token thường có thời hạn sống (expired date).
- Vì nếu bị lộ token, người khác có thể mạo danh bạn.
- access_token (chứa thông tin user) $\Rightarrow$ có thời gian sống ngắn.
- refresh_token (chứa thông tin để tạo ra bộ access_token/refresh_token mới), có thời gian sống dài: 1 tháng, 3 tháng, 6 tháng, 1 năm, ...

### 3.3. Hình thức lưu trữ token

- **localStorage: access_token** $\Rightarrow$ thuận tiện việc truy cập/lưu trữ token, lấy data từ localStorage: localStorage.get('item').
- Đồng thời, do **access_token có thời gian sống ngắn**, nên khi bị lộ (hack localStorage), xác suất có rủi ro cũng giảm thiểu rất nhiều.
- sessionStorage: không dùng, vì khi close browser sẽ mất dữ liệu.
- cookies: refresh_token

Cookies có nhiều chế độ để đảm bảo an toàn khi truy cập, ví dụ, chỉ cho phép server sử dụng cookies, http = true

client (javascript): không thể lấy cookies = hàm **document.cookie**

Cookies sẽ tự hết hạn theo 1 thời gian nhất định (nếu set expired date) $\Rightarrow$ không dùng nó cũng tự mất.

**Backend:** backend có thể lưu trữ token ở memory (RAM), disk (file), hoặc database (hay dùng nhất).

## 4. Hiện thực mô hình

- Tuân theo mô hình **Stateless**, với route `**/login` (đăng nhập xác thực), endpoint phải trả lại `Access Token` có payload là các thông tin xác định người dùng tồn tại trong hệ thống.

![passport_local](/images/Lesson9/passport_local.png)

- Mỗi lần *client* gửi request đều phải đính kèm vào *header* một `Access Token` (ex., Bearer Token), thông qua `JWT Guard` ngăn cách giữa `req` và `res` của endpoint để kiểm tra tính hợp lệ của request, nếu hợp lệ thì cho vào sử dụng tài nguyên (database, services, ...).

![global_guard](/images/Lesson9/global_guard.png)
