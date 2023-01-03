import "../styles/ListEvents.css"
import eventType from "../helpers/eventType"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import initialEventState from "../helpers/initialState"

const ListEvents = () => {
  const [eventList, setEventList] = useState<eventType[]>([]) //Store all event data
  /**
   * New event created and obtained from redux
   */
  const newEvent: eventType = useSelector(
    (state: any) => state.createEvent.event
  )
  //Variable to store the event that matches any note ID with a remote event
  const [foundEvent, setFoundEvent] = useState(initialEventState)

  /**
   *
   * @param remote
   * @param local
   * @returns event
   * Function to resolve conflicts in events with same ID
   */
  const resolveEvents = (remote: eventType, local: eventType): eventType => {
    const resolvedName = `${local.name} / ${remote.name}`
    let resolvedOffset = 0
    let resolvedText = ""
    //Comparing IDs to find and resolve conflicts
    for (let i = 0; i < local.note.length; i++) {
      for (let j = 0; j < remote.note.length; j++) {
        if (local.note[i].id === remote.note[j].id) {
          resolvedOffset = remote.note[j].timestamp //as per requirement
          resolvedText = `${local.note[i].text} / ${remote.note[j].text}` //as per requirement
          local.note[i].timestamp = resolvedOffset
          local.note[i].text = resolvedText
        }
      }
    }
    //Return the modified & resolved event
    const returnedEvent = {
      name: resolvedName,
      note: local.note,
    }
    return returnedEvent
  }

  //Triggered when a new event is retrieved from Redux
  useEffect(() => {
    if (newEvent !== undefined) {
      if (eventList.length >= 1) {
        //Runs if events length > 1
        for (let i = 0; i < eventList.length; i++) {
          let ids = eventList[i].note.map((el) => el.id)
          //ids = Array.from(new Set(ids)) //Make uniqued ID array
          var arr = newEvent.note.filter((el) => ids.indexOf(el.id) !== -1)
          if (arr.length > 0) {
            setFoundEvent(eventList[i])
            eventList.splice(i, 1)
            break
          } else {
            setFoundEvent(newEvent)
          }
        }
      } else if (newEvent.name !== "") {
        //Runs when a single event is to be added
        const newList = [...eventList, newEvent]
        setEventList(newList)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newEvent])

  //Triggered when a conflict is found
  useEffect(() => {
    if (
      foundEvent === newEvent &&
      foundEvent !== undefined &&
      newEvent !== undefined
    ) {
      const newList = [...eventList, newEvent]
      setEventList(newList)
    } else if (
      foundEvent !== newEvent &&
      foundEvent !== undefined &&
      newEvent !== undefined
    ) {
      const resolvedEvent = resolveEvents(newEvent, foundEvent)
      const newList = [...eventList, resolvedEvent]
      setEventList(newList)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foundEvent])

  return (
    <div className="tableContainer">
      <h2>All Events</h2>
      {eventList.length > 0 ? (
        eventList.map((item) => {
          return (
            <div className="listContainer">
              <div className="eventName">Event Name: {item.name}</div>
              <div className="notesList">
                {item.note.map((item) => {
                  return (
                    <div className="notesText">
                      <ol key={item.id}>
                        <li>ID: {item.id}</li>
                        <li>Timestamp: {item.timestamp}</li>
                        <li>Text: {item.text}</li>
                      </ol>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })
      ) : (
        <p>No events</p>
      )}
    </div>
  )
}

export default ListEvents
