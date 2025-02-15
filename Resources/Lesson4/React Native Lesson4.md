# Detailed Lesson: Building an Instagram-Style Navigation App with Random Kitty Images

In this lesson, you'll build a dark-themed React Native app using Expo and React Navigation. The app has three screens—Home, Search, and Profile—which display a random cat image from LoremFlickr by appending a random query parameter. Detailed inline comments are provided for each part of the code.

---

## File: screens/HomeScreen.js

```javascript
// Import React library to define components
import React from 'react';
// Import necessary components from React Native for UI rendering and styling
import { StyleSheet, View, Text, Image } from 'react-native';

// Define and export the HomeScreen component
export default function HomeScreen() {
  // Generate a random number (0 to 999) to ensure a unique image URL on every render
  const randomNumber = Math.floor(Math.random() * 1000);
  // Construct the image URL using the random number as a query parameter to bypass caching
  const imageUri = `https://loremflickr.com/320/240/cat?random=${randomNumber}`;

  // Return the UI structure of HomeScreen
  return (
    // Outer container that centralizes content
    <View style={styles.container}>
      {/* Title text for the Home screen */}
      <Text style={styles.title}>Home Screen</Text>
      {/* Image component displaying a random cat from LoremFlickr */}
      <Image 
        style={styles.image}           // Apply styles to set dimensions and margins
        source={{ uri: imageUri }}      // Use the constructed URL as the image source
      />
      {/* Descriptive text below the image */}
      <Text style={styles.text}>Welcome to the home page!</Text>
      <Text style={styles.text}>Name: John Doe</Text>
    </View>
  );
}

// Create a StyleSheet for component styling
const styles = StyleSheet.create({
  container: {
    flex: 1,                      // Take full height of the device screen
    backgroundColor: '#121212',   // Dark background for a modern aesthetic
    alignItems: 'center',         // Center child elements horizontally
    justifyContent: 'center',     // Center child elements vertically
  },
  title: {
    fontSize: 28,                // Large font size for clear heading
    color: '#fff',               // White color to stand out against the dark background
    marginBottom: 10,            // Space between the title and the image
  },
  text: {
    fontSize: 18,                // Standard text size for additional information
    color: '#fff',               // White text for readability on a dark background
  },
  image: {
    width: 320,                  // Fixed width matching the LoremFlickr URL dimensions
    height: 240,                 // Fixed height to maintain aspect ratio
    marginVertical: 10,          // Vertical spacing around the image
  },
});
```

---

## File: screens/SearchScreen.js

```javascript
// Import React and essential components from React Native
import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

// Define and export the SearchScreen component
export default function SearchScreen() {
  // Generate a random number to ensure each render shows a unique cat image
  const randomNumber = Math.floor(Math.random() * 1000);
  // Build the image URL using the random number as a query parameter
  const imageUri = `https://loremflickr.com/320/240/cat?random=${randomNumber}`;

  // Return the UI structure for SearchScreen
  return (
    <View style={styles.container}>
      {/* Header text specific to the Search screen */}
      <Text style={styles.title}>Search Screen</Text>
      {/* Image component displaying a random cat image */}
      <Image 
        style={styles.image}
        source={{ uri: imageUri }}
      />
      {/* Informational text for the Search screen */}
      <Text style={styles.text}>Find interesting content here!</Text>
      <Text style={styles.text}>Name: Jane Smith</Text>
    </View>
  );
}

// Define styles; similar to HomeScreen to maintain consistency
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',  // Same dark background for uniformity
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,              // Consistent large heading font
    color: '#fff',             // White text for clarity
    marginBottom: 10,          // Spacing between header and image
  },
  text: {
    fontSize: 18,              // Standard size for content text
    color: '#fff',             // White color for readability
  },
  image: {
    width: 320,                // Matches the URL dimensions
    height: 240,               // Maintains image aspect ratio
    marginVertical: 10,        // Provides spacing around the image
  },
});
```

---

## File: screens/ProfileScreen.js

```javascript
// Import necessary libraries and components for UI rendering
import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

