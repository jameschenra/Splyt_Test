import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store/configureStore"

export interface FilterState {
    office_city: string,
    taxi_count: number
}

const initialState: FilterState = {
    office_city: 'LONDON',
    taxi_count: 5
}

const filtersSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setOffice: (state, action: PayloadAction<string>) => {
            state.office_city = action.payload
        },
        setTaxiCount: (state, action: PayloadAction<number>) => {
            state.taxi_count = action.payload
        }
    },
})

export const selectOfficeCity = (state: RootState) => state.filters.office_city
export const selectTaxiCount = (state: RootState) => state.filters.taxi_count

export const { setOffice, setTaxiCount } = filtersSlice.actions

export default filtersSlice.reducer