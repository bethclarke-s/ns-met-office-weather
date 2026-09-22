import React, {useState} from 'react';
import { get_weather_from_postcode } from './weather.js'

function App(): React.ReactElement {

  interface WeatherForcast {
    time: string;
    temperature: number;
    weather_type: string;
    is_rainy: boolean;
  }

  const [postcode, setPostcode] = useState<string>("");
  const [tableData, setTableData] = useState<WeatherForcast[]>();
  
  async function getForecast(postcode: string): Promise<string> {
  
//    try {
      const weather_forecast = await get_weather_from_postcode(postcode);
      console.log(weather_forecast)
      //return `Success! The weather at ${postcode} at ${weather_forecast[0].time} is ${weather_forecast[0].weather_type}`;
      return weather_forecast
  /*  }
    catch {
      return "Invalid postcode! Please enter a postcode in the form 'XXX XXX'."
    }
  */
  }
  
  async function formHandler(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    
    event.preventDefault(); // to stop the form refreshing the page when it submits
    //const data = await getForecast(postcode);
    const data = [
      {time: '11:00', temperature: 19.99, weather_type: 'Sunny day', is_rainy: false},
      {time: '12:00', temperature: 21.67, weather_type: 'Sunny day', is_rainy: false},
      {time: '13:00', temperature: 22.69, weather_type: 'Partly cloudy (day)', is_rainy: false}
    ];
    setTableData(data);
    
  }
  
  function updatePostcode(data: React.ChangeEvent<HTMLInputElement>): void {
    
    setPostcode(data.target.value)
    
  }

  return <>
        <h1> Met Office Weather </h1>
        <form action="" onSubmit={formHandler}>
            <label htmlFor="postcodeInput"> Postcode: </label>
            <input type="text" id="postcodeInput" onChange={updatePostcode}/>
            <input type="submit" value="Submit"/>
        </form>
        {tableData && (
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
        )}
    </>;
}

export default App;
