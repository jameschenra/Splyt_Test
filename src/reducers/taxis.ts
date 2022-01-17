import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import LocationType from "../types/LocationType"
import offices from "../constants/Offices";
import { RootState } from "../store/configureStore";
import axios from "axios";
import { SERVER_URL } from "../constants/Config";

export interface locationState {
    loading: boolean,
    current_office: string,
    taxi_count: number,
    taxis: {}[]
}

const initialState: locationState = {
    loading: false,
    current_office: 'LONDON',
    taxi_count: 5,
    taxis: []
}

export const searchTaxis = createAsyncThunk(
    'taxis/taxiSearch',
    async (centerLocation: LocationType | null, thunkAPI) => {
        console.log('center location:', centerLocation)
        const { getState } = thunkAPI
        const state: RootState = getState() as RootState

        const filterLocation = centerLocation || offices[state.filters.current_office]
        const taxiCount: number = state.filters.taxi_count

        // console.log(filterLocation)

        const response = await axios.get(`${SERVER_URL}/drivers`, {
            params: {
                latitude: filterLocation?.latitude,
                longitude: filterLocation?.longitude,
                count: taxiCount
            }
        })

        return response.data.drivers
    }
)

const taxisSlice = createSlice({
    name: 'taxis',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(searchTaxis.pending, (state, action) => {
            state.loading = true
        })

        builder.addCase(searchTaxis.fulfilled, (state, action) => {
            state.loading = false
            state.taxis = action.payload
        })

        builder.addCase(searchTaxis.rejected, (state, action) => {
            state.loading = false
            alert(action.error)
        })
    }
})

export const selectTaxis = (state: RootState) => state.taxis.taxis

export default taxisSlice.reducer