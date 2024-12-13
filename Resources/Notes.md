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

### 6. Destructuring
- **Objects:**
  ```javascript
  const person = { name: "Bob", age: 30 };
  const { name, age } = person;
  ```

- **Arrays:**
  ```javascript
  const [first, second] = ["a", "b"];
  ```

- **Nested Destructuring:**
  ```javascript
  const user = { profile: { username: "john_doe", age: 30 } };
  const { profile: { username } } = user;
  ```

### 7. Spread and Rest Operators
- **Spread Operator:**
  ```javascript
  const nums1 = [1, 2];
  const nums2 = [...nums1, 3, 4]; // [1, 2, 3, 4]
  ```

- **Rest Operator:**
  ```javascript
  function sum(...numbers) {
    return numbers.reduce((a, b) => a + b);
  }
  ```

### 8. Template Literals
- **String Interpolation:**
  ```javascript
  const greeting = `Hello, ${name}!`;
  ```

- **Multiline Strings:**
  ```javascript
  const message = `This is line 1.
  This is line 2.`;
  ```

### 9. Modules
- **Export:**
  ```javascript
  export const greet = name => `Hello, ${name}`;
  ```

- **Import:**
  ```javascript
  import { greet } from "./greet.js";
  ```

- **Default Export:**
  ```javascript
  export default function greet(name) {
    return `Hello, ${name}`;
  }

  import greet from "./greet.js";
  ```

### 10. Promises and Async/Await
- **Promise:**
  ```javascript
  fetch("/api")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
  ```

- **Async/Await:**
  ```javascript
  async function fetchData() {
    try {
      const response = await fetch("/api");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  ```

### 11. Event Handling
- **Add Event Listener:**
  ```javascript
  button.addEventListener("click", () => {
    console.log("Button clicked!");
  });
  ```

- **Remove Event Listener:**
  ```javascript
  function handleClick() {
    console.log("Button clicked!");
  }
  button.addEventListener("click", handleClick);
  button.removeEventListener("click", handleClick);
  ```

- **Event Delegation:**
  ```javascript
  document.body.addEventListener("click", event => {
    if (event.target.tagName === "BUTTON") {
      console.log("Button clicked!");
    }
  });
  ```

---

This cheat sheet now includes more detailed explanations and examples to deepen understanding of JavaScript fundamentals and prepares learners for advanced topics like React!

