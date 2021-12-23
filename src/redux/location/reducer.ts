import { TAXI_SEARCH_REQUEST, SET_OFFICE, TAXI_SEARCH_FAILED, TAXI_SEARCH_SUCCESS, SET_COUNT } from "./types";

interface Action {
    type: string,
    payload?: any
}

interface ILocationState {
    office_city: string,
    taxi_count: number,
    taxis: any[]
}

const initialState: ILocationState = {
    office_city: 'LONDON',
    taxi_count: 5,
    taxis: []
}

const locationReducer = (state=initialState, action: Action) => {
    switch (action.type) {
        case TAXI_SEARCH_REQUEST:
            return state
        case TAXI_SEARCH_FAILED:
            return {
                ...state,
                error: action.payload
            }
        case TAXI_SEARCH_SUCCESS:
            return {
                ...state,
                taxis: action.payload.slice()
            }
        case SET_OFFICE:
            return {
                ...state,
                office_city: action.payload
            }
        case SET_COUNT:
            return {
                ...state,
                taxi_count: action.payload
            }
        default:
            return state
    }
}

export default locationReducer