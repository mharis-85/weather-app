import axios from "axios";
import { useEffect, useState } from "react";
import { useErrorHandler } from "react-error-boundary";
import { useLocation } from ".";
import {
  CurrentWeatherModel,
  DailyWeatherDetailsModel,
  DailyWeatherModel,
  EmptyCurrentWeather,
  EmptyDailyWeatherModel,
  EmptyHourlyWeatherModel,
  HourlyWeatherModel,
} from "../models";

export const useWeather = (
  locationName: string,
  unit: string,
  useMockData: boolean
) => {
  const baseUrl = "https://api.openweathermap.org/data/3.0/onecall";
  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

  const { location } = useLocation(locationName, useMockData);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentWeather, setCurrentWeather] =
    useState<CurrentWeatherModel>(EmptyCurrentWeather);
  const [hourlyWeather, setHourlyWeather] = useState<HourlyWeatherModel>(
    EmptyHourlyWeatherModel
  );
  const [dailyWeather, setDailyWeather] = useState<DailyWeatherModel>(
    EmptyDailyWeatherModel
  );
  const handleError = useErrorHandler();

  useEffect(() => {
    setIsLoading(true);
    if (location) {
      console.log("location...", location);
      const url = useMockData
        ? `./mock-data/weather_${unit}.json`
        : `${baseUrl}?lat=${location.position.latitude}&lon=${location.position.longitude}&exclude=minutely,alerts&appid=${apiKey}`;

      axios
        .get(url)
        .then((response) => {
          console.log("response.....", response);
          setCurrent(response.data.current);
          setHourly(response.data.hourly);
          setDaily(response.data.daily);
        })
        .catch((error) => {
          handleError(error);
        })
        .finally(() => {
          setTimeout(() => setIsLoading(false), 100);
        });
    }
  }, [location, unit, useMockData, baseUrl, apiKey, handleError]);

  const setCurrent = (data: any) => {
    console.log("DATA.....", data);
    setCurrentWeather({
      dt: data?.dt,
      weather: {
        icon: data.weather[0].icon,
        description: data.weather[0].description,
      },
      temp: Number(data.temp - 273.15),
      feels_like: Number(data.feels_like - 273.15),
      details: {
        rain: 0,
        visibility: data.visibility / 1000,
        humidity: data.humidity,
        pressure: data.pressure,
        wind_speed: data.wind_speed,
      },
    });
  };

  const setHourly = (data: any) => {
    console.log("hourly data", data);
    let hourly: CurrentWeatherModel[] = [];
    data.slice(0, 24).forEach((item: any) => {
      hourly.push({
        dt: item.dt,
        weather: {
          icon: item.weather[0].icon,
          description: item.weather[0].description,
        },
        temp: Number(item.temp - 273.15),
        feels_like: Number(item.feels_like - 273.15),
        details: {
          rain: item.pop * 100,
          visibility: item.visibility / 1000,
          humidity: item.humidity,
          pressure: item.pressure,
          wind_speed: item.wind_speed,
        },
      });
    });
    setHourlyWeather({ hourly: hourly });
  };

  const setDaily = (data: any) => {
    console.log("daily data", data);
    let daily: DailyWeatherDetailsModel[] = [];
    data.slice(1).forEach((item: any) => {
      daily.push({
        dt: item.dt,
        clouds: item.clouds,
        humidity: item.humidity,
        pressure: item.pressure,
        sunrise: item.sunrise,
        sunset: item.sunset,
        minTemp: Number(item.temp.min - 273.15),
        maxTemp: Number(item.temp.max - 273.15),
        uvi: item.uvi,
        weather: {
          icon: item.weather[0].icon,
          description: item.weather[0].description,
        },
        wind_speed: item.wind_speed,
        rain: item.pop * 100,
      });
    });
    setDailyWeather({ daily: daily });
  };

  return {
    isLoading,
    location,
    currentWeather,
    hourlyWeather,
    dailyWeather,
  };
};
