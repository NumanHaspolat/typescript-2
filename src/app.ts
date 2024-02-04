//? -------------- Classes ----------------

class Employee {
  empCode: number;
  empName: string;

  constructor(code: number, name: string) {
    this.empCode = code;
    this.empName = name;
  }
}

let emp1 = new Employee(10, "South");
//! let emp2 = new Employee("10", "South"); // (Number , "String") seklinde olmali

//? -------------- Classes - Inheritance ----------------

class Person {
  //* main class
  name: string;

  constructor(n: string) {
    this.name = n;
  }
}

class Employees extends Person {
  empCode: number;
  constructor(code: number, name: string) {
    super(name);
    this.empCode = code;
  }
  display(): void {
    console.log(`Name = ${this.empCode} , Code = ${this.name}`);
  }
}

let emp4 = new Employees(1, "Firsterr");
let per1 = new Person("Dusan Tadic");

emp4.display();
console.log(per1.name);

//? -------------- Abstract - Classes ----------------

abstract class Vehicle {
  year: number;
  color: string;
  constructor(y: number, c: string) {
    this.year = y;
    this.color = c;
  }
  startEngine(): void {
    console.log("Engine Starting ,,, VrummMMM!!");
  }

  abstract stopEngine(): void;
}

class Car extends Vehicle {
  model: string;
  hp: number;
  constructor(year: number, color: string, model: string, hp: number) {
    super(year, color);
    this.model = model;
    this.hp = hp;
  }
  stopEngine(): void {
    //* Bu fonksiyon burada olmak zorunda cunku main abstract classta (Vehicle'da) bu foknsiyonu abstract ile tanimaldim , normal classtan tek farki bu.
    console.log("Engine Stopped!");
  }
}

const Mustang = new Car(2020, "Black", "Hellcat", 621);

Mustang.startEngine(); //* Engine Starting ,,, VrummMMM!!

//? -------------- Class Data Modifiers ----------------

//* Deafult olarak tum classlar PUBLIC tir.

//? Private ===>

class User {
  public name: string;
  private age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  getAge() {
    console.log(this.age);
  }

  setAge(newAge: number) {
    if (newAge > 0 && newAge <= 100) {
      this.age = newAge;
    } else {
      throw new Error("This age isnt that realistic.");
    }
  }
}

const Philly = new User("Philly", 17);
//! console.log(Philly.age);  Property 'age' is private and only accessible within class 'User'.
Philly.getAge(); //? 17
Philly.setAge(32);
Philly.getAge(); //? 32
//* Philly.setAge(321);
//! Uncaught Error: This age isnt that realistic.
//!    at User.setAge (app.js:69:19)
//!    at app.js:78:8

//? Protected ===>

