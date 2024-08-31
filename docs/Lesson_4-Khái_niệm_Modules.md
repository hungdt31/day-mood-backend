# Modules

## Why use it

- Khi bạn phát triển ứng dụng nhỏ, chúng ta có thể code "all-in-one" (tất cả code trong 1 file/1 thư mục/1 project).
- Với dự án lớn, chúng ta không thể làm vậy vì:
  - Không thể đọc code (code quá nhiều).
  - Không thể test/maintain.
- Giải pháp đặt ra là chia dự án thành các modules. 1 modules có thể là 1 tính năng hoặc 1 nhóm tính năng có liên quan đến nhau.
- **Ưu điểm lớn nhất của cách làm này:**
  - Sự phát triển của các modules có thể làm độc lập
  - On/Off modules này không làm ảnh hưởng tới modules kia (nếu các modules không phụ thuộc nhau).
- Minh họa = hình cái cây (tree). Các modules chính là các lá của 1 cái cây. Lá này rụng sẽ không làm ảnh hưởng tới cái cây, hay các lá còn lại.

## Dependencies Injection

![Dependencies Injection](/images/Lesson4/ioc-and-mapper-in-c-1-638.jpg)

- Gồm 3 thành phần chính: consumer provider và injector
- Injector lấy service cho client sử dụng.
- Client hoạt động độc lập với Service nhưng vẫn có "sức mạnh" của Service.
![DI](/images/Lesson4/DI.png)

- Ví dụ: class A sử dụng service B
  - class A gọi là **consumer** (người tiêu thụ/sử dụng);
  - service B gọi là **provider** (nhà cung cấp);
  - Còn 1 thành phần, gọi là Injector (giúp tạo ra DI, và làm cho class A và B không phụ thuộc vào nhau).

- Xét `AppController`:
  - Thuộc tính appService một instance của class AppService không được khởi tạo khi sử dụng phương thức `getHello()` nhưng nó vẫn hoạt động tốt là nhờ cơ chế **Dependencies Injection**. <br/> ![App service](/images/Lesson4/appservice.png)
  - Bằng cách sử dụng decorator `@Injectable()`, tính năng của class **AppService (provider)** được phép chia sẻ và sử dụng gián tiếp bởi các class **Controller (Consumer)**. <br/> ![Injectable](/images/Lesson4/Inject.png)

## Injecting a dependency

```plaintext
@Controller('cats')
export class CatsController {
  private catsService : CatsService;

  constructor(service: CatsService){
    this.catsService = service;
  }
  /*TODO*/
}
```

- **Viết ngắn gọn, sử dụng keyword "private" trong typescript**

```plaintext
@Controller('cats')
export class CatsController {
  constructor(private catsService : CatsService) {}
  /*TODO*/
}
```

- Property Injection: [https://www.tutorialsteacher.com/ioc/property-injection-using-unity-container](https://www.tutorialsteacher.com/ioc/property-injection-using-unity-container)
- Method Injection: [https://docs.spring.io/spring-framework/reference/core/beans/dependencies/factory-method-injection.html](https://docs.spring.io/spring-framework/reference/core/beans/dependencies/factory-method-injection.html)

## Tổng kết

- Framework NestJS sử dụng nguyên lý **Dependencies Injection** để xây dựng modules từ các class Controller và Service phục vụ cho việc test và maintain code một cách hiệu quả.
