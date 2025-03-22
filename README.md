# **npx create-expo-app@latest**
# **npx create-strapi-app@latest backend --quickstart**
# **fnm env --use-on-cd --shell powershell | Out-String | Invoke-Expression**
# **fnm use 22**


Building a Simple Banking App with React Native, Expo, and Strapi CMS - Simplified Authentication



Let's create a simplified authentication system with just username, password, and password confirmation for registration.



Project Overview



We'll build a simplified authentication system with:

User registration (username and password only)

User login

Logout functionality



Prerequisites



Node.js installed

Basic JavaScript knowledge

A code editor (like VS Code)



Part 1: Setting Up the Environment



1.1 Install Required Tools



# Install Expo CLI globally
npm install -g expo-cli

# Install Strapi CLI globally
npm install -g strapi



1.2 Create Project Structure



# Create and navigate to project folder
mkdir simple-banking-auth && cd simple-banking-auth

# Create frontend and backend folders
mkdir frontend backend



Part 2: Setting Up Strapi Backend



2.1 Initialize Strapi Project



cd backend
npx create-strapi-app@latest . --quickstart



This will create a new Strapi project and open the admin panel in your browser.



2.2 Configure User Permissions



After Strapi starts, create an admin account through the browser interface. Then:



Go to Settings > Users & Permissions Plugin > Roles

Select the "Public" role

In the Permissions tab, find "Users-Permissions"

Enable the following:

Auth: callback, register, login

Save your changes



Part 3: Setting Up React Native Frontend



3.1 Initialize Expo Project



cd ../frontend
npx create-expo-app .



3.2 Install Dependencies



npm install @react-navigation/native @react-navigation/stack
npm install react-native-screens react-native-safe-area-context
npm install axios @react-native-async-storage/async-storage
npm install react-native-paper
npm install react-native-gesture-handler



Part 4: Frontend Implementation



4.1 Set Up API Client for Authentication



Create src/api/authAPI.js:



import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Replace with your Strapi server address
const API_URL = 'http://192.168.1.X:1337'; // Change this to your IP address

