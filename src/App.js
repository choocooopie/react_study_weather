import { useEffect, useState, useCallback } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { WeatherBox } from './component/WeatherBox';
import { WeatherButton } from './component/WeatherButton';

function App() {
  const [weather, setWeather] = useState(null);
  const [background, setBackground] = useState('');
  const [loading, setLoading] = useState(true);
  const [weatherEffect, setWeatherEffect] = useState('');

  const getWeatherByCurrentLocation = useCallback(async (lat, lon) => {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=375c707608a269d1da6c1d8d8e7527ea&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setBackgroundImage(data.name);
    setEffectByWeather(data.weather[0].main);
    setLoading(false);
  }, []);

  const getCurrentLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  }, [getWeatherByCurrentLocation]);

  const getWeatherByCity = async (city) => {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=375c707608a269d1da6c1d8d8e7527ea&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setBackgroundImage(city);
    setEffectByWeather(data.weather[0].main);
    setLoading(false);
  };

  const setBackgroundImage = (city) => {
    switch (city.toLowerCase()) {
      case 'paris':
        setBackground('https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1470&q=80');
        break;
      case 'new york':
      case 'new york city':
        setBackground('https://images.unsplash.com/photo-1496588152823-86ff7695e68f?fm=jpg&q=60&w=3000');
        break;
      case 'seoul':
        setBackground('https://cdn.pixabay.com/photo/2022/09/16/17/07/city-7459162_640.jpg');
        break;
      case 'london':
        setBackground('https://images.unsplash.com/photo-1486299267070-83823f5448dd?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8JUVDJTk4JTgxJUVBJUI1JUFEJTIwJUVCJTlGJUIwJUVCJThEJTk4fGVufDB8fDB8fHww');
        break;
      default:
        setBackground('https://cdn.pixabay.com/photo/2018/10/10/10/59/sky-3736952_960_720.jpg');
        break;
    }
  };

  const setEffectByWeather = (mainWeather) => {
    switch (mainWeather.toLowerCase()) {
      case 'clear':
        setWeatherEffect('sunshine-effect');
        break;
      case 'clouds':
        setWeatherEffect('cloudy-effect');
        break;
      case 'rain':
      case 'drizzle':
        setWeatherEffect('rain-effect');
        break;
      default:
        setWeatherEffect('');
        break;
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  return (
    <div
      className={`app-background ${weatherEffect}`}
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
      }}
    >
      <div className="container">
        <div className="weather-icon-container">
          <img
            src="https://img.icons8.com/fluent/512/weather.png"
            alt="weather icon"
            className="weather-icon"
          />
          {weatherEffect === 'rain-effect' && <div className="rain" />}
        </div>

        {loading ? (
          <h2 style={{ color: 'white' }}>Loading...</h2>
        ) : (
          <>
            <WeatherBox weather={weather} />
            <WeatherButton
              getWeatherByCity={getWeatherByCity}
              getCurrentLocation={getCurrentLocation}
            />
          </>
        )}
      </div>
    </div>
  );
}


export default App;
