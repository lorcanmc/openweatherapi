import "./App.css";
import { useEffect, useState } from "react";

const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [latLon, setLatLon] = useState(null);
  const [location, setLocation] = useState("nuuk");
  console.log(location, latLon, weatherData);

  useEffect(() => {
    async function getWeatherData() {
      if (location === null) return;
      const geoRes = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`
      );
      const geoData = await geoRes.json();

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${geoData[0].lat}&lon=${geoData[0].lon}&appid=${apiKey}`
      );
      const data = await res.json();
      setWeatherData(data);
    }
    getWeatherData();
  }, [location]);

  if (weatherData === null) return <p>Loading</p>;

  return (
    <div className="App">
      <h1>{location[0].toUpperCase() + location.slice(1)}</h1>
      <h2>{weatherData.weather[0].main}</h2>
      <h2>temp: <span style={{color: (weatherData.main.temp - 273.15 > 0) ? "red" : "orange"}}>{Math.round(weatherData.main.temp - 273.15)}</span></h2>
      <p>wind: {Math.round(weatherData.wind.speed)}mph</p>
    </div>
  );
}

export default App;
