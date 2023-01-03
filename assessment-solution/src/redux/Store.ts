import { configureStore } from "@reduxjs/toolkit"
import RootReducer from "./reducers/RootReducer"

const store = configureStore({
  reducer: RootReducer,
})

export default store
