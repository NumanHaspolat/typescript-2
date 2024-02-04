"use strict";
//? -------------- Classes ----------------
class Employee {
    constructor(code, name) {
        this.empCode = code;
        this.empName = name;
    }
}
let emp1 = new Employee(10, "South");
//! let emp2 = new Employee("10", "South"); // (Number , "String") seklinde olmali
//? -------------- Classes - Inheritance ----------------
class Person {
    constructor(n) {
        this.name = n;
    }
}
class Employees extends Person {
    constructor(code, name) {
        super(name);
        this.empCode = code;
    }
    display() {
        console.log(`Name = ${this.empCode} , Code = ${this.name}`);
    }
}
let emp4 = new Employees(1, "Firsterr");
let per1 = new Person("Dusan Tadic");
emp4.display();
console.log(per1.name);
//? -------------- Abstract - Classes ----------------
class Vehicle {
    constructor(y, c) {
        this.year = y;
        this.color = c;
    }
    startEngine() {
        console.log("Engine Starting ,,, VrummMMM!!");
    }
}
class Car extends Vehicle {
    constructor(year, color, model, hp) {
        super(year, color);
        this.model = model;
        this.hp = hp;
    }
    stopEngine() {
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
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    getAge() {
        console.log(this.age);
    }
    setAge(newAge) {
        if (newAge > 0 && newAge <= 100) {
            this.age = newAge;
        }
        else {
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
    constructor(name) {
        this.name = name;
    }
}
class Dayms extends Person {
    constructor(name, department) {
        super(name);
        this.department = department;
    }
    getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}
let howard = new Dayms("Howard", "Sales");
console.log(howard.getElevatorPitch());
console.log(howard.name);
//? Readonly ==>
//* Sadece okumaya izin verir.
class Workers {
    constructor(code, name) {
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
    static calculateArea(radius) {
        return this.pi * radius ** 2;
    }
}
Circle.pi = 3.14;
Circle.pi; //* returns 3.14
Circle.calculateArea(5); //* returns 78.5
Circle.pi = 3.141592653589793238462643383279502884197; //? This one is better.
class LMSCalender {
    constructor(events) {
        this.events = events;
    }
    addEvents(event) {
        this.events.push(event);
    }
}
const cohort13 = new LMSCalender(["Html", "CSS", "JS"]);
cohort13.addEvents("React");
console.log(cohort13);
class Square {
    constructor(color, alpha) {
        this.color = color;
        this.alpha = alpha;
    }
}
const squ = new Square({ r: 0, g: 0, b: 0 }, 250);
console.log(squ);
function addKey(k, v) {
    console.log("Adding ...", k, v);
}
function update(index, newVal) {
    console.log("Updating ...", index, newVal);
}
let myKeyValue = addKey;
myKeyValue(7, "C.Ronaldo");
myKeyValue = update;
function add(n1, n2) {
    return n1 + n2;
}
function concat(n1, n2) {
    return n1 + n2;
}
let mySum = add;
console.log(mySum(9, 3)); //* output : 12
//! mySum = concat; kisaca hata vericek cunku Sum in parametre ve fonksiyonun return tipi (number) ile concatinki (string) farkli.
//? -------------- GENERICS ---------------
//* Problem
function getArray(items) {
    return new Array().concat(items);
}
let numArr = getArray([1, 2, 3]);
let strArr = getArray(["one", "two", "three"]);
numArr.push(4);
numArr.push("4"); //! Bunun olmamasi lazim ,
strArr.push("four");
strArr.push(9); //! Bunun da olmamasi lazim ve sorunu cozmek icin ==>
//* Solution
function getArray2(items) {
    //? Buradaki T type , ama herhangi birsey de olabilir orn "N".
    return new Array().concat(items);
}
let newNum = getArray2([1, 2, 3]);
let newStr = getArray2(["1", "2", "3"]);
//! newNum.push("1"); ------- Error
newStr.push("4");
const myData1 = { data: 17 };
const myData2 = { data: "Hello" };
const myData3 = { data: null };
//! myData1.data = "3"; Type 'string' is not assignable to type 'number'.
class KeyValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}
let kvp = new KeyValuePair(4, "asdd");
let shorter = new KeyValuePair("@asd", 2);
//! kvp.key = "3"; Type 'string' is not assignable to type 'number'.
function DisplayType(p1, p2) {
    console.log(`p1:${typeof p1} , p2:${typeof p2}`);
}
DisplayType(console.log, 4 > 2); //* p1:function , p2:boolean , console.log bir fonksiyon oldugu icin ..
function DisplayTypeOneGeneric(p1, p2) {
    console.log(`p1 : ${typeof p1} , p2 : ${typeof p2}`);
}
DisplayTypeOneGeneric(2, "three"); //? p1 : number , p2 : string
DisplayTypeOneGeneric("home", "asdd"); //? p1 : string , p2 : string
function update2(obj, prop, newValue) {
    obj[prop] = newValue;
}
const product = { name: "Shoes", price: 545 };
update2(product, "name", "Monitor"); //? Buradaki 2. parametre ile name'i degistirdik.
update2(product, "price", 3200); //? Ayni sekilde price'i da guncelledik.
console.log(product);
let car1 = { id: 3, name: "Mercedes", price: "200.999$" }; //? Hepsi
let car2 = { id: 12, name: "BMW" }; //? Herhangi
let car3 = { id: 12, name: "BMW", price: 939 }; //? Degistirilemez
let car4 = { id: 12, price: 4442 }; //? Sectiklerin
let car5 = { id: 93, price: 123 }; //? Buraya name koyamam.
