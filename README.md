# 🏛️ EDUCO Employee Onboarding Portal

### Cổng Kê Khai & Tiếp Nhận Hồ Sơ Nhân Sự Điện Tử

<div align="center">

![Platform](https://img.shields.io/badge/Platform-Vercel%20%7C%20Google%20Workspace-blue?style=flat-square)
![Architecture](https://img.shields.io/badge/Architecture-Serverless%20Hybrid-brightgreen?style=flat-square)
![Language](https://img.shields.io/badge/Language-Bilingual%20VI%20%7C%20EN-orange?style=flat-square)
![Frontend](https://img.shields.io/badge/Frontend-HTML5%20%7C%20CSS3%20%7C%20JavaScript-yellow?style=flat-square)
![Backend](https://img.shields.io/badge/Backend-Google%20Apps%20Script-4285F4?style=flat-square)
![Storage](https://img.shields.io/badge/Storage-Google%20Drive%20%7C%20Sheets-34A853?style=flat-square)
![License](https://img.shields.io/badge/License-Proprietary-red?style=flat-square)

**Số hóa toàn bộ quy trình kê khai thông tin và tiếp nhận hồ sơ nhân sự mới.**

Từ kê khai thông tin cá nhân → xác thực định danh → thông tin công việc → thuế & ngân hàng → gia đình → upload hồ sơ → rà soát → cam kết điện tử.

</div>

---

## 📌 1. Tổng quan

**EDUCO Employee Onboarding Portal** là hệ thống cổng thông tin điện tử phục vụ quy trình **Onboarding nhân sự**, cho phép nhân sự mới chủ động kê khai thông tin và cung cấp hồ sơ trước khi hoàn tất thủ tục tiếp nhận.

Hệ thống được xây dựng theo mô hình **Serverless Hybrid**, kết hợp:

* **Vercel** — triển khai và phân phối Frontend.
* **Google Apps Script** — xử lý Backend/API.
* **Google Sheets** — lưu trữ dữ liệu nghiệp vụ.
* **Google Drive** — lưu trữ hồ sơ, chứng từ và file đính kèm.
* **Browser LocalStorage** — lưu nháp tạm thời phía người dùng.

### 🎯 Mục tiêu

Hệ thống hướng tới việc:

* Giảm thao tác nhập liệu thủ công của HR.
* Chuẩn hóa thông tin đầu vào.
* Hạn chế sai sót khi tiếp nhận hồ sơ.
* Giảm phụ thuộc vào hồ sơ giấy/email.
* Tập trung toàn bộ chứng từ về một cấu trúc lưu trữ thống nhất.
* Cải thiện trải nghiệm nhân sự mới.
* Tạo nền tảng có thể mở rộng cho quy trình HR Digitalization.

---

# 🏗️ 2. System Architecture

Hệ thống sử dụng kiến trúc **Serverless Hybrid**, trong đó Frontend và Backend được triển khai độc lập.

```text
┌─────────────────────────────────────────────────────────────┐
│                     👤 EMPLOYEE / CANDIDATE                 │
│                         Web Browser                         │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               │ HTTPS
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                         VERCEL CDN                          │
│                                                             │
│  index.html                                                 │
│  ├── Responsive UI                                          │
│  ├── Semantic HTML5                                         │
│  └── Form Layout                                            │
│                                                             │
│  app.js                                                     │
│  ├── Application State                                      │
│  ├── I18N VI / EN                                           │
│  ├── Client-side Validation                                 │
│  ├── Local Draft / LocalStorage                             │
│  ├── File Processing / Base64                               │
│  └── API Communication                                      │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               │ HTTPS / Fetch API
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 GOOGLE APPS SCRIPT                          │
│                       Code.gs                                │
│                                                             │
│  REST API                                                   │
│  ├── doGet()                                                │
│  └── doPost()                                               │
│                                                             │
│  Business Logic                                             │
│  ├── Server-side Validation                                 │
│  ├── Mutex / LockService                                    │
│  ├── File Processing                                        │
│  ├── Folder Management                                      │
│  └── Spreadsheet Management                                 │
└───────────────────────┬─────────────────┬───────────────────┘
                        │                 │
                        ▼                 ▼
              ┌────────────────┐  ┌────────────────────────┐
              │ Google Sheets  │  │     Google Drive       │
              │                │  │                        │
              │ Employee Data  │  │ Employee Documents     │
              │ 45 Columns     │  │ Attachments / Images   │
              │ A → AS         │  │ Structured Folders     │
              └────────────────┘  └────────────────────────┘
```

---

# 🔄 3. End-to-End Workflow

Quy trình onboarding được chia thành **9 bước**:

```text
┌──────────────┐
│ 01. Cá nhân  │
└──────┬───────┘
       ▼
┌──────────────┐
│ 02. Định danh│
└──────┬───────┘
       ▼
┌──────────────┐
│ 03. Công việc│
└──────┬───────┘
       ▼
┌──────────────┐
│ 04. Học vấn  │
└──────┬───────┘
       ▼
┌──────────────┐
│ 05. Thuế/Bank│
└──────┬───────┘
       ▼
┌──────────────┐
│ 06. Gia đình │
└──────┬───────┘
       ▼
┌──────────────┐
│ 07. Hồ sơ    │
└──────┬───────┘
       ▼
┌──────────────┐
│ 08. Rà soát  │
└──────┬───────┘
       ▼
┌──────────────┐
│ 09. Cam kết  │
└──────────────┘
```

### Chi tiết

| Step | Module               | Nội dung chính                                 |
| ---- | -------------------- | ---------------------------------------------- |
| 01   | Personal Information | Họ tên, ngày sinh, giới tính, liên hệ          |
| 02   | Identity             | CCCD/CMND, ngày cấp, nơi cấp, địa chỉ          |
| 03   | Employment           | Vị trí, phòng ban, loại hợp đồng, ngày bắt đầu |
| 04   | Education            | Trình độ, trường, chuyên ngành                 |
| 05   | Tax & Banking        | MST, tài khoản ngân hàng, thông tin thanh toán |
| 06   | Family               | Người thân, quan hệ, thông tin liên hệ         |
| 07   | Documents            | Upload hồ sơ, chứng từ                         |
| 08   | Review               | Kiểm tra toàn bộ thông tin                     |
| 09   | Declaration          | Xác nhận và cam kết tính chính xác             |

---

# ✨ 4. Core Features

## 🌐 4.1. Dynamic Bilingual — VI / EN

Hỗ trợ chuyển đổi ngôn ngữ trực tiếp trên giao diện:

* Tiếng Việt
* English

Các thành phần được hỗ trợ:

* Label
* Placeholder
* Button
* Validation message
* Instruction
* Legal declaration
* Step navigation
* Document description

Việc chuyển đổi ngôn ngữ được thực hiện **client-side**, không cần reload trang.

---

## 🧭 4.2. Progressive Step-by-Step Form

Form được chia thành nhiều bước thay vì hiển thị toàn bộ thông tin trên một trang.

Lợi ích:

* Giảm cognitive load cho người dùng.
* Dễ kiểm tra dữ liệu theo từng nhóm.
* Hiển thị tiến độ onboarding.
* Hạn chế bỏ sót trường thông tin.
* Tăng trải nghiệm người dùng trên mobile.

---

## 💾 4.3. Auto-save & Local Draft

Thông tin đang nhập được lưu tạm vào:

```text
Browser
   │
   └── localStorage
          │
          ├── Form Data
          ├── Current Step
          └── Draft State
```

Khi người dùng:

* Refresh trang.
* Đóng trình duyệt.
* Mất kết nối tạm thời.
* Quay lại form sau đó.

Hệ thống có thể khôi phục dữ liệu nháp đã lưu trên trình duyệt.

> **Lưu ý:** LocalStorage chỉ là cơ chế lưu nháp phía client và không thay thế cho cơ chế lưu trữ chính thức trên Server/Google Workspace.

---

# 📂 5. Document Management

Một trong những chức năng trọng tâm của hệ thống là tự động hóa việc tiếp nhận và phân loại hồ sơ.

## 📁 Cấu trúc thư mục

Hệ thống tự động tạo thư mục theo format:

```text
Hồ sơ tiếp nhận nhân sự/
│
├── Nguyễn Văn A - 012345678901/
│   ├── CCCD
│   ├── Hồ sơ cá nhân
│   ├── Bằng cấp
│   ├── Chứng chỉ
│   ├── Hồ sơ thuế
│   └── Hồ sơ khác
│
└── Trần Thị B - 012345678902/
    ├── CCCD
    ├── Hồ sơ cá nhân
    ├── Bằng cấp
    └── ...
```

Tên thư mục được chuẩn hóa theo:

```text
[Họ và tên] - [CCCD]
```

Mục tiêu là giúp HR dễ dàng:

* Tìm kiếm hồ sơ.
* Đối chiếu nhân sự.
* Kiểm tra chứng từ.
* Phân loại hồ sơ.
* Quản lý dữ liệu tập trung.

---

# 📑 6. Dynamic Document Requirements

Danh sách hồ sơ yêu cầu được điều chỉnh dựa trên loại hình làm việc/hợp đồng.

Ví dụ:

```text
Employment Type
       │
       ├── Full-time
       │      ├── Document A ✓
       │      ├── Document B ✓
       │      ├── Document C ✓
       │      └── Document D ○
       │
       └── Part-time
              ├── Document A ✓
              ├── Document B ○
              └── Document C ○
```

Trong đó:

* `✓` — Hồ sơ bắt buộc.
* `○` — Hồ sơ không bắt buộc.

Điều này giúp giảm việc yêu cầu ứng viên cung cấp những chứng từ không cần thiết.

---

# 📊 7. Data Management

Thông tin nhân sự sau khi submit được chuẩn hóa và lưu vào **Google Sheets**.

Hệ thống sử dụng cấu trúc dữ liệu gồm **45 cột (A → AS)**.

```text
Google Sheets
│
├── Personal Information
├── Identity Information
├── Employment Information
├── Education
├── Tax Information
├── Banking Information
├── Family Information
├── Document Metadata
└── Submission Metadata
```

Google Sheets đóng vai trò là **structured data store** cho nghiệp vụ onboarding.

Google Drive đóng vai trò là **document storage**.

### Data separation

```text
Structured Data
       │
       └── Google Sheets

Unstructured Data
       │
       └── Google Drive
```

Cách tách này giúp dữ liệu nghiệp vụ và file hồ sơ được quản lý độc lập.

---

# 🔒 8. Data Validation & Integrity

Hệ thống triển khai validation ở **hai tầng**.

```text
                User Input
                    │
                    ▼
        ┌──────────────────────┐
        │ Client-side Validation│
        └──────────┬───────────┘
                   │
                   ▼
              HTTPS API
                   │
                   ▼
        ┌──────────────────────┐
        │ Server-side Validation│
        └──────────┬───────────┘
                   │
                   ▼
            Data Processing
                   │
             ┌─────┴─────┐
             ▼           ▼
       Google Sheets  Google Drive
```

### Client-side validation

Giúp:

* Phản hồi nhanh.
* Hạn chế dữ liệu sai.
* Giảm request không cần thiết.
* Cải thiện UX.

### Server-side validation

Đảm bảo dữ liệu gửi tới Backend vẫn được kiểm tra trước khi ghi vào hệ thống.

> Client-side validation không được xem là cơ chế bảo mật duy nhất vì mã JavaScript phía trình duyệt có thể bị thay đổi.

---

# 🔐 9. Concurrency Control

Backend sử dụng **Google Apps Script LockService** để kiểm soát các request đồng thời.

Ví dụ:

```text
Candidate A ──────┐
                   │
Candidate B ──────┼──► Google Apps Script
                   │
Candidate C ──────┘
                         │
                         ▼
                   LockService
                         │
                         ▼
                 Sequential Write
                         │
              ┌──────────┴──────────┐
              ▼                     ▼
        Google Sheets          Google Drive
```

Mục tiêu:

* Hạn chế race condition.
* Tránh ghi đè dữ liệu.
* Giảm nguy cơ tạo folder/file trùng.
* Đảm bảo tính nhất quán khi có nhiều người submit cùng thời điểm.

---

# 📤 10. File Upload

File được xử lý thông qua cơ chế:

```text
Browser
   │
   ▼
File Input
   │
   ▼
Validation
   │
   ├── File Type
   ├── File Size
   └── Required / Optional
   │
   ▼
Base64 Encoding
   │
   ▼
HTTPS POST
   │
   ▼
Google Apps Script
   │
   ▼
Google Drive
```

### File size

Giới hạn hiện tại:

```text
Maximum: < 15 MB / file
```

### Nguyên tắc

* Kiểm tra file trước khi upload.
* Không upload file không hợp lệ.
* Chuẩn hóa metadata.
* Lưu file vào đúng thư mục nhân sự.
* Lưu thông tin liên quan vào Google Sheets khi cần.

---

# 🧩 11. Technology Stack

| Layer        | Technology         | Responsibility            |
| ------------ | ------------------ | ------------------------- |
| Frontend     | HTML5              | UI Structure              |
| Styling      | CSS3               | Responsive UI             |
| Client Logic | Vanilla JavaScript | State & Form Logic        |
| Deployment   | Vercel             | CDN / Static Hosting      |
| Backend      | Google Apps Script | REST API / Business Logic |
| API          | Fetch API          | Client ↔ Server           |
| Database     | Google Sheets      | Structured Data           |
| File Storage | Google Drive       | Documents                 |
| Concurrency  | LockService        | Race Condition Control    |
| Draft        | LocalStorage       | Temporary Client Draft    |
| Encoding     | Base64             | File Transport            |
| Language     | VI / EN            | Bilingual UI              |

---

# 📁 12. Project Structure

```text
educo-onboarding-portal/
│
├── index.html
│   └── Main application UI
│
├── app.js
│   ├── Application State
│   ├── Form Controller
│   ├── I18N
│   ├── Validation
│   ├── LocalStorage
│   ├── File Processing
│   └── API Communication
│
├── Code.gs
│   ├── REST API
│   ├── doGet()
│   ├── doPost()
│   ├── Server Validation
│   ├── LockService
│   ├── Drive Management
│   └── Sheets Management
│
└── README.md
    └── Project Documentation
```

---

# 🚀 13. Deployment

## 13.1. Frontend — Vercel

Frontend có thể được deploy trực tiếp lên Vercel.

```text
Git Repository
      │
      ▼
   Vercel
      │
      ▼
Global CDN
      │
      ▼
Candidate Browser
```

Các file frontend chính:

```text
index.html
app.js
```

Không yêu cầu server riêng cho Frontend.

---

## 13.2. Backend — Google Apps Script

Backend được triển khai dưới dạng **Web App** trên Google Apps Script.

Luồng triển khai:

```text
Google Apps Script
       │
       ├── Code.gs
       │
       ▼
Deploy
       │
       ▼
Web App
       │
       ▼
API Endpoint
```

Frontend sử dụng API Endpoint của Google Apps Script để gửi dữ liệu.

---

# ⚙️ 14. Configuration

Trước khi deploy production, cần cấu hình các thông tin liên quan đến Google Workspace.

Ví dụ:

```javascript
const CONFIG = {
    API_URL: 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL',
    DRIVE_FOLDER_ID: 'YOUR_ROOT_FOLDER_ID',
    SHEET_ID: 'YOUR_GOOGLE_SHEET_ID'
};
```

> Khuyến nghị không hard-code các thông tin nhạy cảm hoặc credential vào frontend.

---

# 🔄 15. API Communication

Frontend giao tiếp với Backend thông qua HTTPS.

### Request

```text
Browser
   │
   │ POST
   │ JSON Payload
   ▼
Google Apps Script
```

Payload có thể bao gồm:

```json
{
  "action": "submitEmployee",
  "employee": {
    "fullName": "Nguyen Van A",
    "identityNumber": "012345678901",
    "employmentType": "FULL_TIME"
  },
  "documents": []
}
```

Backend xử lý:

```text
Request
   │
   ├── Validate
   ├── Acquire Lock
   ├── Create / Find Folder
   ├── Save Documents
   ├── Write Spreadsheet
   └── Release Lock
```

---

# 🛡️ 16. Security Considerations

Do hệ thống xử lý dữ liệu nhân sự và hồ sơ định danh, cần đặc biệt lưu ý:

### Data Protection

* HTTPS cho toàn bộ quá trình truyền dữ liệu.
* Không lưu credential trong Frontend.
* Kiểm tra dữ liệu tại Backend.
* Kiểm soát quyền truy cập Google Drive.
* Hạn chế quyền truy cập Google Sheets.
* Không expose thông tin nội bộ không cần thiết cho Client.

### File Security

* Kiểm tra MIME type.
* Kiểm tra kích thước file.
* Giới hạn loại file được phép.
* Không tin tưởng metadata do Client gửi lên.
* Kiểm soát thư mục lưu trữ.

### Access Control

Google Workspace nên được cấu hình theo nguyên tắc:

```text
Least Privilege
       │
       ├── HR/Admin
       │     └── Full access
       │
       ├── HR Operation
       │     └── Required access
       │
       └── Candidate
             └── Submit only
```

---

# 📈 17. Scalability

Kiến trúc Serverless giúp hệ thống không cần duy trì server truyền thống.

```text
                    ┌── Candidate A
                    │
                    ├── Candidate B
Vercel CDN ─────────┼── Candidate C
                    │
                    └── Candidate N
                           │
                           ▼
                  Google Apps Script
                           │
                    ┌──────┴──────┐
                    ▼             ▼
              Google Sheets   Google Drive
```

### Ưu điểm

* Không cần quản lý server.
* Chi phí hạ tầng thấp.
* Dễ triển khai.
* Dễ rollback Frontend.
* Tận dụng Google Workspace hiện có.
* Phù hợp với quy mô onboarding vừa và nhỏ.

### Giới hạn cần lưu ý

Google Apps Script có quota và giới hạn runtime/API. Khi số lượng request tăng đáng kể, cần cân nhắc:

* Queue-based processing.
* Database chuyên dụng.
* Object Storage.
* Backend serverless chuyên nghiệp hơn.
* Authentication/Authorization layer riêng.

---

# 🧪 18. Testing Checklist

Trước khi release production nên kiểm thử tối thiểu:

### Form

* [ ] Required fields
* [ ] Invalid input
* [ ] Boundary values
* [ ] Date validation
* [ ] Phone validation
* [ ] CCCD validation
* [ ] Email validation

### Workflow

* [ ] Next / Previous
* [ ] Step navigation
* [ ] Refresh page
* [ ] Browser close/reopen
* [ ] Draft recovery
* [ ] Final submission

### Language

* [ ] Vietnamese
* [ ] English
* [ ] Placeholder
* [ ] Error message
* [ ] Legal declaration

### File

* [ ] Valid file
* [ ] Invalid extension
* [ ] File > 15 MB
* [ ] Multiple files
* [ ] Missing required document
* [ ] Duplicate upload

### Backend

* [ ] API request
* [ ] Invalid payload
* [ ] Concurrent submissions
* [ ] Drive folder creation
* [ ] Sheet insertion
* [ ] Error handling

---

# 🐛 19. Error Handling

Hệ thống nên phân biệt rõ các nhóm lỗi:

```text
                    Request
                       │
                       ▼
                  Validation
                  /         \
               Valid        Invalid
                │              │
                ▼              ▼
             Process       Return Error
                │
          ┌─────┴─────┐
          ▼           ▼
       Success       Error
          │           │
          ▼           ▼
      Response      Logging
```

Frontend cần hiển thị thông báo dễ hiểu cho người dùng thay vì expose lỗi kỹ thuật từ Backend.

Ví dụ:

```text
❌ Không thể gửi hồ sơ.

Vui lòng kiểm tra:
- Kết nối Internet
- Các trường thông tin bắt buộc
- File đính kèm

Nếu vấn đề vẫn tiếp diễn, vui lòng liên hệ bộ phận Nhân sự.
```

---

# 📋 20. Data Flow

Toàn bộ vòng đời dữ liệu:

```text
Candidate
    │
    ▼
Web Form
    │
    ├──────────────► LocalStorage
    │                    │
    │                    └── Draft
    │
    ▼
Client Validation
    │
    ▼
HTTPS POST
    │
    ▼
Google Apps Script
    │
    ├── Server Validation
    │
    ├── LockService
    │
    ├──────────────► Google Sheets
    │                     │
    │                     └── Employee Metadata
    │
    └──────────────► Google Drive
                          │
                          └── Employee Documents
```

---

# 🎯 21. Business Benefits

EDUCO Employee Onboarding Portal giúp chuyển đổi quy trình:

### Before

```text
Email / Excel / Paper
        │
        ▼
HR manually collect
        │
        ▼
Manual checking
        │
        ▼
Manual file organization
        │
        ▼
Manual data entry
```

### After

```text
Candidate
    │
    ▼
Digital Onboarding Portal
    │
    ├── Structured Form
    ├── Validation
    ├── Auto-save
    ├── Document Upload
    └── Digital Declaration
    │
    ▼
Automated Processing
    │
    ├── Google Sheets
    └── Google Drive
```

### Giá trị mang lại

* ⏱️ Giảm thời gian xử lý hồ sơ.
* 📉 Giảm sai sót nhập liệu.
* 📂 Chuẩn hóa cách lưu trữ hồ sơ.
* 🔍 Tăng khả năng tra cứu.
* 🌐 Hỗ trợ onboarding từ xa.
* 📱 Tối ưu trải nghiệm trên nhiều thiết bị.
* 🧩 Tạo nền tảng cho HR Digital Transformation.

---

# 🗺️ 22. Future Roadmap

Một số hướng phát triển có thể triển khai trong các phiên bản tiếp theo:

### Phase 1 — Foundation

* [x] Digital onboarding form
* [x] Bilingual VI / EN
* [x] Multi-step workflow
* [x] Client validation
* [x] Server validation
* [x] Auto-save
* [x] Google Sheets integration
* [x] Google Drive integration

### Phase 2 — HR Operation

* [ ] HR dashboard
* [ ] Application status tracking
* [ ] Document completeness checker
* [ ] HR approval workflow
* [ ] Automatic notification email
* [ ] Reminder for incomplete documents

### Phase 3 — Enterprise Integration

* [ ] SSO / Google Workspace Authentication
* [ ] HRM integration
* [ ] Employee ID auto-generation
* [ ] Organization / Position master data integration
* [ ] E-signature integration
* [ ] Audit log
* [ ] Role-based access control

### Phase 4 — Analytics

* [ ] Onboarding KPI
* [ ] Processing time
* [ ] Completion rate
* [ ] Missing document rate
* [ ] HR workload analytics
* [ ] Management dashboard

---

# 👥 23. User Roles

Dự kiến hệ thống có thể mở rộng theo các nhóm người dùng:

| Role                 | Responsibility                   |
| -------------------- | -------------------------------- |
| Candidate / Employee | Kê khai thông tin & upload hồ sơ |
| HR Operation         | Kiểm tra & xử lý hồ sơ           |
| HR Admin             | Quản lý dữ liệu & cấu hình       |
| System Admin         | Quản lý hệ thống / deployment    |

---

# 📊 24. Success Metrics

Một số KPI có thể sử dụng để đánh giá hiệu quả hệ thống:

```text
Onboarding Completion Rate
        ↓
Document Completion Rate
        ↓
Average Processing Time
        ↓
Data Error Rate
        ↓
HR Manual Processing Time
        ↓
Candidate Satisfaction
```

Mục tiêu cuối cùng không chỉ là **số hóa biểu mẫu**, mà là tiến tới **tự động hóa toàn bộ quy trình tiếp nhận nhân sự**.

---

# 🧑‍💻 25. Development Guidelines

Khi phát triển hoặc chỉnh sửa hệ thống:

### Frontend

* Ưu tiên Semantic HTML.
* Hạn chế dependency không cần thiết.
* Tách UI logic khỏi business logic.
* Đảm bảo responsive.
* Không lưu sensitive credentials ở client.

### Backend

* Validate mọi request.
* Kiểm soát concurrency.
* Hạn chế quyền truy cập.
* Xử lý exception rõ ràng.
* Logging các lỗi quan trọng.
* Không tin tưởng dữ liệu từ Client.

### Data

* Không thay đổi cấu trúc Google Sheets tùy tiện.
* Document column mapping phải được quản lý rõ ràng.
* Giữ nguyên naming convention của Drive.
* Backup dữ liệu định kỳ.

---

# 🚀 26. Quick Start

## Frontend

Clone repository:

```bash
git clone <repository-url>

cd educo-onboarding-portal
```

Chạy local bằng static server:

```bash
npx serve .
```

hoặc sử dụng VS Code Live Server.

---

## Backend

1. Mở Google Apps Script.
2. Tạo project mới.
3. Copy nội dung `Code.gs`.
4. Cấu hình Google Sheet ID.
5. Cấu hình Google Drive Root Folder ID.
6. Deploy dưới dạng Web App.
7. Lấy Web App URL.
8. Cập nhật API URL trong Frontend.
9. Deploy Frontend lên Vercel.

---

# 🌍 27. Production Deployment

```text
Developer
    │
    ├──────────────────────┐
    │                      │
    ▼                      ▼
Git Repository       Google Apps Script
    │                      │
    ▼                      ▼
  Vercel                Web App
    │                      │
    └──────────┬───────────┘
               │
               ▼
       Production System
               │
       ┌───────┴────────┐
       ▼                ▼
 Google Sheets     Google Drive
```

---

# ⚠️ 28. Important Notes

Hệ thống xử lý dữ liệu nhân sự, bao gồm thông tin định danh và hồ sơ cá nhân. Do đó:

> **Không sử dụng dữ liệu thật của nhân sự trong môi trường development/test nếu không cần thiết.**

Khuyến nghị:

* Sử dụng dữ liệu giả lập khi development.
* Phân tách Test / Production.
* Giới hạn quyền truy cập Drive.
* Giới hạn quyền chỉnh sửa Google Sheets.
* Không commit credential vào Git.
* Không public API configuration chứa thông tin nhạy cảm.
* Kiểm tra quyền chia sẻ Google Drive định kỳ.
* Backup dữ liệu quan trọng.

---

# 📜 29. License

```text
Proprietary Software

Copyright © EDUCO.

This project and its source code are proprietary and confidential.
Unauthorized copying, modification, distribution or commercial use
is prohibited without prior authorization.
```

---

# 👨‍💻 30. Project Summary

**EDUCO Employee Onboarding Portal** là một giải pháp HR Digitalization được xây dựng nhằm số hóa quy trình tiếp nhận nhân sự từ đầu đến cuối.

```text
┌─────────────────────────────────────────────────────────────┐
│                  EDUCO ONBOARDING PORTAL                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  👤 Candidate Experience                                    │
│          │                                                  │
│          ▼                                                  │
│  📝 Digital Data Collection                                 │
│          │                                                  │
│          ▼                                                  │
│  ✅ Validation                                               │
│          │                                                  │
│          ▼                                                  │
│  📎 Document Collection                                     │
│          │                                                  │
│          ▼                                                  │
│  ⚙️ Automated Processing                                    │
│          │                                                  │
│      ┌───┴────────────┐                                     │
│      ▼                ▼                                     │
│  📊 Google Sheets   📁 Google Drive                         │
│      │                │                                     │
│      └────────┬───────┘                                     │
│               ▼                                             │
│       🏢 HR Operation                                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**From Manual Onboarding → Digital Onboarding → Automated HR Operation.**

---

<div align="center">

### 🏛️ EDUCO Employee Onboarding Portal

**Digitalize. Standardize. Automate.**

</div>
