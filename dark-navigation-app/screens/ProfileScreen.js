import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile Screen</Text>
            <Image
                style={styles.image}
                source={{ uri: 'https://loremflickr.com/320/240/cat' }}
            />
            <Text style={styles.text}>This is your profile.</Text>
            <Text style={styles.text}>Name: Alex Johnson</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        color: '#fff',
        marginBottom: 10,
    },
    text: {
        fontSize: 18,
        color: '#fff',
    },
    image: {
        width: 300,
        height: 200,
        marginVertical: 10,
    },
});
