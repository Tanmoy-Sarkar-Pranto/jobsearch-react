import React from "react"
import Job from "./Job"
import Wrapper from "../assets/wrappers/JobsContainer"
import { useAllJobsContext } from "../pages/AllJobs"
import PageBtnContainer from "./PageBtnContainer"

const JobContainer = () => {
  const { data } = useAllJobsContext()
  const { jobs, totalJobs, numOfPages } = data
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}

export default JobContainer
