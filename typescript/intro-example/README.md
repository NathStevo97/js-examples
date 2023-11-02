# Intro Example

The following code was written following this [Tech with Tim Tutorial](https://www.youtube.com/watch?v=cDeTUYkaEkg&list=PLFHudDXMMrcawIE5TWDvTVmZeTbucfdqK&index=37&t=110s) to provide an introduction to Typescript.

---

## What is Typescript

- A superset of Javascript, extending base Javascript functionality by adding optional static types.
- This aims to help write more robust and maintainable code.
- Typescript compiles straight down to standard `.js` files, ensuring browser compatability.

## Getting Started

- Ensure [NodeJS](https://nodejs.org/en/download/current) is installed.
- Install Typescript globally: `npm install -g typescript`
- Verify installation with `tsc -v`
- In the project directory of choice: `npm init -y` and create a file `tsconfig.json`, this hosts typescript-level configuration for the project.
- In this file particular parameters of note are:
  - `outDir` - The directory location where the compiled Typescript code will be stored.
  - `skipLibCheck` - Enables/Disables checking node modules or libraries.
  - `include` - Specifying any additional files that are to be included in the project.

## Writing and Compiling Code

- Once some typescript code has been defined e.g. the first two lines of `src/index.ts`, it can be compiled into standard Javascript in the `outDir` via running `tsc` from the project root.

## Variables and Type Assignment

- Type annotation done by adding `: <type name>` after a given `let <var name>` command e.g. `let x: number = 1`
  - Alternatively: `<var name>: <type>;` and the variable value can be defined later.
- During value assignment, if the value is not of the specified type, an appropriate error will be displayed in the IDE prior to execution.

- Other types available include:
  - `string` - e.g. `"hello"`
  - `boolean` - e.g. `true`, `false`
  - `any` - Allows any value, it informs typescript to skip creating a static type.

- Types do not need to be specified like above all the time, it can infer the type e.g. `const hello = "hellow world;"
- If `hello` was to be use d in an incompatible operation e.g. `hello - 8`, an error will be thrown.

- A final type to note is `unknown` e.g. `let y: unknown;`
- Unlike `any`, `unknown` will force conversion to a different static type prior to usage.

### Void and Function Types

- Void is used when specifying a function that will not return any value.
- Example:

```typescript
function x(): void {

}
```

- If you know a function is going to return a value of particular type, and takes arguments of specific types, they can be specified in a similar manner to:

```typescript
function x(num1: number, num2: number): number {
    return num1 + num2
}
```

### Null

`var val: null = null;`

### Undefined

`var val: undefined = undefined;`

### Array

- 1D Array: `var nums: number[] = [1, 2, 3, 4];`
- 2D Array: `var nums2: number[][] = [[]];`

### Tuple

- Example: `var obj: [string, number] = ["hello", 2];`

### Object

- Example: `var obj2: object = {};`

## Custom Types

- Creating custom types is one of the primary benefits of TypeScript, an example follows for "Animal", simply define the attributes and their associated types.

```typescript
type Animal = {
    name: string;
    age: number;
    colors: string[];
    legs?: number;
}
```

- **Note:** For optional attributes, add `?` after the attribute name. Typescript will automatically infer this to be either the type defined or the `undefined` type.

- You can still define a variable in a construct similar to above without explicitly saying it's of the custom type.
- To annotate it as the custom type, either append `as <custom type name>` after the final `}` or the usual `<variable name>: <custom type name> {}`

- **Note:** To force Typescript to treat a possibly undefined value as defined, add `!` when refering to it.
  - This is not recommended, one should instead do `(<variable>.<attribute> !== undefined ? <variable>.<attribute> : 0 )`

## Nesting Types

- Types can be comprised of multiple types. Using the `Animal` type defined before:

```typescript
type Farm = {
    animals: Animal[]
    animalNamesToObjects: {
        [name: string]: Animal
    }
}
```

- `animalNamesToObjects` is an example of using a mapping type to create an object, which sets a key that maps to a specific type's value e.g. `Animal`.

## Combining Types

- Suppose we want `colors` to be a string array or just a string, one can use the `|` operator to support this. An example follows:

```typescript
type Animal = {
    name: string;
    age: number;
    colors: string[] | string;
    legs?: number;
}
```

- Types can also be merged with other types, suppose in the `Animal` example we have `Monkey` as follows:

```typescript
type Monkey = {
    diet: string;
}
```

- This will likely have similar parameters to that of `Animal`, rather than copy the attributes in, one can append `& <type name>` at the end as an annotation in a similar manner to below:

```typescript
type Monkey = {
    diet: string;
} & Animal;
```

- This will create an intersection of the two types, ensuring all the parameters of Animal are included in the type `Monkey`.

## Typing Edge Case

- Consider defining a set in Typescript in a similar manner to the following:

```typescript
const s = new Set();
```

- An error / warning will be thrown as it expects a type to be defined for the set. This can be done by appending `<type name>` after `Set`. Examples follow:

```typescript
const s = new Set<any>();

const s = new Set<number>();

const s: Set<number> = new Set();
```

## Interfaces

- Consider the following types that share a common parameter:

```typescript
type Fish = {
    name: string;
    swin: () => void;
};

type Dog = {
    name: string;
    bark: () => void;
}

const printName = (animal: Dog | Fish) => {
    console.log(animal.name);
};
```

- The `console.log` command above works fine, as both `Fish` and `Dog` share the `name` parameter.
- As more types arise, this can get more complex, you don't want to have to keep adding `|`. Interfaces can help avoid this.
- Keeping the `Fish` and `Dog` types from before:

```typescript
interface Animal {
  name: string;
}

const printName = (animal: Animal) => {
    console.log(animal.name);
};
```

- This interface allows passing of any object so long as it meets the requirements of `Animal` i.e. has the `name` parameter. Effecetively, this allows `Fish` or `Dog` to be viewed through the lens of `Animal`.

## Enums

- Consider the following function:

```typescript
const getShirtPrice = (shirtSize: "small" | "medium" | "large") => {
  switch (shirtSize) {
    case "small":
      return 10;
    case "medium":
      return 20;
    case "large":
      return 30;
  }
}
```

- If one wished to change the value of one of the shirt options or add a new option in, a lot of small changes would need to be made to the function. This is not best practice for reusability and maintainability.
- Enums can help mitigate this:

```typescript
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

const price = getShirtPrice(ShirtSize.Small)
```

- Now, the function knows to accept any value defined within `ShirtSize`. The values associated can be changed without impacting the function.

## Type Guards and Checking

- Reconsidering the two animal types from previously, we know how to get it to return the common parameter `name`, but what about the unique parameters like `bark` or `swim`?
- One needs to check what the type is:

```typescript
type Fish = {
    name: string;
    swin: () => void;
};

type Dog = {
    name: string;
    bark: () => void;
}

// Type Guard Function
const isFish = (animal: Fish | Dog): animal is Fish => {
  return (animal as Fish).swim !== undefined; // Attempt to access the swim property, if undefined, false is returned, and Animal is viewed as Dog
}

const printName = (animal: Dog | Fish) => {
  if (isFish(animal)) animal.swim()
  else animal.bark()
};
```

## Ignoring Type Checking

- To ignore compiler / linter errors, add the annotation `// @ts-ignore` to the line immediately above the type error you wish to ignore
