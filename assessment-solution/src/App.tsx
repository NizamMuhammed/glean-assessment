import React from "react"
import Header from "./components/Header"
import "./App.css"
import AddEvent from "./components/AddEvent"
import ListEvents from "./components/ListEvents"

/**
 * Components are imported into App file
 */
function App() {
  return (
    <div className="App">
      <Header />
      <AddEvent />
      <ListEvents />
    </div>
  )
}

export default App
