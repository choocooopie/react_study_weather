import { useEffect, useState, useCallback } from 'react';
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

  const getCurrentLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  }, []);

  const getWeatherByCurrentLocation = async(lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=375c707608a269d1da6c1d8d8e7527ea&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setBackgroundImage(data.name);
  }

  const getWeatherByCity = async (city) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=375c707608a269d1da6c1d8d8e7527ea&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setBackgroundImage(city);
  }

  const setBackgroundImage = (city) => {
    switch (city.toLowerCase()) {
      case 'paris':
        setBackground('https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1470&q=80');
        break;
      case 'new york':
      case 'new york city':
        setBackground('https://images.unsplash.com/photo-1496588152823-86ff7695e68f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fCVFQiU4OSVCNCVFQyU5QSU5NSVFQyU4QiU5QyUyMCVFQiVCMCVCMCVFQSVCMiVCRCVFRCU5OSU5NCVFQiVBOSVCNHxlbnwwfHwwfHx8MA%3D%3D');
        break;
      case 'seoul':
        setBackground('https://cdn.pixabay.com/photo/2022/09/16/17/07/city-7459162_640.jpg');
        break;
      case 'london':
        setBackground('https://img.freepik.com/free-photo/big-ben-westminster-bridge-sunset-london-uk_268835-1395.jpg');
        break;
      default:
        setBackground('https://cdn.pixabay.com/photo/2018/10/10/10/59/sky-3736952_960_720.jpg');
        break;
    }
  }

  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  return (
    <div 
      className="app-background" 
      style={{ 
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh'
      }}
    >
      <div className='container'>
        <WeatherBox weather={weather} />
        <WeatherButton 
          getWeatherByCity={getWeatherByCity} 
          getCurrentLocation={getCurrentLocation} 
        />
      </div>
    </div>
  );
}

export default App;
