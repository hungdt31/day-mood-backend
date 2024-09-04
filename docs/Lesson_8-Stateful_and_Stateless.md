# Stateful and Stateless

## 1. Debug Nest.js application with vscode

[https://stackoverflow.com/questions/49504765/debugging-nest-js-application-with-vscode](https://stackoverflow.com/questions/49504765/debugging-nest-js-application-with-vscode)

Configure file launch.json trong Run and Debug

## 2. Stateful Application

**Who are you? user/guest**

**Who can you do? (view/create/update/delete)**

Mỗi lời gọi request từ client $\Rightarrow$ gửi lên server, cần biết ai là người thực hiện hành động ấy, và người đấy được phép làm những gì?

Giữa các lời gọi khác nhau, thông tin user không được lưu lại (http request), tức là:

GET /user

GET /profile

với 2 lời gọi này, client không truyền lên dữ liệu user là ai?

Làm cách nào để server biết ai là người đang đăng nhập sử dụng hệ thống?

### 1.1. Session

- Là "bộ nhớ" của server, dùng để lưu trữ thông tin của người dùng (phiên đăng nhập).
- Do client không truyền lên dữ liệu user $\Rightarrow$ client cần giữ "id" của user và gửi lên các lời gọi request (để bảo mật, id thường lưu ở cookies).
- Server dựa vào id này, truy vấn vào "session" để biết được người dùng đang đăng nhập là ai $\Rightarrow$ quyết định xử lý request với thông tin đã có.

### 1.2. Các phương pháp lưu trữ thông tin của client và server

Client (browser): local storage, session, cookies.

Server: session (memory/RAM, disk storage/file, database).

### 1.3. Cơ chế hoạt động

- Cần config session/cookies/passport cho express (file main.ts), như vậy khi app khởi động, nó đã biết sự tồn tại của session.
  - Ở đây, làm product không lưu session vào Memory.
  - Do dùng với mongodb $\Rightarrow$ lưu session vào mongodb.
- Tạo route login POST /login
  - Với route này, sử dụng "guard" của nestJS (truyền vào local strategy của passport) $\Rightarrow$ passport xử lý phần còn lại.
- Local Strategy được "nhúng" khi module khởi động, input từ HTML (bao gồm username/password) sẽ tự động chạy vào hàm "validate"
  - Nếu username/password không hợp lệ $\Rightarrow$ hiện thị thông báo lỗi.
  - Nếu username/password hợp lệ $\Rightarrow$ lưu thông tin vào session (request)
  - Session này cũng được lưu "1 bản sao" vào database.
  - Đồng thời, session cookies được lưu tại client (html).
- Mỗi lần load lại trang, cookies sẽ được gửi lên server
  - Server dựa vào cookies (lấy ra sessionId) $\Rightarrow$ kết hợp passport (session serializer), query xuống database bảng session, lấy ra session tương ứng.
  $\Rightarrow$ như vậy sẽ maintain được "session của user" mỗi lần refresh page.
### 1.4. Ưu, nhược điểm của Stateful

- **Ưu điểm:** 
  - Client không lưu giữ thông tin, ngoại trừ session_id $\Rightarrow$ tính bảo mật cao, ít bị lộ thông tin người dùng.
  - Server có thể "terminated"/chấm dứt/destroy/delete session của user bất cứ khi nào cần thiết. Khi session bị deleted, **user == logout**
- **Nhược điểm:**
  - Cần phải có cơ chế save/query session đủ nhanh (save Redis) (nếu số lượng người dùng truy cập lớn).
  - Không thể share sessions giữa các hệ thống khác nhau. Ví dụ: khi bạn thực hiện chuyển khoản liên ngân hàng, từ vcb $\rightarrow$ mb, sử dụng ứng dụng của vcb. Như vậy, khi bạn chuyển khoản tới mb, mb không biết bạn là ai, có hợp lệ hay không...

## 3. Stateless Application

### 3.1. Cơ chế hoạt động

- Không dùng session
- Client sử dụng: access token/refresh token để định danh thay cho session.
- Với mỗi lời gọi request, client gửi kèm token ở header, access token (đã mã hóa/encoded).

Token này chứa thông tin giúp định danh user là ai, và chỉ server mới có thể giải mã (decoded).

Server sẽ decode token gửi lên để biết ai là người thực hiện request $\Rightarrow$ xử lý request như bình thường.

- Để cho an toàn (trường hợp look access token, người khác có thể mạo danh bạn), access token thường có thời gian sử dụng ngăn (3 phút, 5 phút, 30 phút, ...).

Khi request gửi lên server với access token đã hết hạn

$\Rightarrow$ thông báo lỗi, và cần sử dụng refresh token.

Sử dụng refresh token để đổi lấy access token/refresh token với thời hạn sử dụng mới.

### 3.2. Ưu, nhược điểm của Stateless

- **Ưu điểm:**
  - Không dùng session.
  - Dựa hoàn toàn vào cơ chế tạo token (access_token, refresh_token).
  - Backend xử lý đơn giản hơn khi chỉ quan tâm encoded/decoded token.
  - Có thể "xác thực" giữa các hệ thống khác nhau.
- **Nhược điểm:**
  - Tìm ẩn rủi ro nếu người dùng để lộ/bị hack token.
  - Một token khi đã issued (đã được cấp cho user), không có cách nào để có thể delete token đấy. Có nghĩa là, nếu token đang hợp lệ, bạn không thể delete token đấy.
