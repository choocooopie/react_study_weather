import React from 'react'

export const WeatherBox = ({weather}) => {
  return (
    <div className='weather-box'>
        <div>{weather?.name}</div>
        <h2>{weather?.main.temp}℃/ {(weather?.main.temp * 1.8 + 32).toFixed(2)}°F </h2>
        <h3>{weather?.weather[0].description}</h3>
    </div>
  )
}