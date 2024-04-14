import React, { createContext, useContext, useState } from "react"
import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom"
import { BigSidebar, SmallSidebar, Navbar } from "../components"
import Wrapper from "../assets/wrappers/Dashboard"
import customFetch from "../utils/customFetch"
import { toast } from "react-toastify"

const DashboardContext = createContext()

export const loader = async () => {
  try {
    const { data } = await customFetch("/users/current-user")
    // console.log(data)
    return data
  } catch (error) {
    return redirect("/")
  }
}

const DashboardLayout = ({ isDarkThemeEnabled }) => {
  const { user } = useLoaderData()
  const [showSidebar, setShowSidebar] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled)
  const navigate = useNavigate()

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme
    setIsDarkTheme(newDarkTheme)
    document.body.classList.toggle("dark-theme", newDarkTheme)
    localStorage.setItem("darkTheme", newDarkTheme)
  }
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }
  const logoutUser = async () => {
    navigate("/")
    await customFetch("/auth/logout")
    toast.success("Logged out successfully")
  }
  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  )
}
export const useDashboardContext = () => useContext(DashboardContext)
export default DashboardLayout
