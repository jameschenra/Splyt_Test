import LocationType from "../../Types/LocationType"
import { Dispatch } from "redux";
import { SERVER_URL } from "../../constants/Config";
import { TAXI_SEARCH_REQUEST, TAXI_SEARCH_SUCCESS, TAXI_SEARCH_FAILED, SET_OFFICE, SET_COUNT } from "./types"
import axios from "axios";
import offices from "../../constants/Offices";

export const taxiSearchRequested = (officeLocation: LocationType | null, taxiCount: number) => {
    return {
        type: TAXI_SEARCH_REQUEST,
        payload: {
            office_location: officeLocation,
            taxi_count: taxiCount
        }
    }
}

export const taxiSearchFailed = () => {
    return {
        type: TAXI_SEARCH_FAILED
    }
}

export const taxiSearchSuccess = (taxis: any[]) => {
    return {
        type: TAXI_SEARCH_SUCCESS,
        payload: taxis
    }
}

export const setOffice = (officeCity: string) => {
    return {
        type: SET_OFFICE,
        payload: officeCity
    }
}

export const setCount = (taxiCount: number) => {
    return {
        type: SET_COUNT,
        payload: taxiCount
    }
}

export const searchTaxis = () => {
    return async (dispatch: Dispatch, getState: () => any) => {
        const state = getState()

        const officeLocation: LocationType = offices[state.location.office_city];
        const taxiCount: number = state.location.taxi_count

        dispatch(taxiSearchRequested(officeLocation, taxiCount))
        try {
            axios.get(`${SERVER_URL}/drivers`, {
                headers: { 'Access-Control-Allow-Origin': '*' },
                params: {
                    latitude: officeLocation?.latitude,
                    longitude: officeLocation?.longitude,
                    count: taxiCount
                }
            }).then(function (response) {
                dispatch(taxiSearchSuccess(response.data.drivers))
            }).catch(function (error) {
                alert(error)
            })
        } catch (err) {
            alert(err)
        }
    }
}