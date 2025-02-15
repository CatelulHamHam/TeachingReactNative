import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Import screens from separate files
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createMaterialTopTabNavigator();

export default function App() {
    return (
        <NavigationContainer theme={DarkTheme}>
            <Tab.Navigator
                initialRouteName="Home"
                tabBarPosition="bottom" // Place the tab bar at the bottom
                screenOptions={{
                    swipeEnabled: true, // Enable swipe gestures between screens
                    tabBarStyle: { backgroundColor: '#121212' },
                    tabBarActiveTintColor: '#1E90FF',
                    tabBarInactiveTintColor: '#fff',
                    tabBarIndicatorStyle: { backgroundColor: '#1E90FF' },
                    tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
                }}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Search" component={SearchScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
