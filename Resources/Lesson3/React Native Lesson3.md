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
import {StatusBar} from 'expo-status-bar';
import { SafeAreaView } from 'react-native';


export default function App() {
  const [fileData, setFileData] = useState([]);
  const [fileInputValue, setFileInputValue] = useState('');

  // Expo FileSystem Functions
  const saveToFileExpo = async () => {
    const fileUri = `${FileSystem.documentDirectory}fileData.txt`;
    const data = fileData.map((row) => `${row.key}: ${row.value}`).join('\n');
    try {
      await FileSystem.writeAsStringAsync(fileUri, data);
      Alert.alert('File Saved!', `Your data has been saved to a file at:\n${fileUri}`);
    } catch (error) {
      Alert.alert('Error', 'Could not save data to a file.');
    }
  };

  const loadFileData = async () => {
    const fileUri = `${FileSystem.documentDirectory}fileData.txt`;
    try {
      const fileDataContent = await FileSystem.readAsStringAsync(fileUri);
      const parsedData = fileDataContent
              .split('\n')
              .filter((line) => line.trim() !== '')
              .map((line, index) => {
                const [key, value] = line.split(': ');
                return { key: `Row ${index + 1}`, value: value || '' };
              });
      setFileData(parsedData);
    } catch (error) {
      console.log('No file to load yet.'); // Removed the alert for initial load
    }
  };

  const clearFileData = async () => {
    const fileUri = `${FileSystem.documentDirectory}fileData.txt`;
    try {
      await FileSystem.deleteAsync(fileUri);
      setFileData([]);
      Alert.alert('Cleared!', 'All data has been removed from the file.');
    } catch (error) {
      Alert.alert('Error', 'Could not clear data from the file.');
    }
  };

  return (

          <SafeAreaView style={styles.container}>
            <View style={styles.container}>
              <StatusBar style="auto" />
              <Text style={styles.title}>Expo FileSystem</Text>
              <TextInput
                      style={styles.input}
                      placeholder="Enter a value"
                      onChangeText={(text) => setFileInputValue(text)}
                      value={fileInputValue}
              />
              <Button
                      style={styles.buttonSpacing}
                      title="Add Row"
                      onPress={() => {
                        setFileData([...fileData, { key: `Row ${fileData.length + 1}`, value: fileInputValue }]);
                        setFileInputValue('');
                      }}
              />
              <FlatList
                      style={styles.list}
                      data={fileData}
                      renderItem={({ item }) => (
                              <View style={styles.row}>
                                <Text>{item.key}</Text>
                                <Text>{item.value}</Text>
                              </View>
                      )}
                      keyExtractor={(item, index) => index.toString()}
              />
              <View style={styles.buttonSpacing}>
                <Button title="Save Data to File" onPress={saveToFileExpo} />
              </View>
              <View style={styles.buttonSpacing}>
                <Button title="Load Data from File" onPress={loadFileData} />
              </View>
              <View style={styles.buttonSpacing}>
                <Button title="Clear Data in File" onPress={clearFileData} />
              </View>
            </View>
          </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  list: {
    maxHeight: 200,
  },
  buttonSpacing: {
    marginVertical: 10,
  },
  container :{
    flex: 1,
    marginTop: 20,
    marginHorizontal: 5, 
  }
});
```

---

### 5. Key Takeaways
1. **Expo simplifies development** with tools like `expo-file-system`.
2. **Dynamic UI** can be built using `FlatList` and `TextInput`.
3. **State management** with `useState` is crucial for handling dynamic data.
4. **File operations** add persistence, allowing data to persist across sessions.


```npm
npx expo install react-native-safe-area-context
```
---
