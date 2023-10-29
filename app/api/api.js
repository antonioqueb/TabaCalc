import axios from 'axios';

const API_URL = 'https://api.openweathermap.org/data/2.5/weather'; // Corregí la versión de la API
const API_KEY = 'e546b4109a76115a454d0f01cbf2fae2';

export const getWeatherData = async (lat, lon, lang = 'en') => {
    try {
        const response = await axios.get(API_URL, {
            params: {
                lat: lat,
                lon: lon,
                appid: API_KEY,
                units: 'metric',
                lang: lang
            }
        });
        return response.data;
    } catch (error) {
        console.error("API error:", error.response ? error.response.data : error.message);
        throw new Error('Error fetching weather data');
    }
}

export const getSunriseAndSunset = async (lat, lon, lang = 'es') => { // Cambiado a lat y lon
    try {
        const response = await getWeatherData(lat, lon, lang); // Ajustado a lat y lon
        const sunrise = response.sys.sunrise * 1000;
        const sunset = response.sys.sunset * 1000;
        const now = Date.now();
        const isNight = now < sunrise || now > sunset;
        return {
            ...response,
            isNight
        };
    } catch (error) {
        throw new Error('Error fetching sunrise and sunset data');
    }
}
