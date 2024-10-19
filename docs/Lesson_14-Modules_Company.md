# Modules Company

## 1. Create a new Company

**POST** /api/v1/companies

**Yêu cầu**:

- Luồng xử lý logic:
  - Front-end sẽ gọi api upload ảnh để lấy ra thông tin file (hiển thị trên giao diện).
  - Khi gọi api tạo company, truyền dữ liệu qua body (lưu ý các trường logo và covers được gán thông tin file (_id, filename, folderType) đã được upload thành công lên back-end).
- Authorization: truyền lên Bearer Token để xác nhận thông tin người dùng ở trường `createdBy`.
- Ví dụ về phản hồi thành công:

```json
{
    "statusCode": 201,
    "message": "Create a new Company successfully!",
    "data": {
        "name": "Muse Communication Co., Ltd.",
        "address": "Xinzhuang District, New Taipei City, Taiwan",
        "industry": "Anime",
        "description": "<p>Anime, motion picture, Asian and European cinematic content, and memorabilia.</p>",
        "logo": {
            "_id": "67139ea2fcee094706fca657",
            "filename": "channels4_profile-1729339042015.jpg",
            "folderType": "company"
        },
        "covers": [
            {
                "_id": "67139e74fcee094706fca653",
                "filename": "channels4_banner-1729338996202.jpg",
                "folderType": "company",
                "isDeleted": false,
                "deletedAt": null
            }
        ],
        "createdBy": {
            "_id": "66e443feb1f28bcb6f2b18ce",
            "email": "admin@gmail.com"
        },
        "deletedAt": null,
        "isDeleted": false,
        "_id": "6713a3a89655ca86a58c3f33",
        "createdAt": "2024-10-19T12:18:49.009Z",
        "updatedAt": "2024-10-19T12:18:49.009Z",
        "__v": 0
    }
}
```

## 2. Get a list of companies

**GET** /api/v1/companies

**Yêu cầu**:

- Cung cấp thông tin phân trang, các giá trị filter (page, limit, sort, ...): truyền qua query trên url.
- Ví dụ về phản hồi thành công:

```json
{
    "statusCode": 200,
    "message": "Fetch list of companies with pagination",
    "data": {
        "meta": {
            "totalItems": 1,
            "itemCount": 1,
            "itemsPerPage": 10,
            "totalPages": 1,
            "currentPage": 1
        },
        "result": [
            {
                "_id": "6713a3a89655ca86a58c3f33",
                "name": "Muse Communication Co., Ltd.",
                "address": "Xinzhuang District, New Taipei City, Taiwan",
                "industry": "Anime",
                "description": "<p>Anime, motion picture, Asian and European cinematic content, and memorabilia.</p>",
                "logo": {
                    "_id": "67139ea2fcee094706fca657",
                    "filename": "channels4_profile-1729339042015.jpg",
                    "folderType": "company"
                },
                "covers": [
                    {
                        "_id": "67139e74fcee094706fca653",
                        "filename": "channels4_banner-1729338996202.jpg",
                        "folderType": "company",
                        "isDeleted": false,
                        "deletedAt": null
                    }
                ],
                "createdBy": {
                    "_id": "66e443feb1f28bcb6f2b18ce",
                    "email": "admin@gmail.com"
                },
                "deletedAt": null,
                "isDeleted": false,
                "createdAt": "2024-10-19T12:18:49.009Z",
                "updatedAt": "2024-10-19T12:18:49.009Z",
                "__v": 0
            }
        ]
    }
}
```

## 3. Get a Company

**GET** /api/v1/companies/:id

**Yêu cầu**:

- Truyền id company qua url.
- Ví dụ về thông tin phản hồi:

```json

```

## 4. Update a Company

**PATCH** /api/v1/companies/:id

**Yêu cầu**:

- Truyền id company qua url.
- Authorization: truyền lên Bearer Token để xác nhận thông tin người dùng ở trường `updatedBy`.
- Gửi thông tin chỉnh sửa thông qua body của request.
- Ví dụ về phản hồi thành công:

```json
{
    "statusCode": 200,
    "message": "Update a Company successfully!",
    "data": {
        "acknowledged": true,
        "modifiedCount": 1,
        "upsertedId": null,
        "upsertedCount": 0,
        "matchedCount": 1
    }
}
```

## 5. Delete a Company

**DELETE** /api/v1/companies/:id

**Yêu cầu**:

- Sử dụng soft-delete.
- Truyền id company qua url.
- Authorization: truyền lên Bearer Token để xác nhận thông tin người dùng ở trường `deletedBy`.
- Ví dụ về phản hồi thành công:

```json
{
    "statusCode": 200,
    "message": "Remove a Company successfully!",
    "data": {
        "deleted": 1
    }
}
```
