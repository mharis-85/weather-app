## Weather App

git

## Libraries

- [React](https://github.com/facebook/react)
- [Axios](https://github.com/axios/axios) (API Calls)
- [Open Weather api] ()

## Setup

Create a file called **.env** in the root of the React-WeatherApp project. Add the following code in the file.

```
REACT_APP_OPENWEATHER_API_BASEURL = "https://api.openweathermap.org/data/2.5/onecall"
REACT_APP_OPENWEATHER_API_KEY = "YOUR_OPENWEATHERAPI_KEY"
REACT_APP_GEOLOCATION_API_KEY = "YOUR_GEOCODINGAPI_KEY"
```

The app is using **One Call API** from OpenWeather API. To start the project you need an **account** and **OpenWeather API Key**. You can signup and get the key from [here](https://openweathermap.org/api).

To use real data, change the flag **useMockData** to false from **Container.tsx**.
