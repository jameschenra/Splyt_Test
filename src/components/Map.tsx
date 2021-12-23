import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import offices from "../constants/Offices";
import { searchTaxis } from "../redux/location/action";
import LocationType from "../Types/LocationType";
import { REFRESH_INTERVAL, MAP_API_KEY } from '../constants/Config'
import { RootState } from "../redux/store";

const TaxiMarkComponent = ({ index, text, lat, lng }: {index: number, text: string, lat: number, lng: number}) => {
  return <div className='circleText' title={text}>
      {index + 1}
  </div>;
} 

const Map = () => {
  const [officeLocation, setOfficeLocation] = useState<LocationType | null>(null)
  const officeCity = useSelector((state: RootState) => state.location.office_city)
  const taxiCount = useSelector((state: RootState) => state.location.taxi_count)
  const taxis = useSelector((state: RootState) => state.location.taxis)
  const dispatch = useDispatch();

  useEffect(() => {
    setOfficeLocation({
      latitude: offices[officeCity].latitude,
      longitude: offices[officeCity].longitude,
    });
    dispatch(searchTaxis())
  }, [dispatch, officeCity, taxiCount])

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(searchTaxis())
    }, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [dispatch]);

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
