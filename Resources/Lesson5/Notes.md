npx expo install expo-camera

npm install react-native-qrcode-sv



## Config 

app.json 
```json
{
  "expo": {
    "plugins": [
      [
        "expo-camera",
        {
          "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera",
          "microphonePermission": "Allow $(PRODUCT_NAME) to access your microphone",
          "recordAudioAndroid": true
        }
      ]
    ]
  }
}
```


```javascript
// Import React and necessary React Native components
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
// Import the QRCode component from react-native-qrcode-svg
import QRCode from 'react-native-qrcode-svg';

export default function App() {
  // State variable for storing user input
  const [text, setText] = useState('');
  // State variable for storing the QR code value (initially set to a default URL)
  const [qrValue, setQrValue] = useState('https://example.com');

  // Function to update the QR code with the text input value
  const generateQR = () => {
    setQrValue(text);
  };

  return (
      // Main container with a dark background and centered content
      <View style={styles.container}>
        {/* App header */}
        <Text style={styles.header}>Dark QR Code Generator</Text>

        {/* QRCode component:
            - 'value' is the string to encode into the QR code.
            - 'size' determines the size of the QR code.
            - 'backgroundColor' and 'color' ensure the QR code fits the dark theme */}
        <QRCode
            value={qrValue || ' '}
            size={200}
            backgroundColor="#000"
            color="#fff"
        />

        {/* TextInput component:
            - Allows the user to input text.
            - 'placeholder' shows a guide when the field is empty.
            - 'placeholderTextColor' makes the placeholder visible against the dark background.
            - 'onChangeText' updates the text state as the user types */}
        <TextInput
            style={styles.input}
            placeholder="Enter text to encode"
            placeholderTextColor="#888"
            value={text}
            onChangeText={setText}
        />

        {/* Button component:
            - When pressed, it triggers the generateQR function to update the QR code */}
        <Button
            title="Generate QR Code"
            onPress={generateQR}
            color="#1E90FF" // Button color that complements the dark theme
        />
      </View>
  );
}

// Styling for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,                      // Fill the entire screen
    backgroundColor: '#121212',   // Dark background color for the dark theme
    alignItems: 'center',         // Center content horizontally
    justifyContent: 'center',     // Center content vertically
    padding: 20,                  // Padding around the container
  },
  header: {
    fontSize: 24,                 // Larger text for the header
    color: '#fff',                // White color for the header text
    marginBottom: 20,             // Spacing below the header
  },
  input: {
    width: '100%',                // Full width for the input field
    height: 50,                   // Fixed height for the input
    borderColor: '#444',          // Dark border color to match the theme
    borderWidth: 1,               // Border width
    borderRadius: 5,              // Rounded corners
    paddingHorizontal: 10,        // Horizontal padding inside the input
    color: '#fff',                // White text color for user input
    marginVertical: 15,           // Vertical spacing between components
    backgroundColor: '#222',      // Slightly lighter background for contrast
  },
});
```
