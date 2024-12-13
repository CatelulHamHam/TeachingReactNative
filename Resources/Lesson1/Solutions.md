**JavaScript Fundamentals Exercise Solutions**

---

### 1. Variables and Constants

**Exercise 1:**
```javascript
let x = 10;
const PI = 3.14;
console.log(x); // Output: 10
console.log(PI); // Output: 3.14
```

**Exercise 2:**
```javascript
PI = 3.14159; // Error: Assignment to constant variable.
// Explanation: Constants declared with `const` cannot be reassigned after their initial assignment.
```

---

### 2. Data Types

**Exercise 1:**
```javascript
let favoriteColors = ["blue", "green", "red"];
console.log(favoriteColors.length); // Output: 3
```

**Exercise 2:**
```javascript
let car = { make: "Toyota", model: "Corolla", year: 2020 };
console.log(car.make); // Output: Toyota
console.log(car.year); // Output: 2020
```

---

### 3. Functions

**Exercise 1:**
```javascript
function square(number) {
  return number * number;
}
console.log(square(5)); // Output: 25
```

**Exercise 2:**
```javascript
function isAdult(age) {
  return age >= 18;
}
console.log(isAdult(20)); // Output: true
console.log(isAdult(15)); // Output: false
```

**Exercise 3:**
```javascript
const isAdult = age => age >= 18;
console.log(isAdult(20)); // Output: true
console.log(isAdult(15)); // Output: false
```

---

### 4. Conditionals

**Exercise 1:**
```javascript
function getGrade(score) {
  if (score >= 90) return "A";
  else if (score >= 80) return "B";
  else if (score >= 70) return "C";
  else if (score >= 60) return "D";
  else return "F";
}
console.log(getGrade(85)); // Output: B
console.log(getGrade(50)); // Output: F
```

**Exercise 2:**
```javascript
function trafficLight(color) {
  switch (color) {
    case "red":
      console.log("Stop");
      break;
    case "yellow":
      console.log("Caution");
      break;
    case "green":
      console.log("Go");
      break;
    default:
      console.log("Invalid color");
  }
}
trafficLight("red"); // Output: Stop
trafficLight("green"); // Output: Go
```

---

### 5. Loops

**Exercise 1:**
```javascript
for (let i = 1; i <= 10; i++) {
  console.log(i);
}
// Output: 1 2 3 4 5 6 7 8 9 10
```

**Exercise 2:**
```javascript
let count = 0;
while (count < 5) {
  console.log("Hello");
  count++;
}
// Output: Hello (5 times)
```

**Exercise 3:**
```javascript
let numbers = [2, 4, 6];
let squaredNumbers = numbers.map(num => num * num);
console.log(squaredNumbers); // Output: [4, 16, 36]
```

---


