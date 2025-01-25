no**React Native Lesson 2: Building a Table with Input for Beginners**

---

### 1. Lesson Overview
This lesson expands on Lesson 1 by creating a simple React Native app that:
1. Uses **Expo** to set up the development environment and leverage its features.
2. Implements a **table-like structure** using React Native components.
3. Includes an **input field** for user interaction.
4. Dynamically updates data in a table, demonstrating **state management** and **event handling**.
5. Explores more advanced styling options with React Native’s **StyleSheet**.
6. Demonstrates file writing functionality using both **expo-file-system** and **react-native-fs**.

---

### 2. Setting Up the Project

#### Step 1: Create a New Expo Project
Expo provides tools for quickly starting a React Native project. Run the following command in your terminal:
```bash
npx create-expo-app table-input-app --template blank
```

#### Step 2: Navigate to the Project Folder and Start the Development Server
```bash
cd table-input-app
npx expo start
```
- **What this does:** Launches the Expo CLI, which gives you a QR code to test your app on a physical device using the Expo Go app.

---

### 3. Key Components in This Lesson

#### 3.1 Views (Containers for Layout)
- **What is a View?**
    - A `View` is one of the core building blocks in React Native and serves as a container for other components.
    - It is similar to an HTML `<div>` element, used to organize and structure your app’s layout.
    - Views can hold any type of content, such as text, images, or other Views.

- **Common Use Cases:**
    - Grouping components together.
    - Defining sections of a layout.
    - Applying styling, such as alignment, padding, and background colors.

- **Key Props:**
    - `style`: Defines the visual appearance of the View, like width, height, and positioning.
    - `onLayout`: Callback triggered when the View’s layout changes (useful for dynamic layouts).

**Example:**
```javascript
<View style={styles.container}>
  <Text>Welcome to the app!</Text>
</View>
```
- **Explanation:**
    - `View` wraps the `Text` component to group and position it within the layout.
    - `style={styles.container}` applies custom styles defined in the `StyleSheet`.

**Nested Views:**
```javascript
<View style={styles.outerView}>
  <View style={styles.innerView}>
    <Text>Inner Content</Text>
  </View>
</View>
```
- **Explanation:**
    - Views can be nested to create complex layouts.
    - The `outerView` and `innerView` can have separate styles, such as different background colors or alignments.

---

#### 3.2 `TextInput` (User Input)
- **Purpose:** Capture text input from the user.
- **Key Props:**
    - `placeholder`: Text displayed when the input is empty.
    - `onChangeText`: Callback triggered when text changes.
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
- **Explanation:**
    - `style={styles.input}` applies a custom style for padding, border, etc.
    - `onChangeText={(text) => setInputValue(text)}` updates the state with the user’s input.
    - `value={inputValue}` ensures the input field reflects the current state.

---

#### 3.3 `FlatList` (Dynamic Table)
- **Purpose:** Efficiently render a list of items (like table rows).
- **Key Props:**
    - `data`: The array of items to display.
    - `renderItem`: A function that describes how to render each item.
    - `keyExtractor`: Ensures each item has a unique key for React’s rendering.

**Example:**
```javascript
<FlatList
  data={tableData}
  renderItem={({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.key}</Text>
      <Text style={styles.cell}>{item.value}</Text>
    </View>
  )}
  keyExtractor={(item, index) => index.toString()}
/>
```
- **Explanation:**
    - `data={tableData}` connects the component to the list of rows stored in state.
    - `renderItem={({ item }) => ...}` defines how each row (item) looks.
    - `keyExtractor` ensures performance by uniquely identifying each row.

---

#### 3.4 `Button` (Adding Rows)
- **Purpose:** Trigger actions, like adding a new row to the table.
- **Key Props:**
    - `title`: Text displayed on the button.
    - `onPress`: Callback triggered when the button is pressed.

**Example:**
```javascript
<Button
  title="Add Row"
  onPress={() => {
    setTableData([...tableData, { key: `Row ${tableData.length + 1}`, value: inputValue }]);
    setInputValue('');
  }}
/>
```
- **Explanation:**
    - When pressed, the button:
        1. Updates `tableData` to include a new row.
        2. Resets `inputValue` to clear the input field.

---

#### 3.5 Writing Data to a File

##### Option 1: Using `expo-file-system`
- **Purpose:** Save table data to a file for future use or sharing using Expo’s built-in FileSystem API.

#### Step 1: Install `expo-file-system`
Run the following command to add the library:
```bash
npm install expo-file-system
```

#### Step 2: Write to a File
Use `FileSystem.writeAsStringAsync` to save data.

**Example:**
```javascript
import * as FileSystem from 'expo-file-system';

const saveToFileExpo = async (data) => {
  const fileUri = `${FileSystem.documentDirectory}tableData.txt`;
  try {
    await FileSystem.writeAsStringAsync(fileUri, data);
    console.log('File written successfully to:', fileUri);
  } catch (err) {
    console.error('Error writing file:', err);
  }
};

const exportTableDataExpo = () => {
  const data = tableData.map(row => `${row.key}: ${row.value}`).join('\n');
  saveToFileExpo(data);
};
```

#### Step 3: Add an Export Button
```javascript
<Button title="Export Data (Expo)" onPress={exportTableDataExpo} />
```