// Define and export the ProfileScreen component
export default function ProfileScreen() {
  // Generate a random number to force unique cat image URL each time
  const randomNumber = Math.floor(Math.random() * 1000);
  // Build the image URL with the random number appended as a query parameter
  const imageUri = `https://loremflickr.com/320/240/cat?random=${randomNumber}`;

  // Return the UI structure for the Profile screen
  return (
    <View style={styles.container}>
      {/* Title indicating this is the Profile screen */}
      <Text style={styles.title}>Profile Screen</Text>
      {/* Display a random cat image */}
      <Image 
        style={styles.image}
        source={{ uri: imageUri }}
      />
      {/* Additional descriptive text for the profile */}
      <Text style={styles.text}>This is your profile.</Text>
      <Text style={styles.text}>Name: Alex Johnson</Text>
    </View>
  );
}

// Define a consistent StyleSheet for the Profile screen
const styles = StyleSheet.create({
  container: {
    flex: 1,                    // Occupies the full screen height
    backgroundColor: '#121212', // Dark background for a cohesive look
    alignItems: 'center',       // Centers content horizontally
    justifyContent: 'center',   // Centers content vertically
  },
  title: {
    fontSize: 28,              // Large heading for the screen title
    color: '#fff',             // White text color to contrast with the dark background
    marginBottom: 10,          // Provides space below the title
  },
  text: {
    fontSize: 18,              // Standard font size for detailed text
    color: '#fff',             // White for clear readability
  },
  image: {
    width: 320,                // Fixed width for the image matching the URL dimensions
    height: 240,               // Fixed height for proper aspect ratio
    marginVertical: 10,        // Vertical margin for spacing between elements
  },
});
```

---

## File: App.js

```javascript
// Import React to define our main App component
import React from 'react';
// Import NavigationContainer and DarkTheme to set up navigation and a dark appearance
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
// Import createMaterialTopTabNavigator to create a swipe-enabled tab navigator
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Import the three screen components from the screens folder
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import ProfileScreen from './screens/ProfileScreen';

// Create an instance of the Material Top Tab Navigator
const Tab = createMaterialTopTabNavigator();

// Define the main App component as the default export
export default function App() {
  return (
    // NavigationContainer provides the navigation context and applies the dark theme
    <NavigationContainer theme={DarkTheme}>
      {/* Configure the tab navigator */}
      <Tab.Navigator
        initialRouteName="Home"            // Set the initial screen to Home
        tabBarPosition="bottom"            // Position the tab bar at the bottom for an Instagram-like feel
        screenOptions={{
          swipeEnabled: true,             // Enable swipe gestures to switch between screens
          tabBarStyle: { backgroundColor: '#121212' },  // Style the tab bar to match our dark theme
          tabBarActiveTintColor: '#1E90FF', // Blue color for the active tab label
          tabBarInactiveTintColor: '#fff',  // White color for inactive tab labels
          tabBarIndicatorStyle: { backgroundColor: '#1E90FF' }, // Underline style for the active tab indicator
          tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' }, // Font styling for tab labels
        }}
      >
        {/* Define the routes and associate them with their corresponding components */}
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

**Explanation of Key Parts in App.js:**

- **NavigationContainer:**  
  Wraps the navigator and manages the navigation tree. The `DarkTheme` prop applies a consistent dark appearance.

- **Tab.Navigator:**  
  Configures the tab navigator's behavior (such as swipe gestures and position) and visual styling (colors, font styles).

- **Tab.Screen:**  
  Each `<Tab.Screen>` specifies a route name and the component to render. This connects your separate screen files to the navigation structure.

---

## Running the App

1. **Ensure all files are saved.**
2. **Start the Expo development server:**

   ```bash
   npx expo start/
   npx expo start --tunnel
   ```

3. **Open the app in the Expo Go app on your device or in an emulator.**  
   You should see a dark-themed interface with a bottom tab navigator. Swiping between Home, Search, and Profile will display different random kitty images along with the corresponding text.

---

## Conclusion

In this lesson, you learned:
- How to set up an Expo project and install necessary dependencies.
- How to create separate screen files that display a random kitty image using LoremFlickr with a random query parameter.
- How to configure a Material Top Tab Navigator (positioned at the bottom) in App.js.
- Detailed inline comments explain each line so you understand the purpose behind every piece of code.

Feel free to further experiment with styles, add more functionality, or extend the app with additional screens. Happy coding!
