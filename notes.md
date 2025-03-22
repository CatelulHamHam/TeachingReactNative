### 1. **Basic Project Structure**

```javascript
/simple-banking-app
  /frontend
    /src
      /screens
        LoginScreen.js
        RegisterScreen.js
        HomeScreen.js
      /navigation
        AppNavigator.js
      /context
        AuthContext.js
      /api
        authAPI.js
    App.js
    package.json
```

### 2. **Key Dependencies (frontend/package.json)**

```json
{
  "dependencies": {
    "expo": "~49.0.0",
    "react-native": "0.72.0",
    "@react-navigation/native": "^6.1.0",
    "@react-navigation/stack": "^6.3.15",
    "react-native-paper": "5.x",
    "axios": "^1.4.0",
    "@react-native-async-storage/async-storage": "^1.17.11"
  }
}
```

### 3. **Simplified Auth API (authAPI.js)**

```javascript
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://YOUR_LOCAL_IP:1337';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/local`, {
      identifier: username,
      password,
    });
    
    await AsyncStorage.setItem('token', response.data.jwt);
    await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/local/register`, {
      username,
      email: `${username}@bankapp.com`, // Strapi requires email
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
```

### 4. **Auth Context (AuthContext.js)**

```javascript
import React, { createContext, useState, useEffect } from 'react';
import { login, register } from '../api/authAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkExistingUser();
  }, []);

  const checkExistingUser = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) setUser(JSON.parse(user));
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (username, password) => {
    const data = await login(username, password);
    setUser(data.user);
  };

  const handleRegister = async (username, password) => {
    await register(username, password);
    handleLogin(username, password);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### 5. **Login Screen (LoginScreen.js)**

```javascript
import React, { useState, useContext } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useContext(AuthContext);

  const handleSubmit = async () => {
    try {
      await login(username, password);
    } catch (error) {
      Alert.alert('Error', 'Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bank App</Text>
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        mode="outlined"
      />
      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={isLoading}
        style={styles.button}>
        Login
      </Button>
      <Button
        mode="text"
        onPress={() => navigation.navigate('Register')}
        style={styles.link}>
        Create Account
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#2196F3',
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    paddingVertical: 5,
  },
  link: {
    marginTop: 20,
  },
});

export default LoginScreen;
```

### 6. **App Navigation (AppNavigator.js)**

```javascript
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Account Overview' }}
          />
        ) : (
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
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

### 7. **Running the App**

```bash
# Start Expo development server
npx expo start

# Scan QR code with Expo Go app (Android)
# Press 'i' for iOS simulator or 'a' for Android emulator
```

### Key Features:

1. **Simple Authentication Flow**: Login/Register with just username/password
2. **State Management**: Context API for global state management
3. **Navigation**: Stack navigation between screens
4. **Persistence**: AsyncStorage for JWT token storage
5. **UI Components**: Using React Native Paper for Material Design components

For production, you should add:

- Form validation
- Error handling
- Loading states
- Secure storage for tokens
- Password strength requirements
- Confirmation dialogs

This setup provides a solid foundation to build your banking features on top of. The next steps would be adding account management and transaction features.