##### Option 2: Using `react-native-fs`
- **Purpose:** Save table data to a file for future use or sharing using the `react-native-fs` library.

#### Step 1: Install the Library
Run the following command:
```bash
npm install react-native-fs
```

#### Step 2: Write to a File
Use `RNFS.writeFile` to save data.

**Example:**
```javascript
import RNFS from 'react-native-fs';

const saveToFileRNFS = async (data) => {
  const path = `${RNFS.DocumentDirectoryPath}/tableData.txt`;
  try {
    await RNFS.writeFile(path, data, 'utf8');
    console.log('File written successfully to:', path);
  } catch (err) {
    console.error('Error writing file:', err);
  }
};

const exportTableDataRNFS = () => {
  const data = tableData.map(row => `${row.key}: ${row.value}`).join('\n');
  saveToFileRNFS(data);
};
```

#### Step 3: Add an Export Button
```javascript
<Button title="Export Data (RNFS)" onPress={exportTableDataRNFS} />
```

---

### 4. Adding Expo Features

#### Using `expo-status-bar`
- **Purpose:** Customize the device’s status bar.
- **Example:**
```javascript
import { StatusBar } from 'expo-status-bar';
<StatusBar style="dark" />
```
- **Explanation:** Adjusts the status bar’s appearance to complement your app’s theme.

#### Using `expo-constants`
- **Purpose:** Access device information (e.g., safe area insets).
- **Example:**
```javascript
import Constants from 'expo-constants';
const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight, // Avoids overlap with the status bar
  },
});
```

---

### 5. Styling the App
React Native uses `StyleSheet` for styling, similar to CSS but with JavaScript syntax.

**Example Styles:**
```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
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
  cell: {
    flex: 1,
    textAlign: 'center',
  },
});
```
- **Key Properties:**
    - `flexDirection: 'row'`: Aligns children horizontally.
    - `borderWidth` and `borderColor`: Style the table rows.
    - `padding` and `margin`: Add spacing for better visuals.

---

### 6. Full Application Code
```javascript
import React, { useState } from 'react';
import { FlatList, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system';
import RNFS from 'react-native-fs';

export default function App() {
  const [tableData, setTableData] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const saveToFileExpo = async (data) => {
    const fileUri = `${FileSystem.documentDirectory}tableData.txt`;
    try {
      await FileSystem.writeAsStringAsync(fileUri, data);
      console.log('File written successfully to:', fileUri);
    } catch (err) {
      console.error('Error writing file:', err);
    }
  };

  const saveToFileRNFS = async (data) => {
    const path = `${RNFS.DocumentDirectoryPath}/tableData.txt`;
    try {
      await RNFS.writeFile(path, data, 'utf8');
      console.log('File written successfully to:', path);
    } catch (err) {
      console.error('Error writing file:', err);
    }
  };

  const exportTableDataExpo = () => {
    const data = tableData.map(row => `${row.key}: ${row.value}`).join('\n');
    saveToFileExpo(data);
  };

  const exportTableDataRNFS = () => {
    const data = tableData.map(row => `${row.key}: ${row.value}`).join('\n');
    saveToFileRNFS(data);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.title}>Dynamic Table Example</Text>
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
            <Text style={styles.cell}>{item.key}</Text>
            <Text style={styles.cell}>{item.value}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button title="Export Data (Expo)" onPress={exportTableDataExpo} />
      <Button title="Export Data (RNFS)" onPress={exportTableDataRNFS} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
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
  cell: {
    flex: 1,
    textAlign: 'center',
  },
});
```

---

### 7. Key Takeaways
1. **Expo Features:** Streamline app development and testing.
2. **State Management:** `useState` helps manage dynamic data.
3. **Dynamic Lists:** `FlatList` efficiently renders tables.
4. **Styling:** Flexbox and `StyleSheet` ensure responsive and clean layouts.
5. **Views:** Central to organizing layouts, enabling nested components and custom styling.
6. **File Operations:** Save app data to files using `expo-file-system` and `react-native-fs` for persistence or sharing.

```javascript
import React, { useState } from 'react';
import { FlatList, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

export default function App() {
  const [tableData, setTableData] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const saveToDownloads = async (data) => {
    // Request permissions to access the media library
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access media library was denied.');
      return;
    }

    const fileName = 'tableData.txt';
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;

    try {
      // Save data to a temporary file in the app's document directory
      await FileSystem.writeAsStringAsync(fileUri, data);

      // Move the file to the Downloads folder
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      const album = await MediaLibrary.getAlbumAsync('Download');

      if (album == null) {
        await MediaLibrary.createAlbumAsync('Download', asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }

      console.log('File saved successfully to the Downloads folder.');
    } catch (err) {
      console.error('Error saving file:', err);
    }
  };

  const exportTableData = () => {
    const data = tableData.map(row => `${row.key}: ${row.value}`).join('\n');
    saveToDownloads(data);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.title}>Dynamic Table Example</Text>
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
            <Text style={styles.cell}>{item.key}</Text>
            <Text style={styles.cell}>{item.value}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button title="Export Data to Downloads" onPress={exportTableData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
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
  cell: {
    flex: 1,
    textAlign: 'center',
  },
});
```
