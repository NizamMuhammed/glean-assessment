import { screen, render } from "@testing-library/react"
import "@testing-library/jest-dom"
import Header from "../components/Header"

describe("Header", () => {
  test("check header text is displayed", () => {
    render(<Header />)
    const linkElement = screen.getByText(/My Events/i)
    expect(linkElement).toBeInTheDocument()
  })
})
