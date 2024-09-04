# Inversion Of Control (IOC)

## 1. Definition

- Trong OOP, IoC là cách "đảo ngược" sự kiểm soát của một đối tượng, function. IoC là khái niệm (principle), không phải là "cách làm".

Ví dụ:

```plaintext
public class A {
  B b;
  public A() {
    b = new B();
  }

  public void Task(){
    // do something here
    b.someMethod();
    // do something here
  }
}
public class B {
  // ....
  public void someMethod(){
    // doing something
  }
}
```

Class A không thể hoàn thành tác vụ của nó "Task" nếu không có Class B.

$\Rightarrow$ Class A "phụ thuộc" vào Class B.

Class A "kiểm soát" vòng đời của B (tạo và sử dụng B).

$\Rightarrow$ Sinh ra IoC để "giảm thiểu" sự phụ thuộc giữa các class với nhau.

- Mục đích: có thể *tách rời* các class và *test* độc lập, không phụ thuộc vào nhau.

**KEY WORD**: đảo ngược "phụ thuộc" $\rightarrow$ "độc lập".

## 2. How to use

- Sử dụng các "pattern" như Factory, Dependencies Injections ...
