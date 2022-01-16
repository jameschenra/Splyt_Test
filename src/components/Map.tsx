import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import offices from "../constants/Offices";
import LocationType from "../types/LocationType";
import { REFRESH_INTERVAL, MAP_API_KEY } from '../constants/Config'
import { useAppSelector } from "../store/configureStore";
import { selectOfficeCity, selectTaxiCount } from "../reducers/filters";
import { searchTaxis, selectTaxis } from "../reducers/taxis";

const TaxiMarkComponent = ({ index, text, lat, lng }: {index: number, text: string, lat: number, lng: number}) => {
  return <div className='circleText' title={text}>
      {index + 1}
  </div>;
}

const Map = () => {
  const [officeLocation, setOfficeLocation] = useState<LocationType | null>(null)
  const officeCity = useAppSelector(selectOfficeCity)
  const taxiCount = useAppSelector(selectTaxiCount)
  const taxis = useSelector(selectTaxis)
  
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(searchTaxis())
    }, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setOfficeLocation({
      latitude: offices[officeCity].latitude,
      longitude: offices[officeCity].longitude,
    });
    dispatch(searchTaxis())
  }, [officeCity, taxiCount])

  return (
    <div style={{ height: "80vh", width: "100%" }}>
      { officeLocation ?
        <GoogleMapReact
          bootstrapURLKeys={{ key: MAP_API_KEY }}
          center={{ lat: officeLocation?.latitude, lng: officeLocation?.longitude }}
          defaultZoom={15}
        >
          {taxis.length > 0 ?
            taxis.map((taxi: any, i:number) => {
              return (<TaxiMarkComponent
                key={i}
                lat={taxi.location.latitude}
                lng={taxi.location.longitude}
                index={i}
                text={taxi.driver_id}
              />)
            }) : ''
          }
        </GoogleMapReact> : ''}
    </div>
  );
};

export default Map;
