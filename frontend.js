import { generate_3_hour_weather_report_from_longitude_latitude } from './met_office_API.js';
import { get_longitude_latitude_from_postcode } from './postcode_API.js';
import * as readline from 'node:readline';
 
function get_longitude_latitude_from_user() {

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

async function main() {
    
    const [longitude, latitude] = await get_longitude_latitude_from_postcode('NW51TL'); // TODO: Make postcode a choice open to user
//    const [longitude, latitude] = await get_longitude_latitude_from_user();
    //const [longitude, latitude] = [51.5539, -0.1446];
    generate_3_hour_weather_report_from_longitude_latitude(longitude, latitude); // From met_office_API.js

}

main();
