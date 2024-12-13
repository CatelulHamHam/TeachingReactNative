**JavaScript Fundamentals Cheat Sheet**

---

### 1. Variables and Constants
- **Declare a Variable:**
  ```javascript
  let age = 15; // Can be reassigned
  const name = "John"; // Cannot be reassigned
  var city = "New York"; // Avoid using (legacy)
  ```

- **Best Practices:**
  - Use `const` for values that won’t change.
  - Use `let` for variables that may change.
  - Avoid `var` to prevent scope-related bugs.

---

### Exercises

#### 1. Variables and Constants
1. Declare a variable `x` with the value 10 and a constant `PI` with the value 3.14. Print their values to the console.
2. Try to reassign the value of `PI` and observe what happens. Why does this error occur?

---

### 2. Data Types
- **Primitive Types:**
  - `String`: `'Hello'`, `"World"`
  - `Number`: `42`, `3.14`
  - `Boolean`: `true`, `false`
  - `Null`: `null`
  - `Undefined`: `undefined`
  - `Symbol`: `Symbol("id")`

- **Complex Types:**
  ```javascript
  let fruits = ["apple", "banana", "cherry"]; // Array
  let person = { name: "Alice", age: 25 };     // Object
  ```

- **Type Checking:**
  ```javascript
  console.log(typeof "Hello"); // "string"
  console.log(Array.isArray(fruits)); // true
  ```

---

### Exercises

#### 2. Data Types
1. Create an array of three favorite colors and log its length.
2. Create an object representing a car with `make`, `model`, and `year`. Log the car's make and year.

---

### 3. Functions
- **Function Declaration:**
  ```javascript
  function greet(name) {
    return `Hello, ${name}!`;
  }
  ```

- **Arrow Function:**
  ```javascript
  const add = (a, b) => a + b;
  ```

- **Default Parameters:**
  ```javascript
  function multiply(a, b = 1) {
    return a * b;
  }
  ```

---

### Exercises

#### 3. Functions
1. Write a function `square` that returns the square of a number.
2. Create a function `isAdult` that takes an age and returns `true` if age is 18 or older, otherwise `false`.
3. Convert the `isAdult` function to an arrow function.

---

### 4. Conditionals
- **If/Else Statement:**
  ```javascript
  if (age >= 18) {
    console.log("Adult");
  } else {
    console.log("Minor");
  }
  ```

- **Ternary Operator:**
  ```javascript
  const status = age >= 18 ? "Adult" : "Minor";
  ```

- **Switch Statement:**
  ```javascript
  switch (color) {
    case "red":
      console.log("Stop");
      break;
    case "green":
      console.log("Go");
      break;
    default:
      console.log("Caution");
  }
  ```

---

### Exercises

#### 4. Conditionals
1. Write a function `getGrade` that takes a score and returns "A", "B", "C", "D", or "F" based on the score.
2. Use a switch statement to log a message for traffic light colors: "red", "yellow", "green".

---

### 5. Loops
- **For Loop:**
  ```javascript
  for (let i = 0; i < 5; i++) {
    console.log(i);
  }
  ```

- **While Loop:**
  ```javascript
  let count = 0;
  while (count < 5) {
    console.log(count);
    count++;
  }
  ```

- **Do-While Loop:**
  ```javascript
  let i = 0;
  do {
    console.log(i);
    i++;
  } while (i < 5);
  ```

- **Array Methods:**
  ```javascript
  fruits.forEach(fruit => console.log(fruit));
  let numbers = [1, 2, 3].map(num => num * 2); // [2, 4, 6]
  ```

---

### Exercises

#### 5. Loops
1. Write a for loop that prints the numbers from 1 to 10.
2. Create a while loop that prints "Hello" 5 times.
3. Use the `map` method to create a new array with each number squared from `[2, 4, 6]`.

---

### Continue for remaining topics as needed...

---


