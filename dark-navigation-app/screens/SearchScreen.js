import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export default function SearchScreen() {
    const randomNumber = Math.floor(Math.random() * 1000);
    const imageUri = `https://loremflickr.com/320/200/cat?random=${randomNumber}`;
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Search Screen</Text>
            <Image
                style={styles.image}
                source={{ uri: imageUri }}
            />
            <Text style={styles.text}>Find interesting content here!</Text>
            <Text style={styles.text}>Name: Jane Smith</Text>
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
