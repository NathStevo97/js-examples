// Basic Variables

let x: number = 3; // number type with value

// let x: number;

x = 2;

let y: string = "hello";

let z: boolean = true;

let a: any;

const hello = "hello world";

// hello - 8; // error thrown

let b: unknown;

// Void Function

function c(): void {

}

// Null

var val: null = null;

// Array

var nums: number[] = [1, 2, 3, 4];

// Tuple

var obj: [string, number] = ["hello", 2];

// Object

var obj2: object = {};

// Custom Type

type Animal = {
    name: string;
    age: number;
    colors: string[] | string; // example of combining types, either a string array or string
    legs?: number; // optional value -> implicitly will be number or undefined
}

// sample function to work with custom type
const printAnimal = (animal: Animal) => {
    console.log(animal.name, animal.age, animal.legs)
};

const dog = {
    name: "nathan",
    age: 10,
    colors: ["brown", "black"],
};

printAnimal(dog)

// Set Edge Case

const s = new Set();

const s1 = new Set<any>();

const s2 = new Set<number>();

const s3: Set<number> = new Set();

// Interfaces Intro

type Fish = {
    name: string;
    swim: () => void;
};

type Dog = {
    name: string;
    bark: () => void;
}

interface Animals {
    name: string;
  }

  const printName = (animal: Animals) => {
      console.log(animal.name);
  };

// Enums

enum ShirtSize {
    Small = "Small",
    Medium = "Medium",
    Large = "Large"
  }

  const getShirtPrice = (shirtSize: ShirtSize) => {
    switch (shirtSize) {
      case ShirtSize.Small:
        return 10;
      case ShirtSize.Medium:
        return 20;
      case ShirtSize.Large:
        return 30;
    }
  }

// Type Guard

// Type Guard Function
const isFish = (animal: Fish | Dog): animal is Fish => {
    return (animal as Fish).swim !== undefined; // Attempt to access the swim property, if undefined, false is returned, and Animal is viewed as Dog
  }

  const callAnimalFunc = (animal: Dog | Fish) => {
    if (isFish(animal)) animal.swim()
    else animal.bark()
  };