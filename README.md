## Weather App

React weather app is a simple weather app developed in typescript using React, HTML and SASS. The app allows you to see the weather from your current location or another location around the globe using **OpenWeather Api** . Using **One Call API** the app displays the current weather, 24 hours and 6 days forecast. You can change the unit system from metric to imperial. The app is available in **light** and **dark mode**.

## Libraries

- [React](https://github.com/facebook/react)
- [Axios](https://github.com/axios/axios) (API Calls)

## Setup

Create a file called **.env** in the root of the React-WeatherApp project. Add the following code in the file.

```
REACT_APP_OPENWEATHER_API_BASEURL = "https://api.openweathermap.org/data/2.5/onecall"
REACT_APP_OPENWEATHER_API_KEY = "YOUR_OPENWEATHERAPI_KEY"
REACT_APP_GEOLOCATION_GEOCODE_BASEURL = "https://maps.googleapis.com/maps/api/geocode/json"
REACT_APP_GEOLOCATION_API_KEY = "YOUR_GOOGLEMAPSAPI_KEY"
```

The app is using **One Call API** from OpenWeather API. To start the project you need an **account** and **OpenWeather API Key**. You can signup and get the key from [here](https://openweathermap.org/api).

To use real data, change the flag **useMockData** to false from **Container.tsx**.
