import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const Weather = () => {
  const [searchInput, setSearchInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = async () => {
    try {
      // Add OpenWeatherMap API key
      const apiKey = '';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=metric`;

      // Make the API call
      const response = await fetch(apiUrl);

      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`Weather API request failed: ${response.statusText}`);
      }

      // Parse the JSON response
      const data = await response.json();

      // Extract relevant weather information from the response
      const currentWeather = {
        city: data.name,
        time: new Date().toLocaleTimeString(),
        temperature: Math.round(data.main.temp),
        weatherText: data.weather[0].description,
        wind: `${data.wind.speed} m/s`,
        humidity: `${data.main.humidity}%`,
      };

      setWeatherData(currentWeather);
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

      {/* Add section for 5-day forecast here */}
    </Container>
  );
};

export default Weather;
