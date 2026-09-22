import React, {useState, useEffect} from 'react';
import { get_region_and_weather_from_postcode } from '../backend/weather.js'
import './index.css'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

function Weather() {
    interface WeatherForcast {
    time: string;
    temperature: number;
    weather_type: string;
    is_rainy: boolean;
  }

  const [postcode, setPostcode] = useState<string>("");
  const [tableData, setTableData] = useState<WeatherForcast[]>();
  const [region, setRegion] = useState<string>()

  async function getForecast(postcode: string): Promise<string> {
  
//    try {
      const [region, weather_forecast] = await get_region_and_weather_from_postcode(postcode);
      console.log(region)
      //return `Success! The weather at ${postcode} at ${weather_forecast[0].time} is ${weather_forecast[0].weather_type}`;
      return [region,  weather_forecast]
  /*  }
    catch {
      return "Invalid postcode! Please enter a postcode in the form 'XXX XXX'."
    }
  */
  }
  
  async function formHandler(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    
    event.preventDefault(); // to stop the form refreshing the page when it submits
    const [region, weatherData] = await getForecast(postcode);
    /*const weatherData = [
      {time: '11:00', temperature: 19.99, weather_type: 'Sunny day', is_rainy: false},
      {time: '12:00', temperature: 21.67, weather_type: 'Sunny day', is_rainy: false},
      {time: '13:00', temperature: 22.69, weather_type: 'Partly cloudy (day)', is_rainy: false}
    ];
    const region = "Test Region";*/
    setTableData(weatherData);
    setRegion(region);
    
  }
  
  function updatePostcode(data: React.ChangeEvent<HTMLInputElement>): void {
    
    setPostcode(data.target.value)
    
  }

  useEffect(() => {

    if (!tableData) return; // the #map div isn't in the DOM until a forecast exists

    const map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    return () => map.remove();

  }, [tableData]);

  return <>
      <h1> Met Office Weather </h1>
        <form action="" onSubmit={formHandler}>
            <label htmlFor="postcodeInput"> Postcode: </label>
            <input type="text" id="postcodeInput" onChange={updatePostcode}/>
            <input type="submit" value="Submit"/>
        </form>
        {region && <h2>Weather forecast for {region}</h2>}
        {tableData && ( <>
          <table>
            <thead>
              <tr>
                <th> Time </th>
                <th> Temperature </th>
                <th> Weather </th>
              </tr>
            </thead>
            <tbody>
              {tableData?.map(row => (
                <tr key = {row.time}>
                  <td>{row.time}</td>
                  <td>{row.temperature}</td>
                  <td>{row.weather_type}</td>
                </tr>
              ))}
            </tbody>
        </table>
        <p> {tableData[0].is_rainy ? "Don't forget your umbrella ☔" : "Enjoy the sun! ☀️"}</p>
        <div id="map"></div>
        </>)}
  </>;
}


export default Weather;
