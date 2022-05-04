import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {

  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    async function getRes() {
      const res = await fetch(
        "http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=e94c588742caca5ba8d6eac31c169521"
      );
      const data = await res.json();
      setWeatherData(data)
    }
    getRes()
  }, []);

  return (
    <div className="App">
      <pre>{JSON.stringify(weatherData, null, 4)}</pre>
    </div>
  );
}

export default App;
