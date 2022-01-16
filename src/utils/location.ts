import offices from "../constants/Offices";
import LocationType from "../types/LocationType";

export const getNearestOffice = (clientLocation: LocationType): string => {
    const distanceLondon: number = calcCrow(clientLocation, offices.LONDON)
    const distanceSingapore: number = calcCrow(clientLocation, offices.SINGAPORE)

    if (distanceLondon < distanceSingapore) {
        return 'LONDON'
    } else {
        return 'SINGAPORE'
    }
}

function calcCrow(location1: LocationType, location2: LocationType): number
{
  var R = 6371;
  var dLat = toRad(location1.latitude-location2.latitude);
  var dLon = toRad(location1.longitude-location2.longitude);
  var lat1 = toRad(location1.latitude);
  var lat2 = toRad(location2.latitude);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c;
  return d;
}

// Converts numeric degrees to radians
function toRad(Value: number) 
{
    return Value * Math.PI / 180;
}