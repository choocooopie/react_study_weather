import { useEffect } from 'react';
import './App.css';

function App() {
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation("현재 위치", lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (city, lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=375c707608a269d1da6c1d8d8e7527ea&units=metric`;
    try {
      let response = await fetch(url);
      let data = await response.json();
      console.log("data", data);
    } catch (error) {
      console.error("날씨 정보를 가져오는 데 실패했습니다:", error);
    }
  };

  useEffect(() => {
    getCurrentLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {/* 여기에 UI 요소들 들어갈 예정 */}
    </div>
  );
}

export default App;
