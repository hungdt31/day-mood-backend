# Giới thiệu Upload files

Tài liệu: [https://docs.nestjs.com/techniques/file-upload](https://docs.nestjs.com/techniques/file-upload)

## 1. Nguyên tắc khi upload file

- Sử dụng POST (create new data).
- Sử dụng form-data (xử lý file), data truyền dưới dạng **multipart/form-data**.
- Sử dụng thư viện multer (hiệu năng cao): [https://www.npmjs.com/package/multer](https://www.npmjs.com/package/multer).
- Để đơn giản hóa với `expressJS`, sử dụng package [https://www.npmjs.com/package/express-fileupload](https://www.npmjs.com/package/express-fileupload).

## 2. Set up

Tạo service upload file: (vì sẽ sử dụng service này ở nhiều nơi) **nest g resource files --no-spec**.

Cài đặt thư viện: `npm i -D @types/multer`.

NestJS đã hỗ trợ sẵn multer, chỉ cần cài đặt pakage trên để hỗ trợ cú pháp khi code ts.

## 3. Xử lý file

File upload thực chất là một middleware: Req $\Rightarrow$ middleware $\Rightarrow$ Res

Khi đưa file lên: **Request $\Rightarrow$ Interceptor (đồng thời set up destination, storage, ...  ) $\Rightarrow$ Pipe(validate) $\Rightarrow$ Response**. Vì vậy khi upload invalid file vẫn có thể lưu lại trên hệ thống.

```ts
@Post('upload')
@UseInterceptors(FileIntercepter('file')) // ten file su dung trong form-data
uploadFile(@UploadedFile() file: Express.Multer.File){
  console.log(file)
}
```

## 4. Update Company with Image

- **Yêu cầu**:
  - Tạo thêm field: **logo: string** đối với model Company.
  - Sửa 2 api là create và update company, cập nhật thêm fields **logo: string**.

**Logic xử lý**:

- Khi tạo mới/update công ty, frontend upload ảnh:
  - Gọi **api upload**.
  - BE sẽ lưu trữ file ảnh trên server, frontend nhận lại tên ảnh đã upload thành công.
- Frontend submit tạo mới/update, chỉ cần truyền tên ảnh đã upload thành công (định dạng string).
- Backend **khi tạo mới/update công ty**, **chỉ lưu vào database tên ảnh** (field logo: string), còn **không cần xử lý logic upload file**, vì logic này đã được xử lý trước đó thông qua api upload file.
