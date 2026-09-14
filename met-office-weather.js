function get_longitude_latitude_from_user() {

    const readline = require('node:readline');

    const rl = readline.createInterface({input: process.stdin, output: process.stdout});

    rl.question('Welcome to the weather app! Please enter your longitude and latitude in the form (lon,lat): ', (location) => {

        const [longitude, latitude] = location.replaceAll("(","").replaceAll(")","").split(',');
        console.log(`You entered a longitude: ${longitude}, and latitude: ${latitude}`);

        rl.close();

    })

}


get_longitude_latitude_from_user();