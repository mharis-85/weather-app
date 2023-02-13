import React from "react";
import { SettingsModel } from "../../models";
import { DailyWeatherDetailsModel } from "../../models/DailyWeatherDetailsModel";
import "./DailyItem.scss";

type DailyItemProps = {
  settings: SettingsModel;
  data: DailyWeatherDetailsModel;
  onClick: () => void;
};

export const DailyItem = ({ settings, data, onClick }: DailyItemProps) => {
  console.log("data", data);
  const weatherCode =
    settings.theme === "dark"
      ? `${data.weather.icon}_n`
      : `${data.weather.icon}`;
  const unitSymbol = settings.unit === "metric" ? "C" : "F";
  return (
    <div className="daily-item" onClick={onClick}>
      <img
        src={require(`../../assets/icon_${weatherCode}.png`)}
        className="icon-small"
        alt=""
      />
      <label className="day">
        {new Date(data.dt * 1000).toLocaleString("en-GB", {
          weekday: "long",
        })}
      </label>
      <label className="description">{data.weather.description}</label>
      <label className="min-max">
        {unitSymbol === "C"
          ? Math.round(data.minTemp)
          : Math.round((data.minTemp * 9) / 5) + 32}
        °{unitSymbol}/{" "}
        {unitSymbol === "C"
          ? Math.round(data.maxTemp)
          : Math.round((data.maxTemp * 9) / 5) + 32}
        °{unitSymbol}
      </label>
    </div>
  );
};

export default DailyItem;
