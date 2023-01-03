import "../styles/AddEvent.css"
import { useEffect, useState } from "react"
import noteType from "../helpers/noteType"
import eventType from "../helpers/eventType"
import { useDispatch } from "react-redux"
import { createEvent } from "../redux/actions/CreateEventActions"

const AddEvent = () => {
  //Add state hooks to handle form values
  const [eventName, setEventName] = useState<string>("")
  const [eventId, setEventId] = useState<string>("")
  const [eventTimestamp, setEventTimestamp] = useState<string>("")
  const [eventText, setEventText] = useState<string>("")
  const [noteCount, setNotesCount] = useState<string>("")
  const [buttonCount, setButtonCount] = useState<string>("")
  const [notes, setNotes] = useState<noteType[]>([])
  const dispatch = useDispatch() //Redux method to implement state management

  /**
   * Function to handle final event submission
   * after all notes are combined into single object
   */
  const handleSubmit = () => {
    if (eventName !== "") {
      setNotes([
        ...notes,
        {
          id: Number(eventId),
          timestamp: Number(eventTimestamp),
          text: eventText,
        },
      ])
    }
  }

  /**
   * Function to handle each note creation
   * Only active when notes count is greater than 1
   */
  const handleClick = () => {
    setNotes([
      ...notes,
      {
        id: Number(eventId),
        timestamp: Number(eventTimestamp),
        text: eventText,
      },
    ])
    let count = Number(buttonCount)
    count -= 1 //Reduce notes count displayed on button
    let newCount = count.toString() //Changing type to default
    setButtonCount(newCount)
    setEventId("")
    setEventTimestamp("")
    setEventText("")
  }

  /**
   * Used as useState is storing values asynchronously and crashing the functionality
   * Trigger redux after all notes are combined to single object
   */
  useEffect(() => {
    if (notes.length === Number(noteCount) && notes.length >= 1) {
      let newEvent: eventType = {
        name: eventName,
        note: notes,
      }
      dispatch(createEvent(newEvent))
      setEventName("")
      setEventId("")
      setEventTimestamp("")
      setEventText("")
      setNotesCount("")
      setNotes([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteCount, notes])

  //Handle Form field value changes
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEventName(event.target.value)
  }

  //Handle Form field value changes
  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number(event.target.value)
    //Check for type of ID
    if (Number.isNaN(id)) {
      alert("ID should be a number!")
    } else {
      let newId: string = event.target.value
      setEventId(newId)
    }
  }

  //Handle Form field value changes
  const handleTimestampChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const time = Number(event.target.value)
    if (Number.isNaN(time)) {
      alert("Timestamp should be a number!")
    } else {
      let newStamp: string = event.target.value
      setEventTimestamp(newStamp)
    }
  }

  //Handle Form field value changes
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEventText(event.target.value)
  }

  const handleNoteCount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const count = Number(event.target.value)
    if (Number.isNaN(count)) {
      alert("Count should be a number!")
    } else {
      setNotesCount(event.target.value)
      setButtonCount(event.target.value)
    }
  }

  return (
    <div className="formContainer">
      <h2 style={{ padding: "1rem" }}>Add New Event</h2>
      <form className="form">
        <div className="countContainer">
          <div className="name">Enter event name:</div>
          <input
            placeholder="Event Name"
            className="input"
            autoComplete="off"
            autoFocus
            value={eventName}
            onChange={handleNameChange}
          ></input>
          <div className="name" style={{ paddingLeft: "1rem" }}>
            Enter number of Notes:
          </div>
          <input
            placeholder="Notes Count"
            className="input"
            autoComplete="off"
            value={noteCount}
            onChange={handleNoteCount}
          ></input>
        </div>
        <div className="notesContainer">
          <p className="noteText">Note Details</p>
          <div>
            <div className="nameContainer">
              <div className="name">Enter ID:</div>
              <input
                placeholder="Event ID"
                className="input"
                autoComplete="off"
                value={eventId}
                onChange={handleIdChange}
              ></input>
            </div>
            <div className="nameContainer">
              <div className="name">Enter timestamp:</div>
              <input
                placeholder="Event Timestamp"
                className="input"
                autoComplete="off"
                value={eventTimestamp}
                onChange={handleTimestampChange}
              ></input>
            </div>
            <div className="nameContainer">
              <div className="name">Enter text:</div>
              <input
                placeholder="Event Text"
                className="input"
                autoComplete="off"
                value={eventText}
                onChange={handleTextChange}
              ></input>
            </div>
          </div>
          <div
            className="buttonContainer"
            onClick={Number(buttonCount) > 1 ? handleClick : handleSubmit}
          >
            <div className="button">
              {Number(buttonCount) > 1 ? `Next >` : `Create Event`}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddEvent
