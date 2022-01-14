import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import LocationType from "../Types/LocationType"
import offices from "../constants/Offices";
import { RootState } from "../store/configureStore";
import axios from "axios";
import { SERVER_URL } from "../constants/Config";

export interface locationState {
    loading: boolean,
    office_city: string,
    taxi_count: number,
    taxis: {}[]
}

const initialState: locationState = {
    loading: false,
    office_city: 'LONDON',
    taxi_count: 5,
    taxis: []
}

export const searchTaxis = createAsyncThunk(
    'taxis/taxiSearch',
    async (_: void, thunkAPI) => {
        const { getState } = thunkAPI
        const state: RootState = getState() as RootState

        const officeLocation: LocationType = offices[state.filters.office_city];
        const taxiCount: number = state.filters.taxi_count

        const response = await axios.get(`${SERVER_URL}/drivers`, {
            params: {
                latitude: officeLocation?.latitude,
                longitude: officeLocation?.longitude,
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