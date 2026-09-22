import { get_weather_forecast_from_longitude_latitude } from './met_office_API.js';
import { get_longitude_latitude_and_constituency_from_postcode } from './postcode_API.js';
 
async function get_region_and_weather_from_postcode(postcode) {
    
    const [longitude, latitude, region] = await get_longitude_latitude_and_constituency_from_postcode(postcode);
    const weather_forecast = await get_weather_forecast_from_longitude_latitude(longitude, latitude);
    return [region, weather_forecast]

}

export { get_region_and_weather_from_postcode }

