import React from 'react'
import { Button } from 'react-bootstrap';

export const WeatherButton = ({ getWeatherByCity, getCurrentLocation }) => {
  return (
    <div>
        <Button variant="dark" onClick={getCurrentLocation}>Current Location</Button>
        <Button variant="dark" onClick={() => getWeatherByCity("Seoul")}>Seoul</Button>
        <Button variant="dark" onClick={() => getWeatherByCity("Paris")}>Paris</Button>
        <Button variant="dark" onClick={() => getWeatherByCity("London")}>London</Button>
        <Button variant="dark" onClick={() => getWeatherByCity("New York")}>New york</Button>
    </div>
  )
}