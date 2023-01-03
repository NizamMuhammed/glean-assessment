import React from "react"
import { render as testRender, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import AddEvent from "../components/AddEvent"
import { Provider } from "react-redux"
import store from "../redux/Store"

const render = (component: JSX.Element) =>
  testRender(<Provider store={store}>{component}</Provider>)

describe("AddEvent", () => {
  test("check add event text is displayed", () => {
    render(<AddEvent />)
    const linkElement = screen.getByText(/Add New Event/i)
    expect(linkElement).toBeInTheDocument()
  })
})
