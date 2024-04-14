import React, { createContext, useContext } from "react"
import { JobContainer, SearchContainer } from "../components"
import customFetch from "../utils/customFetch"
import { toast } from "react-toastify"
import { useLoaderData } from "react-router-dom"

const AllJobsContext = createContext()

export const loader = async ({ request }) => {
  try {
    const { data } = await customFetch("/jobs")
    console.log(data)
    return { data }
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const AllJobs = () => {
  const { data } = useLoaderData()
  return (
    <AllJobsContext.Provider value={{ data }}>
      <SearchContainer />
      <JobContainer />
    </AllJobsContext.Provider>
  )
}

export const useAllJobsContext = () => useContext(AllJobsContext)
export default AllJobs
