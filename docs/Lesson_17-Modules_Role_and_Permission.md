# Modules Role and Permission

## 1. Mô hình phân quyền

1 user có 1 role (có n permissions).

$\Rightarrow$ 1 user có n permissions khi sử dụng hệ thống.

Sau này muốn thay đổi permission của user, chỉ cần thay đổi role là xong (update role hiện tại, hoặc tạo role mới $\Rightarrow$ gán user vào).

### 1.1. Model Permission (Quyền hạn sử dụng hệ thống)

Mỗi permission chính là 1 api ở backend:

- name: string
- apiPath: string
- method: string
- module: string // thuộc modules nào?
- createdAt
- updatedAt
- deletedAt
- isDeleted
- createdBy: { _id, email }
- updatedBy: { _id, email }
- deletedBy: { _id, email }

### 1.2. Model Roles (Vai trò trong hệ thống)

- name: string
- description: string
- isActive: boolean
- permissions: [] // array of object id
- createdAt
- updatedAt
- deletedAt
- isDeleted
- createdBy
- updatedBy
- deletedBy

## 2. Permission

### 2.1. Create a Permission

**POST api/v1/permissions**:

- **Yêu cầu**:
  - Truyền JWT ở header
  - Body truyền lên các tham số: **name, apiPath, method, module**.

- **Xử lý ở backend**:
  - Trước khi lưu, cần check xem "apiPath" + "method" đã tồn tại chưa? Nếu đã tồn tại thì thông báo lỗi. Chỉ tạo mới permission có "apiPath" + "method" chưa tồn tại.
  - Lưu thêm thông tin **createdBy**.
- **Response**:

```json
{
  "statusCode": 201,
  "message": "Create a new Permission",
  "data": {
    "_id": "...",
    "createdAt": "..."
  }
}
```

### 2.2. Update a Permission

**PATCH /api/v1/permissions/:id**:

- **Yêu cầu**:
  - Truyền lên JWT ở header
  - Truyền động ID trên url

- **Response**:

```json
{
  {
    "statusCode": 200,
    "message": "Update a Permission",
    "data": {
      // ....
    }
  }
}
```

### 2.3. Fetch Permissions with pagination

**GET /api/v1/permissions**:

- **Yêu cầu**:
  - Truyền JWT ở header
  - Truyền động params để phân trang

- **Response**:

```json
{
  "statusCode": 200,
  "message": "Fetch permissions with pagination",
  "data": {
    "meta": {
      "current": "...",
      "pageSize": "...",
      "pages": "...",
      "total": "..."
    },
    "result": {
      // ...
    }
  }
}
```

### 2.4. Fetch a Permission by ID

**GET /api/v1/permissions/:id**:

- **Yêu cầu**:
  - Truyền JWT ở header
  - Truyền động id ở header

- **Response**:

### 2.5. Delete a Permission

**DELETE /api/v1/permissions/:id**:

- **Yêu cầu**:
  - Truyền JWT ở header
  - Truyền động id trên url
  - Sử dụng **Soft delete**

- **Response**:

## 3. Role

### 3.1. Create a Role

**POST /api/v1/role**:

- **Yêu cầu**:
  - Truyền JWT ở header
  - Truyền body dưới dạng raw/JSON, **bao gồm các trường name, description, isActive, permissions**.
- **Backend xử lý**: không lưu trùng tên của group, **Check "name" trước khi lưu**.
- **Response**:

```json
{
  "statusCode": 201,
  "message": "Create a new Role",
  "data": {
    "_id": "...",
    "name": "..."
  }
}
```

### 3.2. Update a Role

**PATCH /api/v1/roles/:id**

- **Yêu cầu**:
  - Truyền JWT ở header
  - Truyền data ở body, dưới dạng raw/json

- **Backend cần check "name"** trước khi cho update, đảm bảo **"name" là khác nhau**.
- **Response**:

```json
{
  "statusCode": 200,
  "message": "Update a Role",
  "data": {
    // ....
  }
}
```

### 3.3. Fetch Role with pagination

**GET /api/v1/role**:

- **Yêu cầu**:
  - Truyền jwt ở header
  - Truyền động params trên url

### 3.4. Fetch Role by ID

**GET /api/v1/roles/:id**:

- **Yêu cầu**:
  - Truyền JWT ở header
  - Truyền động id trên url

### 3.5. Delete a Role

**DELETE /api/v1/roles/:id**:

- **Yêu cầu**:
  - Truyền JWT ở header
  - Truyền động id trên url
  - Sử dụng **soft delete**
