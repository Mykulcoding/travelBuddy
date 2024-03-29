import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import "./Weather.css";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import "../../assets/clouds.jpg";

const Weather = () => {
  const [searchInput, setSearchInput] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null); // DDM: Added state for forecast data

  const handleSearch = async () => {
    try {
      // Add AccuWeather API key
      const apiKey = "frFkwA1tTGrCJsK5JeH2hstr8dFdvhg8"; // DDM: Changed to AccuWeather API key
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
      const dailyForecasts = forecastData.DailyForecasts.map((day) => ({
        date: new Date(day.Date).toLocaleDateString(),
        minTemperature: day.Temperature.Minimum.Value,
        maxTemperature: day.Temperature.Maximum.Value,
        dayWeatherText: day.Day.IconPhrase,
        nightWeatherText: day.Night.IconPhrase,
      }));

      setWeatherData(currentWeather);
      setForecastData(dailyForecasts);
    } catch (error) {
      console.error("Error during Weather API call:", error);
    }
  };

  return (
    <Container>
      {/* Search input and button */}
      <Row className="my-5">
        <Col xs={12} md={6} lg={6} className="d-flex justify-content-end">
          <input
            className="searchbox"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Enter city..."
          />
        </Col>
        <Col xs={12} md={3} lg={2} className="d-flex align-items-center">
          <Button className="searchbtn" onClick={handleSearch}>
            <FaSearch />
          </Button>
        </Col>
        <Col xs={12} md={3} lg={2}></Col>
      </Row>

      {/* Display current weather */}
      {weatherData && (
        <Row className="my-4">
          <Col xs={12}>
            <h2 className="d-flex align-items-end justify-content-center mx-3 ">
              Current Weather in {weatherData.city}:
            </h2>
          </Col>
          <Col xs={12} lg={3} md={6} className="d-flex justify-content-center my-4 align-items-center mb-4">
            <Card className="mx-1 main-card-border">
              <Card.Body className="card-border main-card-content red-border green-bg">
                {/* Replaced <p> with <div> */}
                <div className="mx-auto">
                  City: <span className="bold-text">{weatherData.city}</span>
                </div>
                <div className="mx-auto">
                  Time: <span className="bold-text">{weatherData.time}</span>
                </div>
                <div className="mx-auto">
                  Temperature: <span className="bold-text">{weatherData.temperature}°C</span>
                </div>
                <div className="mx-auto">
                  Weather: <span className="bold-text">{weatherData.weatherText}</span>
                </div>
                <div className="mx-auto">
                  Wind: <span className="bold-text">{weatherData.wind}</span>
                </div>
                <div className="mx-auto">
                  Humidity: <span className="bold-text">{weatherData.humidity}</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Display 5-day forecast */}
      {forecastData && (
        <Row className="my-5 scroller">
          <Col xs={12}>
            <h2 className="d-flex justify-content-center my-5">
              5-Day Forecast:
            </h2>
          </Col>
          {forecastData.map((day, index) => (
            <Col key={index} xs={12} md={6} lg={4} className="mb-4">
              <Card className="mx-1 weather-card">
                <Card.Body className="card-border">
                  <Card.Title className="d-flex justify-content-center 5-day-date">
                    <h3>{day.date}</h3>
                  </Card.Title>
                  <Card.Text>
                    <p className="d-flex justify-content-center">
                      Min Temperature: {day.minTemperature}°C
                    </p>
                    <p className="d-flex justify-content-center">
                      Max Temperature: {day.maxTemperature}°C
                    </p>
                    <p className="d-flex justify-content-center">
                      Day Weather: {day.dayWeatherText}
                    </p>
                    <p className="d-flex justify-content-center">
                      Night Weather: {day.nightWeatherText}
                    </p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Weather;
