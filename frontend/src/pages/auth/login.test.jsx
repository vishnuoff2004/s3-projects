import React from "react"
import { describe, test, expect, vi, beforeEach } from "vitest"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import Login from "./login"
import { AuthContext } from "../../context-api/authContext"
import { useNavigate } from "react-router-dom"

// ---------------- MOCKS ----------------
vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
  Link: ({ children }) => children
}))

global.fetch = vi.fn()

const mockSetToken = vi.fn()

const renderWithContext = (ui) => {
  return render(
    <AuthContext.Provider value={{ token: "", setToken: mockSetToken }}>
      {ui}
    </AuthContext.Provider>
  )
}

// ---------------- TESTS ----------------
describe("Login Page", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // 1. Render test
  test("renders login page", () => {
    renderWithContext(<Login />)

    expect(screen.getByText("Login Page !!!")).toBeInTheDocument()
  })

  // 2. Input test
  test("user can type email and password", () => {
    renderWithContext(<Login />)

    fireEvent.change(screen.getByPlaceholderText("vishnu@gmail.com"), {
      target: { value: "test@gmail.com" }
    })

    fireEvent.change(screen.getByPlaceholderText("* * * * * * *"), {
      target: { value: "123456" }
    })

    expect(screen.getByPlaceholderText("vishnu@gmail.com").value).toBe(
      "test@gmail.com"
    )
    expect(screen.getByPlaceholderText("* * * * * * *").value).toBe("123456")
  })

  // 3. Validation test
  test("shows email validation error", () => {
    renderWithContext(<Login />)

    fireEvent.change(screen.getByPlaceholderText("vishnu@gmail.com"), {
      target: { value: "invalid" }
    })

    expect(
      screen.getByText(/email feild required @gmail.com/i)
    ).toBeInTheDocument()
  })

  // 4. Success login test
  test("login success and stores token", async () => {
    const mockNavigate = vi.fn()
    useNavigate.mockReturnValue(mockNavigate)

    fetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          msg: "login successful",
          token: "abc123"
        })
    })

    renderWithContext(<Login />)

    fireEvent.change(screen.getByPlaceholderText("vishnu@gmail.com"), {
      target: { value: "admin@gmail.com" }
    })

    fireEvent.change(screen.getByPlaceholderText("* * * * * * *"), {
      target: { value: "123456" }
    })

    fireEvent.click(screen.getByText("login"))

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled()
      expect(mockSetToken).toHaveBeenCalledWith("abc123")
    })
  })

  // 5. Loading test
  test("shows loading state", async () => {
    fetch.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                json: () => Promise.resolve({ msg: "login successful" })
              }),
            100
          )
        )
    )

    renderWithContext(<Login />)

    fireEvent.change(screen.getByPlaceholderText("vishnu@gmail.com"), {
      target: { value: "admin@gmail.com" }
    })

    fireEvent.change(screen.getByPlaceholderText("* * * * * * *"), {
      target: { value: "123456" }
    })

    fireEvent.click(screen.getByText("login"))

    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })
})