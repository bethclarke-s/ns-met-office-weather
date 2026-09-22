import { get_weather_forecast_from_longitude_latitude } from './met_office_API.js';
import { get_longitude_latitude_from_postcode } from './postcode_API.js';
 
async function get_weather_from_postcode(postcode) {
    
    const [longitude, latitude] = await get_longitude_latitude_from_postcode(postcode);
    const weather_forecast = await get_weather_forecast_from_longitude_latitude(longitude, latitude);
    return weather_forecast

}

async function main() {
    
    const weather_forecast = await get_weather_from_postcode('NW5 1TL');
    console.log(weather_forecast);

}

main()

