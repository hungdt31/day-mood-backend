# THỰC HÀNH

## 1. Giới thiệu đề bài

Code trang web tuyển dụng, việc làm $\Rightarrow$ kết hợp việc phân quyền

- Ứng viên có thể tìm việc làm theo skills
- Nhà tuyển dụng có thể đăng việc làm
- Đặt lịch (schedule) gửi mail cho subscribers.

Tham khảo: [https://topdev.vn/](https://topdev.vn/), [https://topdev.vn/](https://topdev.vn/)

**Phân tích chi tiết chức năng**:

- Đăng ký, đăng nhập
- Tạo skills để search
- Nhà tuyển dụng: thông tin giới thiệu về công ty.
- Ứng viên: người có thể xem bài đăng tuyển dụng và gửi CV.
- Admin duyệt CV rồi mới gửi tới nhà tuyển dụng.

Nếu 1 ứng viên subscribe 1 skill $\Rightarrow$ gửi mail hàng tuần về những job này.

## 2. Phân tích model relationship

### 2.1. Đối tượng

**Người sử dụng hệ thống**:

- Ứng viên (employee)
- Nhà tuyển dụng (company)
- Admin

**Đối tượng tương tác**:

- CV của ứng viên
- Jobs đăng tuyển
- Skills để search

**Khác**:

- Role: vai trò của user trong hệ thống (admin, hr,...)
- Permission: quyền hạn sử dụng hệ thống (apis của back-end)

### 2.2. Relationship

- 1 ứng viên có thể gửi nhiều CV cùng 1 lúc, 1 cv chỉ thuộc 1 ứng viên: quan hệ 1 - nhiều
- 1 nhà tuyển dụng có thể đăng nhiều job, 1 job chỉ thuộc 1 nhà tuyển dụng: quan hệ 1 - nhiều.
- 1 skill có thể thuộc nhiều job, 1 job có thể nhiều skill: quan hệ nhiều - nhiều.

### 2.3. Về phân quyền

- 1 permission (quyền hạn) biểu thị cho apis của backend.
- 1 role (vai trò) bao gồm nhiều quyền hạn.
- 1 người dùng sẽ có 1 role duy nhất, nếu muốn merge role: tạo role mới.
- 1 user có 1 role, 1 role có thể có nhiều user cùng role này.
- 1 role có nhiều permission (apis), 1 permission có thể thuộc nhiều role khác nhau.

**Bài cáo mẫu về công nghệ phần mềm:** [assignment-1.pdf](/images/Lesson12/assignment-1.pdf)

## 3. Thiết kế đối tượng

### 3.1. Users

- name: string
- email: string `<unique>`
- password: string
- age: number
- gender: string
- address: string
- company: object { _id, name }
- **role**: string
- refreshToken: string
- history: object

### 3.2. History

- createdAt: Date
- updatedAt: Date
- isDeleted: boolean
- createdBy: object { _id, email}
- updatedAt: object { _id, email }
- deletedBy: object { _id, email }

### 3.3. Companies

- name: string
- address: string
- description: string `<html>`

- history: object

### 3.4. Resume

- email: string
- userId: objectId
- url: string
- status; string `["PENDING", "REVIEWING", "APPROVED", "REJECTED"]`

- history: object

### 3.5. Jobs

- name: string
- skill: string[]
- company: string
- location: string
- salary: number
- quantity: string (số lượng tuyển)
- level: string `["INTERN", "FRESHER", "JUNIOR", "SENIOR"]`
- description: string `<html>`
- startDate: Date
- endDate: Date
- isActive: boolean
- history: object

### 3.6. Subscribers

- email: string
- skill: string

### 3.7. Roles

- name: string `<unique>`
- description: string
- isActive: boolean
- permissions: array object
- history: object

### 3.8. Permission

- name: string
- path: string
- method: string `["GET", "POST", "PUT", "PATCH", "DELETE"]`
- description: string
- history: object
