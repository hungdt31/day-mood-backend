# Typescript Decorators

## 1. Ví dụ về Decorators khi sử dụng với NestJS

- Có dấu @ đặc trưng: `@Injectable()` `@Controller()`

Ví dụ: khi định nghĩa 1 class với `@Controller()` $\Rightarrow$ Nest sẽ sử dụng class này như là một controller.

## 2. Decorator là gì?

- Decorator là những ký hiệu (chú thích) giúp cho class/property/functions/params có thêm tính năng mới.

- **Decorator bắt đầu bằng dấu @, sau đấy là "expression"**.

- Bao gồm 5 level:
  - Class declaration itself
  - Properties
  - Accessors (getter/setter)
  - Methods
  - Parameters

Ví dụ:

```typescript
  @classDecorator
  class Person {
    @propertyDecorator
    public name : string

    @accessorDecorator
    get fullName(){
      // ...
    }

    @methodDecorator
    printName(@parameterDecorator prefix : string){
      // ...
    }
  }
```

## 3. Tại sao cần Decorator?

- Decorator giúp bạn biết code ngắn hơn, có khả năng tái sử dụng ở nhiều nơi, đồng thời bổ sung 'sức mạnh' cho các thành phần được "trang trí" (decorated).

Ví dụ:

```typescript
class User {
  @Min(0)
  @Max(10)
  @IsEmail
  email : string
}
```

## 4. Decorator Design Pattern

- Hướng tới nguyên lý **Open/Closed** (mở để mở rộng nhưng đóng để chỉnh sửa), có nghĩa là mở rộng chức năng của class mà không cần thay đổi mã nguồn của class đó.
- Cho phép các tính năng mới thêm vào đối tượng một cách linh hoạt mà không cần thay đổi cấu trúc bên trong của đối tượng đó. Thay vì sửa đổi trực tiếp class, bạn có thể bọc đối tượng gốc trong một chuỗi các decorator để thêm hành vi mới (behavior).

## 5. Tài liệu tham khảo

- [https://www.typescriptlang.org/docs/handbook/2/generics.html](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [https://www.typescriptlang.org/docs/handbook/decorators.html](https://www.typescriptlang.org/docs/handbook/decorators.html)
