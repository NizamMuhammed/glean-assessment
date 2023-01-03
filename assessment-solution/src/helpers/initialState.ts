import eventType from "./eventType"

const initialEventState: eventType = {
  name: "",
  note: [
    {
      id: 0,
      timestamp: 0,
      text: "",
    },
  ],
}

export default initialEventState
