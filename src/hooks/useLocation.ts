import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useErrorHandler } from "react-error-boundary";
import { EmptyLocationModel, LocationModel } from "../models";

export const useLocation = (locationName: string, useMockData: boolean) => {
  console.log("locationName", locationName);
  //const apiKey = "AIzaSyCb6v8dn-EEocdMBictQLSd72BwbYi4_xc";
  const apiKey = "7616516b8150a1f2d2682a7e68d0cc65";
  const loc_apiKey = "439d4b804bc8187953eb36d2a8c26a02";

  const geocodeBaseUrl = "https://api.openweathermap.org/data/2.5/weather";
  // const gecodeByName = "https://openweathermap.org/data/2.5/find";
  //REACT_APP_GEOLOCATION_GEOCODE_BASEURL = "https://maps.googleapis.com/maps/api/geocode/json"
  //REACT_APP_GEOLOCATION_API_KEY = "AIzaSyCb6v8dn-EEocdMBictQLSd72BwbYi4_xc"

  const [location, setLocation] = useState<LocationModel>(EmptyLocationModel);
  const handleError = useErrorHandler();

  const getLocationDetails = useCallback(
    (position: GeolocationPosition) => {
      axios
        .get(
          useMockData
            ? "./mock-data/locality.json"
            : //"./mock-data/locality.json"
              `${geocodeBaseUrl}/?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=5&appid=${apiKey}`
        )
        .then((res: any) => {
          console.log("res", res);
          if (res && res.data) {
            //const formattedAddress = res.data.name;
            setLocation({
              position: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              },
              locality: res.data.name,
              country: res.data.sys.country,
            });
          }
        })
        .catch((error) => {
          handleError(error);
        });
    },
    [apiKey, geocodeBaseUrl, handleError, useMockData]
  );

  const getCoordsByLocationName = useCallback(
    (locationName: string) => {
      if (locationName !== "") {
        axios
          .get(
            useMockData
              ? "./mock-data/latlong.json"
              : `https://openweathermap.org/data/2.5/find?q=${locationName}&appid=${loc_apiKey}&units=metric`
          )
          .then((res: any) => {
            if (res && res.data) {
              console.log("loc res", res);
              const location = res.data.list[0].name;
              //const formattedAddress =
              //res.data.results[0].formatted_address.split(",");
              setLocation({
                position: {
                  latitude: res.data.list[0].coord.lat,
                  longitude: res.data.list[0].coord.lon,
                },
                locality: location,
                country: res.data.list[0].sys.country,
              });
            }
          })
          .catch((error) => {
            handleError(error);
          });
      }
    },
    [loc_apiKey, handleError, useMockData]
  );

  useEffect(() => {
    if (locationName === "") {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos: GeolocationPosition) => {
            console.log("pos", pos);
            getLocationDetails(pos);
          },
          () => {
            handleError({
              message:
                "Location - Please enable access location in the browser",
            });
          }
        );
      }
    } else {
      getCoordsByLocationName(locationName);
    }
  }, [getCoordsByLocationName, getLocationDetails, handleError, locationName]);

  return {
    location,
  };
};
