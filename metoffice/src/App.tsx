import { useState } from 'react'
import { get_longitude_latitude_from_postcode } from './postcode_API.js'
import './App.css'

function App() {

  const [postcode, setPostcode] = useState("XXX XXX");

  const [coordinates, setCoordinates] = useState<{ longitude: number; latitude: number } | null>(null);

  function handle_change(e){
    setPostcode(e.target.value);
  }

  async function handle_submit(e){
    e.preventDefault();
    const [longitude, latitude] = await get_longitude_latitude_from_postcode(postcode);
    setCoordinates({ longitude, latitude });
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
        <button type="submit">Find Longitude and latitude</button>
        {coordinates && (
          <p>Longitude: {coordinates.longitude}, Latitude: {coordinates.latitude}</p>
        )}
      </form>
      </section>

    </>
  )
}

export default App
