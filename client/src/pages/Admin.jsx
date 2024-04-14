import React from "react"
import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa"
import customFetch from "../utils/customFetch"
import { toast } from "react-toastify"
import { redirect, useLoaderData } from "react-router-dom"
import Wrapper from "../assets/wrappers/StatsContainer"
import { StatItem } from "../components"

export const loader = async () => {
  try {
    const response = await customFetch("/users/admin/app-stats")
    console.log(response.data)
    return response.data
  } catch (error) {
    toast.error("No authorized to view this page")
    return redirect("/dashboard")
  }
}

const Admin = () => {
  const { users, jobs } = useLoaderData()
  return (
    <Wrapper>
      <StatItem
        title="current users"
        count={users}
        color="#e9b949"
        bcg="#fcefc7"
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title="total jobs"
        count={jobs}
        color="#647acb"
        bcg="#e0e8f9"
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  )
}

export default Admin
