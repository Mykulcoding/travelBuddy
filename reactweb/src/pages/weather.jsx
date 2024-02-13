import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const Weather = () => {
  const [searchInput, setSearchInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null); // DDM: Added state for forecast data

  const handleSearch = async () => {
    try {
      // Add AccuWeather API key
      const apiKey = 'jupzrltU6u2x4erPATbWLgnXj8eKDe6T'; // DDM: Changed to AccuWeather API key
      const apiUrl = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${searchInput}`;

      // Make the API call to get location key
      const response = await fetch(apiUrl);
      const locationData = await response.json();
      const locationKey = locationData[0].Key;

      // Make the API call for current weather
      const weatherUrl = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}&details=true`;
      const weatherResponse = await fetch(weatherUrl);
      const currentWeatherData = await weatherResponse.json();

      // Make the API call for 5-day forecast
      const forecastUrl = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}&metric=true`;
      const forecastResponse = await fetch(forecastUrl);
      const forecastData = await forecastResponse.json();

      // Extract relevant weather information from the response
      const currentWeather = {
        city: locationData[0].LocalizedName,
        time: new Date().toLocaleTimeString(),
        temperature: Math.round(currentWeatherData[0].Temperature.Metric.Value),
        weatherText: currentWeatherData[0].WeatherText,
        wind: `${currentWeatherData[0].Wind.Speed.Metric.Value} m/s`,
        humidity: `${currentWeatherData[0].RelativeHumidity}%`,
      };

      // Extract relevant forecast information from the response
      const dailyForecasts = forecastData.DailyForecasts.map(day => ({
        date: new Date(day.Date).toLocaleDateString(),
        minTemperature: day.Temperature.Minimum.Value,
        maxTemperature: day.Temperature.Maximum.Value,
        dayWeatherText: day.Day.IconPhrase,
        nightWeatherText: day.Night.IconPhrase,
      }));

      setWeatherData(currentWeather);
      setForecastData(dailyForecasts);
    } catch (error) {
      console.error('Error during Weather API call:', error);
    }
  };

  return (
    <Container>
      {/* Search input and button */}
      <Row>
        <Col xs={6}>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Enter city..."
          />
        </Col>
        <Col xs={2}>
          <Button variant="primary" onClick={handleSearch}>
            <FaSearch />
          </Button>
        </Col>
      </Row>

      {/* Display current weather */}
      {weatherData && (
        <Row>
          <Col>
            <h2>Current Weather in {weatherData.city}:</h2>
            <p>City: {weatherData.city}</p>
            <p>Time: {weatherData.time}</p>
            <p>Temperature: {weatherData.temperature}°C</p>
            <p>Weather: {weatherData.weatherText}</p>
            <p>Wind: {weatherData.wind}</p>
            <p>Humidity: {weatherData.humidity}</p>
          </Col>
        </Row>
      )}

      {/* Display 5-day forecast */}
      {forecastData && (
        <Row>
          <Col>
            <h2>5-Day Forecast:</h2>
            {forecastData.map(day => (
              <div key={day.date}>
                <h3>{day.date}</h3>
                <p>Min Temperature: {day.minTemperature}°C</p>
                <p>Max Temperature: {day.maxTemperature}°C</p>
                <p>Day Weather: {day.dayWeatherText}</p>
                <p>Night Weather: {day.nightWeatherText}</p>
              </div>
            ))}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Weather;
