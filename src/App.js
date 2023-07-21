import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css";

const App = () => {
  const [weather, setWeather] = useState();
  const [name, setName] = useState();
  const [feels_like, setFeelsLike] = useState();
  const [humidity, setHumidity] = useState();
  const [loading, setLoading] = useState(true); // Add a loading state

  const api_key = '75d97d35ae146396198e702cd8a0165a';

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=metric`)
        .then((response) => {
          setName(response.data.name);
          setWeather(Math.floor(Math.round(response.data.main.temp)));
          setFeelsLike(Math.floor(Math.round(response.data.main.feels_like)));
          setHumidity(Math.floor(Math.round(response.data.main.humidity)));
          setLoading(false); // Set loading to false when data is fetched
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
          setLoading(false); // Set loading to false in case of an error
        });
    });
  }, []);

  // Show the loading screen while waiting for the API response
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='weather_card'>
      <div className='weather_main'>
        <p className='weather_name'>
          {name}
        </p>
        <i className="fa-solid fa-cloud weather_icon"></i>
      </div>
      <p className='weather_temp'>
        {weather} °C
      </p>
      {weather !== feels_like &&
        <p className='weather_feelslike'>Feels like: {feels_like} °C</p>
      }
      <p className='weather_humidity'>Humidity: {humidity} %</p>
    </div>
  );
};

export default App;
