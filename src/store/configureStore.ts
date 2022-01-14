import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import filtersReducer from "../reducers/filters";
import taxisReducer from "../reducers/taxis";

export const store = configureStore({
    reducer: {
        filters: filtersReducer,
        taxis: taxisReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
