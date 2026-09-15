import { generate_3_hour_weather_report_from_longitude_latitude } from './metoffice/src/met_office_API.js';
import { get_longitude_latitude_from_postcode } from './metoffice/src/postcode_API.js';
import * as readline from 'node:readline';
 
async function get_longitude_latitude_from_user() {

    const rl = readline.createInterface({input: process.stdin, output: process.stdout});

    return new Promise((resolve) => {

        rl.question('Welcome to the weather app! Please enter your postcode:', async (postcode) => {

            const [longitude, latitude] = await get_longitude_latitude_from_postcode(postcode);

            rl.close();

            resolve([longitude, latitude]);

        })

    });

}

async function main() {
    
    const [longitude, latitude] = await get_longitude_latitude_from_user();

    generate_3_hour_weather_report_from_longitude_latitude(longitude, latitude);
}

main();
