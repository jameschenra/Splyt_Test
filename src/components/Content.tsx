import { useEffect } from "react";
import Controls from "./Controls";
import Map from "./Map";
import * as location from "../utils/location";
import { useDispatch } from "react-redux";
import { setOffice } from "../reducers/filters";


const Content = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const nearOffice: string = location.getNearestOffice({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });

      dispatch(setOffice(nearOffice));
    });
  }, []);

  return (
    <div>
      <Controls />
      <br />
      <Map />
    </div>
  );
};

export default Content;
