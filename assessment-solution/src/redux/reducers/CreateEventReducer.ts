import { ActionTypes } from "../constants/ActionTypes"

const initialState = {}

export const createEventReducer = (
  state = initialState,
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case ActionTypes.CREATE_EVENT:
      return { ...state, event: action.payload }
    default:
      return state
  }
}
