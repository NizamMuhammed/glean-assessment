import { render as testRender, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import ListEvents from "../components/ListEvents"
import { Provider } from "react-redux"
import store from "../redux/Store"

const render = (component: JSX.Element) =>
  testRender(<Provider store={store}>{component}</Provider>)

describe("ListEvents", () => {
  test("check list events text is displayed", () => {
    render(<ListEvents />)
    const linkElement = screen.getByText(/All Events/i)
    expect(linkElement).toBeInTheDocument()
  })
})
