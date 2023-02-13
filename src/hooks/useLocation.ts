import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useErrorHandler } from "react-error-boundary";
import { EmptyLocationModel, LocationModel } from "../models";

export const useLocation = (locationName: string, useMockData: boolean) => {
  console.log("locationName", locationName);
  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
  const loc_apiKey = process.env.REACT_APP_OPENWEATHER_LOCATION_API_KEY;
  console.log("loc_apiKey", loc_apiKey);

  const geocodeBaseUrl = "https://api.openweathermap.org/data/2.5/";

  const [location, setLocation] = useState<LocationModel>(EmptyLocationModel);
  const handleError = useErrorHandler();

  const getLocationDetails = useCallback(
    (position: GeolocationPosition) => {
      axios
        .get(
          useMockData
            ? "./mock-data/locality.json"
            : `${geocodeBaseUrl}weather/?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=5&appid=${apiKey}`
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
              : `${geocodeBaseUrl}find?q=${locationName}&appid=${loc_apiKey}&units=metric`
          )
          .then((res: any) => {
            if (res && res.data) {
              console.log("loc res", res);
              const location = res.data.list[0].name;
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
