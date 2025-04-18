import * as Location from 'expo-location';

export const getterLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return null;
    }
    return await Location.getCurrentPositionAsync({});
};
