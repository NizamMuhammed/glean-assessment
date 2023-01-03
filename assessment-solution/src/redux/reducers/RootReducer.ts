import { combineReducers } from "redux"
import { createEventReducer } from "./CreateEventReducer"

const RootReducer = combineReducers({
  createEvent: createEventReducer,
})

export default RootReducer
