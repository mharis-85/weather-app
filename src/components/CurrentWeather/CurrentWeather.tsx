import React from "react";
import { CurrentWeatherModel, SettingsModel } from "../../models";
import "./CurrentWeather.scss";

type CurrentWeatherProps = {
  settings: SettingsModel;
  data: CurrentWeatherModel;
};

export const CurrentWeather = ({ settings, data }: CurrentWeatherProps) => {
  const weatherCode =
    data.weather.icon !== ""
      ? settings.theme === "dark"
        ? `${data.weather.icon}_n`
        : `${data.weather.icon}`
      : "01d";
  const unitSymbol = settings.unit === "metric" ? "C" : "F";
  return (
    <div className="current-weather">
      <div className="image">
        <img
          src={require(`../../assets/icon_${weatherCode}.png`)}
          className="icon"
          alt=""
        />
      </div>
      <div className="details">
        <label className="temp">
          {unitSymbol === "C"
            ? Math.round(data.temp)
            : Math.round((data.temp * 9) / 5) + 32}
          °<span>{unitSymbol}</span>
        </label>
        <label className="feelslike">
          Feels like:{" "}
          <span>
            {" "}
            {unitSymbol === "C"
              ? Math.round(data.feels_like)
              : Math.round((data.feels_like * 9) / 5) + 32}
            °
          </span>
        </label>
        <label className="description">{data.weather.description}</label>
      </div>
    </div>
  );
};

export default CurrentWeather;
