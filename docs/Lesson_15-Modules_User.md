# Modules User

## 1. Bài tập CRUD Users

**Lưu ý**:

- đang hardcore ROLE và chưa áp dụng quyền ở đây.
- về frontend: admin có view create user riêng, client có view register.
- Logic tạo tài khoản: chú ý email là unique.
  ![404.png](/images/Lesson15/404.png)

**Các endpoint cần tạo (6 apis)**:

### 1.1. POST /api/v1/auth/register

- **Use case**: client tạo tài khoản trên hệ thống.
- **Không cần truyền lên JWT** vì chức năng này dành cho client $\Rightarrow$ đăng ký tài khoản.
- **Body**:
  - Required: name, email, password;
  - age, gender, address.

**Ở phía backend, hardcode role === USER và cần hash password trước khi lưu.** Không cần cập nhật createdBy (vì không sử dụng jwt token).

**Format Request**:

![1.png](/images/Lesson15/1.png)

**Response**:

```json
{
  "statusCode": 201,
  "message": "Register a new user",
  "data": {
    "_id": "..." // id của user được tạo,
    "createdAt": "..." // thời gian tạo user
  } 
}
```

### 1.2. POST /api/v1/users

- **Use case**: admin tạo tài khoản người dùng.
- Cần truyền lên JWT
- Body:

  name, email, password

  age, gender, address, role

  **company**: object { _id, name }

Ở backend, tự động cập nhật **createdBy**: object { id, email }

**Body request sử dụng dạng RAW (json)**:

![2.png](/images/Lesson15/2.png)

**Response**:

```json
{
    "statusCode": 201,
    "message": "Create a User",
    "data": {
        "_id": "....", // id người tạo
        "createdAt": "....." // thời gian tạo
    }
}
```

### 1.3. PATCH /api/v1/users/:id

- **Use case**: cập nhật thông tin người dùng.
- Cần truyền lên JWT
- Body: name, email, age, gender, address, role

  Company: object { _id, name}

Ở backend, tự động cập nhật **updatedBy**: object { id, email }

**Data postman sử dụng RAW (json)**:

**Response**:

```json
{
  "statusCode": 200,
  "message": "Update a User",
  "data": {
    "acknowledged": ...,
    "modifiedCount": ...,
    "upsertedId": ...,
    "upsertedCount": ...,
    "matchedCount": ...
  }
}
```

### 1.4. DELETE /api/v1/users/:id

- **Cần truyền lên JWT**, chú ý:

```ts
deletedBy: {
  _id: user._id,
  email: user.email
}
```

### 1.5. GET /api/v1/users/:id

Fetch user by id

- **Không cần truyền lên JWT**.

- **Response**: trả về full record (without password)

### 1.6. GET /api/v1/users

Fetch users with pagination

- **Cần truyền lên JWT**.
- **Response**: trả về full record (without password)

**Params request**:

![6.png](/images/Lesson15/6.png)

**Response**:

```json
{
  "statusCode": 200,
  "message": "Get a number of users",
  "data": {
    "meta": {
      "totalUsers": ...,
      "userCount": ...,
      "usersPerPage": ...,
      "totalPages": ...,
      "currentPage": ...
    },
    "result": [
      ....
    ]
  }
}
```
