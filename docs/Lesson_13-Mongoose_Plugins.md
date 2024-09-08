# Mongoose Plugins

Tài liệu: [https://docs.nestjs.com/techniques/mongodb#plugins](https://docs.nestjs.com/techniques/mongodb#plugins)

## 1. Timestamp

Sử dụng  `timestamps` ở schema để khi tạo ra 1 document tự động thêm vào các trường `createdAt` và `updatedAt`.

```ts
@Schema({ timestamps: true })
```

## 2. Soft-delete plugin

Với dự án đã có sẵn data, cần update data cũ với 2 fields là deletedAt và isDeleted $\Rightarrow$ duplicate data (or error nếu unique). Soft-delete: [https://www.npmjs.com/package/soft-delete-plugin-mongoose](https://www.npmjs.com/package/soft-delete-plugin-mongoose)

- Set up plugin ở `app.module.ts`:

```ts
useFactory: async (configService: ConfigService) => ({
  uri: configService.get<string>('MONGODB_URL'),
  connectionFactory: (connection : any) => {
    connection.plugin(softDeletePlugin);
    return connection;
  }
}),
```

- Lưu ý tạo các fields `isDeleted` (boolean) và `deletedAt` (Date) ở schema.
- Khai báo model để sử dụng:

```ts
// ....
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel : SoftDeleteModel<UserDocument>
  ) {}
  // ....
}
```

## 3. Phân trang

Converts queryString into a MongoDB query object: [https://www.npmjs.com/package/api-query-params](https://www.npmjs.com/package/api-query-params)

**Input**: Front end truyền lên

- page: number (trang hiện tại)
- limit: number (số lượng bản ghi muốn lấy).
- query string: điều kiện query (ví dụ tìm theo tên, tìm theo email, ...)

**Output**:

```ts
return {
  meta: {
    current: page, // trang hiện tại
    pageSize: limit, // số lượng bản ghi đã lấy
    pages: totalPages, // tổng số trang với điều kiện query
    total: totalItems // tổng số phần tử (số bản ghi)
  },
  result // kết quả query
}
```

**Logic xử lý**:

- Để phân trang dữ liệu, cần tìm hiểu offset và limit.
- Cần lấy ra @Query page/limit.
- Count tổng bản ghi với điều kiện filter.
- Tính offset.

## 4. CORS

Tài liệu: [https://topdev.vn/blog/cors-la-gi/](https://topdev.vn/blog/cors-la-gi/?utm_source=google&utm_medium=cpc&utm_campaign=pmax-branding&utm_content=performance&gad_source=1)

- **Cross-Origin Resource Sharing**: là cơ chế "server" cho phép "origin" (domain/port) từ phía "browser" được truy cập nguồn tài nguyên (APIs).
- CORS sẽ xảy ra, khi browser gửi request lên server, và server "chưa cấu hình CORS".

### 4.1. Làm sao để bypass CORS

- Update browser: chỉ sử dụng cách này nếu bạn "**chỉ code Frontend**" và "**không kiểm soát backend**": settings, extensions.
- Sử dụng Backend:
  - **Backend do bạn kiểm soát**, lỗi xảy ra khi frontend gọi lên backend $\Rightarrow$ fix ở backend (cách làm này sẽ được hướng dẫn ở video tiếp theo).
  - **Backend do bên thứ 3 làm**: chúng ta chỉ có mỗi APIs để sử dụng, không có khả năng sửa đổi, cập nhật Backend đấy. $\Rightarrow$ cần viết BE gọi tới BE. **Mô hình**: fe -> be (của bạn) -> be (của đối tác)
  - **Bạn có biết rằng thư viện axios, dùng được cả fe lẫn be**.
