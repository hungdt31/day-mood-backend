# Modules Company

## 1. Create a new Company

**POST** /api/v1/company

**Yêu cầu**:

- Luồng xử lý logic:
  - Front-end sẽ gọi api upload ảnh để lấy ra thông tin file(hiển thị trên giao diện).
  - Khi gọi api tạo company, truyền dữ liệu qua body (lưu ý field logo được gán giá trị là tên file đã được upload thành công lên back-end).
- Ví dụ cho phản hồi:

```json
{
    "statusCode": 201,
    "message": "",
    "data": {
        "name": "ABC Trade Firm",
        "address": "123, Even Fest Street",
        "description": "Marketing Recruitment",
        "createdBy": {
            "_id": "66e443feb1f28bcb6f2b18ce",
            "email": "admin@gmail.com"
        },
        "deletedAt": null,
        "isDeleted": false,
        "_id": "67132d0cc58d7be7b0b91548",
        "createdAt": "2024-10-19T03:52:44.338Z",
        "updatedAt": "2024-10-19T03:52:44.338Z",
        "__v": 0
    }
}
```
