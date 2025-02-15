import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Home Screen Component
const HomeScreen = ({ navigation }) => (
    <View style={styles.container}>
        <Text style={styles.title}>Home Screen</Text>
        <Button
            title="Go to Details"
            onPress={() => navigation.navigate('Details')}
            color="#1E90FF"
        />
        <View style={styles.spacer} />
        <Button
            title="Go to Profile"
            onPress={() => navigation.navigate('Profile')}
            color="#1E90FF"
        />
    </View>
);

// Details Screen Component
const DetailsScreen = ({ navigation }) => (
    <View style={styles.container}>
        <Text style={styles.title}>Details Screen</Text>
        <Button
            title="Go Back"
            onPress={() => navigation.goBack()}
            color="#1E90FF"
        />
    </View>
);

// Profile Screen Component
const ProfileScreen = ({ navigation }) => (
    <View style={styles.container}>
        <Text style={styles.title}>Profile Screen</Text>
        <Button
            title="Go Back"
            onPress={() => navigation.goBack()}
            color="#1E90FF"
        />
    </View>
);

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer theme={DarkTheme}>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerStyle: { backgroundColor: '#121212' },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontWeight: 'bold' },
                }}
            >
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: 'Welcome Home' }}
                />
                <Stack.Screen
                    name="Details"
                    component={DetailsScreen}
                    options={{ title: 'Details' }}
                />
                <Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{ title: 'Profile' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212', // dark background
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 28,
        color: '#fff', // white text for contrast
        marginBottom: 20,
    },
    spacer: {
        height: 10,
    },
});
