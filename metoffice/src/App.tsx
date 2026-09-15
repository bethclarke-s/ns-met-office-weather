import { useState } from 'react'
import { get_longitude_latitude_from_postcode } from './postcode_API.js'
import { generate_3_hour_weather_report_from_longitude_latitude } from './met_office_API.js'
import './App.css'

function App() {

  const [postcode, setPostcode] = useState("XXX XXX");

  const [weatherReport, setWeatherReport] = useState< string | null >(null);

  function handle_change(e){
    setPostcode(e.target.value);
  }

  async function handle_submit(e){
    e.preventDefault();
    const [longitude, latitude] = await get_longitude_latitude_from_postcode(postcode);
    const currentWeatherReport = await generate_3_hour_weather_report_from_longitude_latitude(longitude,latitude);
    setWeatherReport(currentWeatherReport);
  }

  return (
    <>
      <section id="center">
      <h1> Met Office Weather Report </h1>
      <form onSubmit={handle_submit}>
        <label>Enter your postcode:
          <input
            type="text"
            value={postcode}
            onChange={handle_change}
          />
        </label>
        <button type="submit">Find weather report</button>
      </form>
      {weatherReport && <p style={{ whiteSpace: 'pre-line' }}>{weatherReport}</p>}
      </section>

    </>
  )
}

export default App
