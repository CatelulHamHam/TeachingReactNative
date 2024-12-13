**React Native Simple App Cheat Sheet Lesson 1**

---

### 1. Project Overview
- **Purpose:** Create a simple app to demonstrate basic React Native functionality for beginners.
- **Features:**
    - A `TextInput` for user input.
    - A `Button` to trigger an action.
    - An `Image` to display different pet pictures based on user actions.

---

### 2. Key Components (with HTML Comparisons)

#### 2.1 `useState` Hook
- **What It Does:** Helps manage dynamic data in your app (state management).
- **How It Works:**
    - You declare a state variable (e.g., `pet`) and a function to update it (e.g., `setPet`).
    - The initial value of the state variable is set when you call `useState()`.

  Example:
  ```javascript
  const [pet, setPet] = useState(dog);
  ```
  Here, `pet` holds the current image URL, and `setPet` is used to change it.

#### 2.2 Core Components

- **View:**
    - Acts as a container for organizing layout.
    - **HTML Equivalent:** `<div>`

  Example:
  ```javascript
  <View style={styles.container}></View>
  ```

- **Text:**
    - Displays static or dynamic text.
    - **HTML Equivalent:** `<p>` or `<span>`

  Example:
  ```javascript
  <Text>Write something about this pet:</Text>
  ```

- **TextInput:**
    - Allows user input.
    - **HTML Equivalent:** `<input type="text" />`

  Example:
  ```javascript
  <TextInput style={styles.myTextInput} />
  ```

- **Button:**
    - Triggers an action when pressed.
    - **HTML Equivalent:** `<button>`

  Example:
  ```javascript
  <Button title="DO ACTION" onPress={() => { setPet(cat); }} />
  ```

- **Image:**
    - Displays images dynamically based on the source URL.
    - **HTML Equivalent:** `<img>`

  Example:
  ```javascript
  <Image style={styles.img} source={{ uri: pet }} />
  ```

---

### 3. Styles (with Explanations)
- **Purpose:** Define how components look.
- **How It Works:**
    - Use `StyleSheet.create` to define a set of styles.
    - Apply these styles to components using the `style` prop.

#### Detailed Example:
```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1, // Similar to CSS `flex: 1` for full-screen layout.
    backgroundColor: '#fff', // CSS `background-color: white`.
    alignItems: 'center', // CSS `align-items: center` (horizontal alignment).
    justifyContent: 'center', // CSS `justify-content: center` (vertical alignment).
  },
  myTextInput: {
    borderColor: 'black', // CSS `border-color: black`.
    borderWidth: 2, // CSS `border-width: 2px`.
    padding: 10, // CSS `padding: 10px` (inside spacing).
    margin: 10, // CSS `margin: 10px` (outside spacing).
    width: 200, // CSS `width: 200px`.
  },
  img: {
    width: 200, // CSS `width: 200px`.
    height: 200, // CSS `height: 200px`.
  },
});
```

#### Notes on Flexbox:
React Native uses Flexbox for layout. Here are some common properties:
- `flex: 1`: Makes the container fill the available space.
- `alignItems: 'center'`: Centers children horizontally.
- `justifyContent: 'center'`: Centers children vertically.

---

### 4. Application Flow
1. **Initial State:**
    - The app starts by displaying the dog image.
    - `pet` is initialized with the dog image URL.

   Example:
   ```javascript
   const dog = 'https://dogtime.com/assets/uploads/2018/10/puppies-cover.jpg';
   const cat = 'https://kittenrescue.org/wp-content/uploads/2017/03/KittenRescue_KittenCareHandbook.jpg';
   const [pet, setPet] = useState(dog);
   ```

2. **Button Action:**
    - When the button is pressed, the `onPress` function updates the `pet` state to show the cat image.

   Example:
   ```javascript
   <Button title="DO ACTION" onPress={() => {
     setPet(cat);
   }} />
   ```

3. **Dynamic Image Display:**
    - The `Image` component updates automatically when `pet` changes.

   Example:
   ```javascript
   <Image style={styles.img} source={{ uri: pet }} />
   ```

---

### 5. Full Code
```javascript
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';

const dog = 'https://dogtime.com/assets/uploads/2018/10/puppies-cover.jpg';
const cat = 'https://kittenrescue.org/wp-content/uploads/2017/03/KittenRescue_KittenCareHandbook.jpg';

export default function App() {
  const [pet, setPet] = useState(dog);

  return (
    <View style={styles.container}>
      <Text>Write something about this pet:</Text>
      <TextInput style={styles.myTextInput} />
      <StatusBar style="auto" />
      <Button title="DO ACTION" onPress={() => {
        setPet(cat);
      }} />
      <Image style={styles.img} source={{ uri: pet }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  myTextInput: {
    borderColor: 'black',
    borderWidth: 2,
    padding: 10,
    margin: 10,
    width: 200,
  },
  img: {
    width: 200,
    height: 200,
  },
});
```

---

### 6. Key Concepts Illustrated
1. **State Management:**
    - The `useState` hook updates UI dynamically when the state changes.
    - Example: Switching between dog and cat images.

2. **Component Composition:**
    - Modular components (`Text`, `Button`, `Image`, etc.) keep the code clean and reusable.

3. **Styling:**
    - Use `StyleSheet.create` to centralize and reuse styles, ensuring consistency.

4. **Event Handling:**
    - Actions like button presses are handled using the `onPress` event.

---


