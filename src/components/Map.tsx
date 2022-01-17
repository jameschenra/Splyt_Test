import GoogleMapReact, { ChangeEventValue } from "google-map-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import offices from "../constants/Offices";
import LocationType from "../types/LocationType";
import { REFRESH_INTERVAL, MAP_API_KEY } from '../constants/Config'
import { useAppSelector } from "../store/configureStore";
import { selectCurrentOffice, selectTaxiCount } from "../reducers/filters";
import { searchTaxis, selectTaxis } from "../reducers/taxis";

const TaxiMarkComponent = ({ index, text, lat, lng }: {index: number, text: string, lat: number, lng: number}) => {
  return <div className='circleText' title={text}>
      {index + 1}
  </div>;
}

const Map = () => {
  const [centerLocation, setCenterLocation] = useState<LocationType | null>(null)
  const [changeFromFilter, setChangeFromFilter] = useState<boolean>(false)
  const currentOffice = useAppSelector(selectCurrentOffice)
  const taxiCount = useAppSelector(selectTaxiCount)
  const taxis = useSelector(selectTaxis)

  const dispatch = useDispatch();

  useEffect(() => {
    setChangeFromFilter(true)
    setCenterLocation({
      latitude: offices[currentOffice].latitude,
      longitude: offices[currentOffice].longitude,
    });
  }, [currentOffice, taxiCount])

  useEffect(() => {
    if (centerLocation) {
      dispatch(searchTaxis(centerLocation))

      const interval = setInterval(() => {
        dispatch(searchTaxis(centerLocation))
      }, REFRESH_INTERVAL);
      return () => clearInterval(interval);  
    }
  }, [centerLocation])

  const onChangeMap = (param: ChangeEventValue) => {
    if (changeFromFilter) {
      setChangeFromFilter(false)
      return
    }

    setCenterLocation({
      latitude: param.center.lat,
      longitude: param.center.lng
    });
  }

  return (
    <div style={{ height: "80vh", width: "100%" }}>
      { centerLocation ?
        <GoogleMapReact
          bootstrapURLKeys={{ key: MAP_API_KEY }}
          center={{ lat: centerLocation?.latitude, lng: centerLocation?.longitude }}
          defaultZoom={15}
          onChange={onChangeMap}
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
