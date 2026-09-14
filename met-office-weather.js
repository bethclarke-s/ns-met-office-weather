const { loadEnvFile } = require('node:process');
loadEnvFile('.env');

function get_longitude_latitude_from_user() {

    const readline = require('node:readline');

    const rl = readline.createInterface({input: process.stdin, output: process.stdout});

    return new Promise((resolve) => {

        rl.question('Welcome to the weather app! Please enter your longitude and latitude in the form (lon,lat): ', (location) => {

            const [longitude, latitude] = location.replaceAll("(","").replaceAll(")","").split(',');
            console.log(`You entered a longitude: ${longitude}, and latitude: ${latitude}`);

            rl.close();

            resolve([longitude, latitude]);

        })

    });

}

function get_hourly_data_from_API_response(response, hour){

    return response.features[0].properties.timeSeries[hour - 1];

}

function determine_weather_type_from_hourly_data(data) {

    const tol = 1;
    const windy_tol = 10; // TODO: set this to something more reasonable

    if (data.totalSnowAmount > tol){
        return 'snowing';
    } else if (data.precipitationRate > tol){
        return 'raining';
    } else if (data.windGustSpeed10m > windy_tol){
        return 'windy';
    } else {
        return 'sunny';
    }

}

function get_time_from_hourly_data(data){

    const dateAndTime = data.time;
    const time = dateAndTime.substr(11,5);
    return time;

}

function print_hourly_weather_report_from_API_response(response, hour) {

    const hourlyData = get_hourly_data_from_API_response(response, hour);

    const time = get_time_from_hourly_data(hourlyData);
    const temperature = hourlyData.feelsLikeTemperature;
    const weather_type = determine_weather_type_from_hourly_data(hourlyData);
        
    console.log(`At ${time}, the temperature will feel like ${temperature}C and it will be ${weather_type}. `)
        
    if (weather_type === 'raining') {
        console.log('Bring an umbrella!')
    }
}

function generate_3_hour_weather_report_from_API_response(response){

    const hoursToDisplay = 3;

    for (let hour = 1; hour <= hoursToDisplay; hour++) {
        
        print_hourly_weather_report_from_API_response(response,hour);

    }

}

async function make_API_call(longitude, latitude){
    try {
        const url = `https://data.hub.api.metoffice.gov.uk/sitespecific/v0/point/hourly?latitude=${longitude}&longitude=${latitude}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {"apikey": process.env.API_KEY}
        });
        const responseJson = await response.json();

        return responseJson;
        
    } catch (error) {
        console.error(error)
    } finally {
        console.log("Request complete")
    } 
}


async function main() {
    const [longitude, latitude] = await get_longitude_latitude_from_user();
    //const [longitude, latitude] = [51.5539, -0.1446];
    const API_response = await make_API_call(longitude, latitude);
    generate_3_hour_weather_report_from_API_response(API_response)
}

main();
