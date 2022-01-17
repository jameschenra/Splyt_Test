import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store/configureStore"

export interface FilterState {
    current_office: string,
    taxi_count: number
}

const initialState: FilterState = {
    current_office: 'LONDON',
    taxi_count: 5
}

const filtersSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setOffice: (state, action: PayloadAction<string>) => {
            state.current_office = action.payload
        },
        setTaxiCount: (state, action: PayloadAction<number>) => {
            state.taxi_count = action.payload
        }
    },
})

export const selectCurrentOffice = (state: RootState) => state.filters.current_office
export const selectTaxiCount = (state: RootState) => state.filters.taxi_count

export const { setOffice, setTaxiCount } = filtersSlice.actions

export default filtersSlice.reducer