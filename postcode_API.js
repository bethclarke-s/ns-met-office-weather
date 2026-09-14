async function make_postcode_API_call(postcode){
    try {
        const url = `https://api.postcodes.io/postcodes/${postcode}`;
        const response = await fetch(url, {
            method: "GET"
        });
        const responseJson = await response.json();

        return responseJson;
        
    } catch (error) {
        console.error(error)
    } finally {
        console.log("Request complete")
    } 
}

async function get_longitude_latitude_from_postcode(postcode){

    const API_response = await make_postcode_API_call(postcode);
    
    return [API_response.result.longitude,API_response.result.latitude]
}


module.exports = { get_longitude_latitude_from_postcode };
