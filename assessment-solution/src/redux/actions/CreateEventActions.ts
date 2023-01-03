import { ActionTypes } from "../constants/ActionTypes"
import eventType from "../../helpers/eventType"

export const createEvent = (event: eventType) => {
  return {
    type: ActionTypes.CREATE_EVENT,
    payload: event,
  }
}
