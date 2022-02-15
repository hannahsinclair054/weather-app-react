import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import { Rings } from "react-loader-spinner";
import "bootstrap/dist/css/bootstrap.min.css";
export default function WeatherApp() {
  let [city, setCity] = useState("");
  let [info, setInfo] = useState({});
  let [done, setDone] = useState(false);
  //time
  function formateDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }

    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
  }

  function displayInfo(response) {
    setDone(true);
    setInfo({
      temperature: response.data.main.temp,
      date: formateDate(response.data.dt * 1000),
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: `https://raw.githubusercontent.com/hasankoroglu/OpenWeatherMap-Icons/master/icons/${response.data.weather[0].icon}%402x.png`,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "ee5487a7be65de8d31de587d4d02ac57";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayInfo);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }
  let form = (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="me-2 searchBar"
        type="text"
        placeholder="Enter a city"
        id="search-input"
        onChange={updateCity}
      />
      <input type="submit" value="Search" className="searchButton" />
    </form>
  );
  if (done) {
    return (
      <div className="container">
        <h1>Weather App</h1>
        {form}
        <section className="main">
          <section className="cityTemp">
            <h2 className="Location">{city}</h2>
            <img
              src={info.icon}
              alt={info.description}
              className="icon"
              width="110px"
              height="110px"
            />

            <p className="tempToday">
              <span className="todayTemp">{Math.round(info.temperature)}</span>
              <p className="tempUnitC">°C</p>
            </p>
          </section>

          <section className="info">
            <h3 className="date">{info.date}</h3>

            <p className="tempDescribe description">{info.description}</p>
          </section>

          <section className="right">
            <p>
              <span className="wind">
                {" "}
                Wind: <span className="wind">{Math.round(info.wind)}</span>
                <span className="windUnits">Km/h</span>
              </span>
              <br />
              <span className="humid">
                Humidity:{" "}
                <span className="humid">{Math.round(info.humidity)}</span>%
              </span>
              <br />
            </p>
          </section>
        </section>
        <p className="footer">Open-source code, by Hannah Sinclair</p>
      </div>
    );
  } else {
    return (
      <div className="container">
        <h1>Weather App</h1>
        {form}
        <section className="main">
          <Rings color="#d46456" height={300} width={600} />
        </section>
        <p className="footer">Open-source code , by Hannah Sinclair</p>
      </div>
    );
  }
}