// Create axios instance
const authAPI = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Login function
export const login = async (identifier, password) => {
  try {
    const response = await authAPI.post('/api/auth/local', {
      identifier,
      password,
    });
    
    // Store token and user data in AsyncStorage
    await AsyncStorage.setItem('jwt', response.data.jwt);
    await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Register function - simplified to just username and password
export const register = async (username, password) => {
  try {
    const response = await authAPI.post('/api/auth/local/register', {
      username,
      email: `${username}@example.com`, // Strapi requires an email, create a dummy one
      password,
    });
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default authAPI;



4.2 Create Authentication Context



Create src/context/AuthContext.js:



import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login, register } from '../api/authAPI';

// Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  // Login function
  const loginUser = async (username, password) => {
    try {
      setIsLoading(true);
      const response = await login(username, password);
      setUserToken(response.jwt);
      setUserInfo(response.user);
      setIsLoading(false);
      return response;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  // Register function - simplified
  const registerUser = async (username, password) => {
    try {
      setIsLoading(true);
      const response = await register(username, password);
      setIsLoading(false);
      return response;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    setUserToken(null);
    setUserInfo(null);
    await AsyncStorage.removeItem('jwt');
    await AsyncStorage.removeItem('user');
    setIsLoading(false);
  };

  // Check if user is logged in
  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('jwt');
      const user = await AsyncStorage.getItem('user');
      
      if (token) {
        setUserToken(token);
        setUserInfo(JSON.parse(user));
      }
      
      setIsLoading(false);
    } catch (error) {
      console.log(`isLoggedIn error: ${error}`);
      setIsLoading(false);
    }
  };

  // Check for stored authentication on app startup
  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userToken,
        userInfo,
        login: loginUser,
        register: registerUser,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};



4.3 Create Navigation



Create src/navigation/AppNavigator.js:



import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View } from 'react-native';

import { AuthContext } from '../context/AuthContext';

// Import screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { userToken, isLoading } = useContext(AuthContext);
  
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken === null ? (
          // Auth screens
          <>
            <Stack.Screen 
              name="Login" 
              component={LoginScreen} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="Register" 
              component={RegisterScreen} 
              options={{ title: 'Create Account' }}
            />
          </>
        ) : (
          // Home screen
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'Banking App' }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;



4.4 Create Authentication Screens



Create src/screens/LoginScreen.js:



import React, { useState, useContext } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useContext(AuthContext);

  const handleLogin = async () => {
    if (username === '' || password === '') {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    try {
      await login(username, password);
    } catch (error) {
      Alert.alert(
        'Login Error', 
        error.response?.data?.error?.message || 'An error occurred during login'
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Banking App</Text>
        <Text style={styles.subtitle}>Login to your account</Text>
      </View>
      
      <View style={styles.formContainer}>
        <TextInput
          label="Username"
          value={username}
          onChangeText={setUsername}
          mode="outlined"
          style={styles.input}
        />
        
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          style={styles.input}
          secureTextEntry
        />
        
        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.button}
          loading={isLoading}
          disabled={isLoading}
        >
          Login
        </Button>
        
        <Button
          mode="text"
          onPress={() => navigation.navigate('Register')}
          style={styles.linkButton}
        >
          Don't have an account? Register
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    paddingVertical: 5,
  },
  linkButton: {
    marginTop: 20,
  },
});

export default LoginScreen;



Create src/screens/RegisterScreen.js:



import React, { useState, useContext } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const { register, login, isLoading } = useContext(AuthContext);

  const handleRegister = async () => {
    // Simple validation
    if (username === '' || password === '' || confirmPassword === '') {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    
    try {
      // Register the user
      await register(username, password);
      Alert.alert(
        'Success', 
        'Account created successfully!',
        [
          { 
            text: 'Login Now', 
            onPress: async () => {
              try {
                // Auto login after registration
                await login(username, password);
              } catch (error) {
                navigation.navigate('Login');
              }
            } 
          }
        ]
      );
    } catch (error) {
      Alert.alert(
        'Registration Error', 
        error.response?.data?.error?.message || 'An error occurred during registration'
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          label="Username"
          value={username}
          onChangeText={setUsername}
          mode="outlined"
          style={styles.input}
        />
        
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          style={styles.input}
          secureTextEntry
        />
        
        <TextInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          mode="outlined"
          style={styles.input}
          secureTextEntry
        />
        
        <Button
          mode="contained"
          onPress={handleRegister}
          style={styles.button}
          loading={isLoading}
          disabled={isLoading}
        >
          Register
        </Button>
        
        <Button
          mode="text"
          onPress={() => navigation.navigate('Login')}
          style={styles.linkButton}
        >
          Already have an account? Login
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    padding: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    paddingVertical: 5,
  },
  linkButton: {
    marginTop: 20,
  },
});

export default RegisterScreen;



Create src/screens/HomeScreen.js:



import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';

const HomeScreen = () => {
  const { userInfo, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.welcomeText}>Welcome, {userInfo?.username}!</Text>
          <Text style={styles.infoText}>
            You have successfully logged in to the Banking App.
          </Text>
        </Card.Content>
      </Card>
      
      <Button 
        mode="contained" 
        onPress={logout}
        style={styles.logoutButton}
      >
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
  },
  logoutButton: {
    marginTop: 20,
  },
});

export default HomeScreen;



4.5 Update App.js



Update the main App.js file:



import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider>
        <StatusBar style="auto" />
        <AppNavigator />
      </PaperProvider>
    </AuthProvider>
  );
}



Part 5: Running the Application



5.1 Start the Strapi Backend



cd backend
npm run develop



5.2 Start the React Native App



cd frontend
npx expo start



Important Notes



IP Address: Make sure to replace http://192.168.1.X:1337 in authAPI.js with your actual local IP address when testing on physical devices.



Email Generation: Strapi requires an email for user registration. Our simplified approach automatically creates an email based on the username. In a real app, you might want to collect real email addresses.



Password Security: This example uses basic password validation. In a production app, you should implement stronger password requirements.



Conclusion



You've now implemented a simplified authentication system with just username and password for your banking app. This includes:



User registration with username and password

Username and password login

Authentication state persistence

Logout functionality



This provides a clean, beginner-friendly foundation for building your banking app in future lessons.
