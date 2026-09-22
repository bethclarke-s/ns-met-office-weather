import { loadEnvFile } from "node:process";
loadEnvFile('.env');

function get_weather_type_from_significant_weather_code(code) {
    
    const weather_types = new Map([
        ["NA", "Not available"],
        ["-1", "Trace rain"],
        ["0", "Clear night"],
        ["1", "Sunny day"],
        ["2", "Partly cloudy (night)"],
        ["3", "Partly cloudy (day)"],
        ["4", "Not used"],
        ["5", "Mist"],
        ["6", "Fog"],
        ["7", "Cloudy"],
        ["8", "Overcast"],
        ["9", "Light rain shower (night)"],
        ["10", "Light rain shower (day)"],
        ["11", "Drizzle"],
        ["12", "Light rain"],
        ["13", "Heavy rain shower (night)"],
        ["14", "Heavy rain shower (day)"],
        ["15", "Heavy rain"],
        ["16", "Sleet shower (night)"],
        ["17", "Sleet shower (day)"],
        ["18", "Sleet"],
        ["19", "Hail shower (night)"],
        ["20", "Hail shower (day)"],
        ["21", "Hail"],
        ["22", "Light snow shower (night)"],
        ["23", "Light snow shower (day)"],
        ["24", "Light snow"],
        ["25", "Heavy snow shower (night)"],
        ["26", "Heavy snow shower (day)"],
        ["27", "Heavy snow"],
        ["28", "Thunder shower (night)"],
        ["29", "Thunder shower (day)"],
        ["30", "Thunder"]
    ]);
    
    const weather_code = code.toString();
    
    return weather_types.get(weather_code)
}

function get_time_from_hourly_data(data) {
    
    const dateAndTime = data.time;
    const time = dateAndTime.substr(11,5);
    return time;
    
}

function get_hourly_data_from_API_response(response, hour) {

    return response.features[0].properties.timeSeries[hour - 1];

}

function build_hourly_weather_summary_from_API_response(response, hour) {

    hour = hour + 3; // API response returns forecast from 3 hours in the past
    const hourlyData = get_hourly_data_from_API_response(response, hour);
    const time = get_time_from_hourly_data(hourlyData);
    const temperature = hourlyData.feelsLikeTemperature;
    const weather_type = get_weather_type_from_significant_weather_code(hourlyData.significantWeatherCode);
    const is_rainy = weather_type.includes('rain');
    
    return { time, temperature, weather_type, is_rainy };
}

function get_weather_forecast_from_API_response(response) {
    
    const hours_to_display = 3;
    let weather_forecast = [];

    for (let hour = 0; hour < hours_to_display; hour++) {
        weather_forecast.push(build_hourly_weather_summary_from_API_response(response, hour));
    }

    return weather_forecast
}

async function make_met_office_API_call(longitude, latitude) {

    try {
        const url = `https://data.hub.api.metoffice.gov.uk/sitespecific/v0/point/hourly?latitude=${latitude}&longitude=${longitude}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {"apikey": process.env.API_KEY}//import.meta.env.API_KEY}
        });
        const responseJson = await response.json();
        return responseJson;  
    } catch (error) {
        console.error(error)
    } finally {
        console.log("Request complete")
    }
    
}

async function get_weather_forecast_from_longitude_latitude(longitude, latitude) {
    
    const API_response = await make_met_office_API_call(longitude, latitude);
    const weather_forecast = get_weather_forecast_from_API_response(API_response);
    return weather_forecast

}

export { get_weather_forecast_from_longitude_latitude };