const { loadEnvFile } = require('node:process');
loadEnvFile('.env');

function get_longitude_latitude_from_user() {

    const readline = require('node:readline');

    const rl = readline.createInterface({input: process.stdin, output: process.stdout});

    rl.question('Welcome to the weather app! Please enter your longitude and latitude in the form (lon,lat): ', (location) => {

        const [longitude, latitude] = location.replaceAll("(","").replaceAll(")","").split(',');
        console.log(`You entered a longitude: ${longitude}, and latitude: ${latitude}`);

        rl.close();

    })

    return longitude, latitude

}

function get_weather_from_longitude_latitude(longitude, latitude) {

    const fetchData = async () => {
        try {
            const url = `https://data.hub.api.metoffice.gov.uk/sitespecific/v0/point/hourly?latitude=${longitude}&longitude=${latitude}`;
            const response = await fetch(url, {
                method: "GET",
                headers: {"apikey": process.env.API_KEY}
            });
            const responseJson = await response.json();
            console.log(responseJson)
        } catch (error) {
            console.error(error)
        } finally {
            console.log("Request complete")
        } 
}

fetchData()
}


//const [longitude, latitude] = get_longitude_latitude_from_user();
const [longitude, latitude] = [51.5539, -0.1446];
get_weather_from_longitude_latitude(longitude,latitude)