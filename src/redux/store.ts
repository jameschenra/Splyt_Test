import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import rootReducer from "./rootReducer";

const middleware = [thunk]

const store = createStore(rootReducer, applyMiddleware(...middleware))

export default store
export type RootState = ReturnType<typeof store.getState>