class Persons {
  protected name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Dayms extends Person {
  private department: string;

  constructor(name: string, department: string) {
    super(name);
    this.department = department;
  }

  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

let howard = new Dayms("Howard", "Sales");
console.log(howard.getElevatorPitch());
console.log(howard.name);

//? Readonly ==>

//* Sadece okumaya izin verir.

class Workers {
  readonly empCode: number;
  empName: string;

  constructor(code: number, name: string) {
    this.empCode = code;
    this.empName = name;
  }
}
let emp = new Employee(10, "John");
emp.empCode = 20; //! Compiler Error
emp.empName = "Bill";

//? Static ==>

//* Baska bir obje olusturmadan main classtan veri okumayi saglar ayni zamanda icerigi degistirebilirsin, eger static yerine public yazarsan anlarsin.

class Circle {
  static pi: number = 3.14;

  static calculateArea(radius: number) {
    return this.pi * radius ** 2;
  }
}
Circle.pi; //* returns 3.14
Circle.calculateArea(5); //* returns 78.5
Circle.pi = 3.141592653589793238462643383279502884197; //? This one is better.

//? -------------- INTERFACES ---------------

interface Calender {
  events: string[];
  addEvents(event: string): void;
}

class LMSCalender implements Calender {
  constructor(public events: string[]) {}

  addEvents(event: string): void {
    this.events.push(event);
  }
}

const cohort13 = new LMSCalender(["Html", "CSS", "JS"]);
cohort13.addEvents("React");
console.log(cohort13);

//? 2. Ornek

interface Color {
  color: { r: number; g: number; b: number };
}

interface Shape {
  alpha: number;
}

class Square implements Color, Shape {
  constructor(
    public color: { r: number; g: number; b: number },
    public alpha: number
  ) {}
}

const squ = new Square({ r: 0, g: 0, b: 0 }, 250);

console.log(squ);

//? -------------- INTERFACES as Function Type ---------------

interface NumKey {
  (key: number, value: string): void;
}

function addKey(k: number, v: string): void {
  console.log("Adding ...", k, v);
}

function update(index: number, newVal: string): void {
  console.log("Updating ...", index, newVal);
}

let myKeyValue: NumKey = addKey;
myKeyValue(7, "C.Ronaldo");
myKeyValue = update;

//? 2. Ornek

interface Sum {
  (num1: number, num2: number): number;
}

function add(n1: number, n2: number): number {
  return n1 + n2;
}

function concat(n1: string, n2: string): string {
  return n1 + n2;
}

let mySum: Sum = add;

console.log(mySum(9, 3)); //* output : 12
//! mySum = concat; kisaca hata vericek cunku Sum in parametre ve fonksiyonun return tipi (number) ile concatinki (string) farkli.

//? -------------- GENERICS ---------------

//* Problem

function getArray(items: any[]): any[] {
  return new Array().concat(items);
}

let numArr = getArray([1, 2, 3]);
let strArr = getArray(["one", "two", "three"]);
numArr.push(4);
numArr.push("4"); //! Bunun olmamasi lazim ,
strArr.push("four");
strArr.push(9); //! Bunun da olmamasi lazim ve sorunu cozmek icin ==>

//* Solution

function getArray2<T>(items: T[]): T[] {
  //? Buradaki T type , ama herhangi birsey de olabilir orn "N".
  return new Array().concat(items);
}

let newNum = getArray2([1, 2, 3]);
let newStr = getArray2(["1", "2", "3"]);
//! newNum.push("1"); ------- Error
newStr.push("4");
//! newStr.push(9);   ------- Error

interface Result<T> {
  data: T | null;
}

const myData1: Result<number> = { data: 17 };
const myData2: Result<string> = { data: "Hello" };
const myData3: Result<null> = { data: null };

//! myData1.data = "3"; Type 'string' is not assignable to type 'number'.

class KeyValuePair<K, V> {
  constructor(public key: K, public value: V) {}
}

let kvp = new KeyValuePair<number, string>(4, "asdd");
let shorter = new KeyValuePair("@asd", 2);

//! kvp.key = "3"; Type 'string' is not assignable to type 'number'.

function DisplayType<T, U>(p1: T, p2: U) {
  console.log(`p1:${typeof p1} , p2:${typeof p2}`);
}

DisplayType(console.log, 4 > 2); //* p1:function , p2:boolean , console.log bir fonksiyon oldugu icin ..

function DisplayTypeOneGeneric<T>(p1: T, p2: string) {
  console.log(`p1 : ${typeof p1} , p2 : ${typeof p2}`);
}

DisplayTypeOneGeneric<number>(2, "three"); //? p1 : number , p2 : string
DisplayTypeOneGeneric<string>("home", "asdd"); //? p1 : string , p2 : string
//* DisplayTypeOneGeneric<string>("home", 12); -- Hata vericek cunku 2. parametre manuel olarak string  ayarlanmis.

//? -------------- GENERIC Constraints ---------------

interface Product {
  name: string;
  price: number;
}

function update2<T extends object, U extends keyof T>(
  obj: T,
  prop: U,
  newValue: T[U]
) {
  obj[prop] = newValue;
}

const product: Product = { name: "Shoes", price: 545 };
update2(product, "name", "Monitor"); //? Buradaki 2. parametre ile name'i degistirdik.
update2(product, "price", 3200); //? Ayni sekilde price'i da guncelledik.
console.log(product);

//? -------------- GENERIC Utility Types ---------------

interface Car2 {
  id: number;
  name: string;
  price: number | string;
}

let car1: Required<Car2> = { id: 3, name: "Mercedes", price: "200.999$" }; //? Hepsi
let car2: Partial<Car2> = { id: 12, name: "BMW" }; //? Herhangi
let car3: Readonly<Car2> = { id: 12, name: "BMW", price: 939 }; //? Degistirilemez
let car4: Pick<Car2, "id" | "price"> = { id: 12, price: 4442 }; //? Sectiklerin
let car5: Omit<Car2, "name"> = { id: 93, price: 123 }; //? Buraya name koyamam.