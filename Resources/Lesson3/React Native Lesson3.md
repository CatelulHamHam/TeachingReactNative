**React Native Lesson: Building a Dynamic Table with File Saving**

---

### 1. Lesson Overview
In this lesson, we will create a React Native app that:
1. Uses **Expo** for easy development and testing.
2. Builds a **dynamic table** that updates based on user input.
3. Implements **input fields** to collect user data.
4. Saves and loads the table data using the **expo-file-system** library.
5. Includes styling with React Native's **StyleSheet** for clean layouts.

This lesson focuses on beginners and explains concepts in detail with examples.

---

### 2. Setting Up the Project

#### Step 1: Create a New Expo Project
Run the following command to create a new project using Expo:
```bash
npx create-expo-app table-app --template blank
```

#### Step 2: Navigate to the Project Folder and Start the Development Server
```bash
cd table-app
npx expo start
```
This command opens the Expo CLI, allowing you to test the app using the Expo Go app on your phone.

---

### 3. Key Components and Concepts

#### 3.1 Using **TextInput** for User Input

- **Purpose:** To capture text input from the user.
- **Key Props:**
    - `placeholder`: Placeholder text displayed when the input is empty.
    - `onChangeText`: Callback triggered when the text changes.
    - `value`: The current value of the input field.

**Example:**
```javascript
<TextInput
  style={styles.input}
  placeholder="Enter a value"
  onChangeText={(text) => setInputValue(text)}
  value={inputValue}
/>
```
**Explanation:**
- The `onChangeText` callback updates the state whenever the user types in the input field.
- The `value` prop ensures the field displays the current state value.

---

#### 3.2 **FlatList** for Dynamic Table Rendering

- **Purpose:** To efficiently render a list of rows.
- **Key Props:**
    - `data`: The array of data to display.
    - `renderItem`: Function that defines how each row is rendered.
    - `keyExtractor`: Ensures each row has a unique key for better performance.

**Example:**
```javascript
<FlatList
  data={tableData}
  renderItem={({ item }) => (
    <View style={styles.row}>
      <Text>{item.key}</Text>
      <Text>{item.value}</Text>
    </View>
  )}
  keyExtractor={(item, index) => index.toString()}
/>
```
**Explanation:**
- `data` connects to the table data stored in the state.
- `renderItem` renders each row as a `View` with `Text` elements.
- `keyExtractor` assigns a unique key to each row for optimal rendering.

---

#### 3.3 **expo-file-system** for File Operations

##### Installing the Library
Run the following command to install the `expo-file-system` library:
```bash
npm install expo-file-system
```

##### Writing Data to a File

Use the `FileSystem.writeAsStringAsync` method to save data to a file:
```javascript
import * as FileSystem from 'expo-file-system';

const saveToFile = async (data) => {
  const fileUri = `${FileSystem.documentDirectory}tableData.txt`;
  try {
    await FileSystem.writeAsStringAsync(fileUri, data);
    console.log('File saved to:', fileUri);
  } catch (error) {
    console.error('Error saving file:', error);
  }
};
```

##### Reading Data from a File
Use the `FileSystem.readAsStringAsync` method to load data:
```javascript
const loadFromFile = async () => {
  const fileUri = `${FileSystem.documentDirectory}tableData.txt`;
  try {
    const fileContent = await FileSystem.readAsStringAsync(fileUri);
    console.log('Loaded content:', fileContent);
  } catch (error) {
    console.error('Error reading file:', error);
  }
};
```

##### Clearing the File
Use `FileSystem.deleteAsync` to delete the file:
```javascript
const clearFile = async () => {
  const fileUri = `${FileSystem.documentDirectory}tableData.txt`;
  try {
    await FileSystem.deleteAsync(fileUri);
    console.log('File cleared.');
  } catch (error) {
    console.error('Error clearing file:', error);
  }
};
```

---

### 4. Complete Application Code

```javascript
import React, { useState } from 'react';
import { FlatList, Button, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';

export default function App() {
  const [tableData, setTableData] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const saveToFile = async () => {
    const fileUri = `${FileSystem.documentDirectory}tableData.txt`;
    const data = tableData.map((row) => `${row.key}: ${row.value}`).join('\n');
    try {
      await FileSystem.writeAsStringAsync(fileUri, data);
      Alert.alert('Saved!', `File saved to: ${fileUri}`);
    } catch (error) {
      Alert.alert('Error', 'Could not save file.');
    }
  };

  const loadFromFile = async () => {
    const fileUri = `${FileSystem.documentDirectory}tableData.txt`;
    try {
      const fileContent = await FileSystem.readAsStringAsync(fileUri);
      const rows = fileContent
        .split('\n')
        .filter((line) => line.trim() !== '')
        .map((line, index) => {
          const [key, value] = line.split(': ');
          return { key: `Row ${index + 1}`, value };
        });
      setTableData(rows);
    } catch (error) {
      console.log('No file to load.');
    }
  };

  const clearGUI = () => {
    setTableData([]);
    Alert.alert('Cleared!', 'The GUI has been cleared.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dynamic Table with File Saving</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a value"
        onChangeText={(text) => setInputValue(text)}
        value={inputValue}
      />
      <Button
        title="Add Row"
        onPress={() => {
          setTableData([...tableData, { key: `Row ${tableData.length + 1}`, value: inputValue }]);
          setInputValue('');
        }}
      />
      <FlatList
        data={tableData}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text>{item.key}</Text>
            <Text>{item.value}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button title="Save Data to File" onPress={saveToFile} />
      <Button title="Load Data from File" onPress={loadFromFile} />
      <Button title="Clear GUI" onPress={clearGUI} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});
```

---

### 5. Key Takeaways
1. **Expo simplifies development** with tools like `expo-file-system`.
2. **Dynamic UI** can be built using `FlatList` and `TextInput`.
3. **State management** with `useState` is crucial for handling dynamic data.
4. **File operations** add persistence, allowing data to persist across sessions.

---
