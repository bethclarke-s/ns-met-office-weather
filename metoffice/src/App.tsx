import React, {useState} from 'react';
import { get_weather_from_postcode } from './weather.js'

function App(): React.ReactElement {

  const [postcode, setPostcode] = useState<string>("");
  const [tableData, setTableData] = useState<string>("");
  
  async function getForecast(postcode: string): Promise<string> {
  
    try {
      const weather_forecast = await get_weather_from_postcode(postcode);
      console.log(weather_forecast)
      return `Success! The weather at ${postcode} at ${weather_forecast[0].time} is ${weather_forecast[0].weather_type}`;
    }
    catch {
      return "Invalid postcode! Please enter a postcode in the form 'XXX XXX'."
    }
  
  }
  
  async function formHandler(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    
    event.preventDefault(); // to stop the form refreshing the page when it submits
    const data = await getForecast(postcode);
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
        {JSON.stringify(tableData, null, 4) /* this will just render the string - try creating a table 'dynamically'! */}
    </>;
}

export default App;
