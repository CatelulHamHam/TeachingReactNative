import axios from 'axios';
import { API_KEY } from '@env';
console.log('API Key:', API_KEY);

export const getWeather = async (lat, lon) => {
    try {
        console.log('Lat lon:', lat, lon);
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        return response.data;
    } catch (error) {
        console.log('Lat lon:', lat, lon);
        console.error('Error fetching weather:', error);
    }
    console.log('Lat lon:', lat, lon);
};