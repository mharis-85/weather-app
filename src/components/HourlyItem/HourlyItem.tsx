import React from "react";
import { CurrentWeatherModel, SettingsModel } from "../../models";
import "./HourlyItem.scss";

type HourlyItemProps = {
  settings: SettingsModel;
  data: CurrentWeatherModel;
};

export const HourlyItem = ({ settings, data }: HourlyItemProps) => {
  const weatherCode =
    settings.theme === "dark"
      ? `${data.weather.icon}_n`
      : `${data.weather.icon}`;
  const unitSymbol = settings.unit === "metric" ? "C" : "F";
  return (
    <div className="hourly-item">
      <label className="hour">{new Date(data.dt * 1000).getHours()}:00</label>
      <img
        src={require(`../../assets/icon_${weatherCode}.png`)}
        className="icon-small"
        alt=""
      />
      <label className="temp">
        {unitSymbol === "C"
          ? Math.round(data.temp)
          : Math.round((data.temp * 9) / 5) + 32}
        °{unitSymbol}
      </label>
    </div>
  );
};
export default HourlyItem;
