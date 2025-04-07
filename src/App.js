import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { WeatherBox } from './component/WeatherBox';
import { WeatherButton } from './component/WeatherButton';

// 1. 앱이 실행 되자마자 현재 위치 기반의 날씨가 보인다.
// 2. 날씨 정보에는 도시, 섭씨, 화씨, 날씨 상태
// 3. 5개의 버튼이 있다. (1개는 현재 위치, 4개는 다른 도시)
// 4. 도시 버튼을 클릭할 때마다 도시별 날씨가 나온다.
// 5. 현재 위치 버튼을 누르면 다시 현재 위치 기반의 날씨가 나온다.
// 6. 데이터를 들고오는 동안 로딩 스피너가 된다.

function App() {
  const [weather, setWeather] = useState(null);
  const [background, setBackground] = useState('');

  const cityBackgrounds = {
    Paris: 'https://cdn.pixabay.com/photo/2017/03/27/14/56/eiffel-tower-2178577_960_720.jpg',
    'New York': 'https://cdn.pixabay.com/photo/2016/11/29/09/32/architecture-1868667_960_720.jpg',
    default: 'https://cdn.pixabay.com/photo/2018/10/10/10/59/sky-3736952_960_720.jpg',
  };

  const setBackgroundImage = (cityName) => {
    const formattedCity = cityName.toLowerCase();
    if (formattedCity.includes('paris')) {
      setBackground(cityBackgrounds.Paris);
    } else if (formattedCity.includes('new york') || formattedCity.includes('new york city')) {
      setBackground(cityBackgrounds['New York']);
    } else {
      setBackground(cityBackgrounds.default);
    }
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=375c707608a269d1da6c1d8d8e7527ea&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setBackgroundImage(data.name);
  };

  const getCurrentLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  }, []);

  const getWeatherByCity = async (city) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=375c707608a269d1da6c1d8d8e7527ea&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setBackgroundImage(data.name);
  };

  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  return (
    <div style={{ backgroundImage: `url(${background})` }} className="main-container">
      <div className="container">
        <WeatherBox weather={weather} />
        <WeatherButton getWeatherByCity={getWeatherByCity} getCurrentLocation={getCurrentLocation} />
      </div>
    </div>
  );
}

export default App;

