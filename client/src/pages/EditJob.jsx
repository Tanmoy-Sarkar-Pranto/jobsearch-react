import React from "react"
import customFetch from "../utils/customFetch"
import { toast } from "react-toastify"
import {
  redirect,
  useLoaderData,
  useNavigation,
  useParams,
} from "react-router-dom"
import Wrapper from "../assets/wrappers/DashboardFormPage"
import { Form } from "react-router-dom"
import { FormRow, FormRowSelect, SubmitBtn } from "../components"
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants"

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch(`/jobs/${params.id}`)
    return data
  } catch (error) {
    toast.error(error.response.data.msg)
    return redirect("/dashboard/all-jobs")
  }
  // console.log(params)
  // return null
}

export const action = async ({ request, params }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    await customFetch.patch(`/jobs/${params.id}`, data)
    toast.success("Job edited successfully")
    return redirect("/dashboard/all-jobs")
  } catch (error) {
    toast.error(error.response.data.msg)
    return error
  }
}

const EditJob = () => {
  const params = useParams()
  console.log(params)
  const { job } = useLoaderData()
  console.log(job)
  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"
  return (
    <Wrapper>
      <Form className="form" method="post">
        <h4 className="form-title">edit job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" defaultValue={job.position} />
          <FormRow type="text" name="company" defaultValue={job.company} />
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            defaultValue={job.jobLocation}
          />
          <FormRowSelect
            name="jobStatus"
            labelText="job status"
            defaultValue={job.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            defaultValue={job.jobType}
            list={Object.values(JOB_TYPE)}
          />
          <SubmitBtn formBtn={true} />
        </div>
      </Form>
    </Wrapper>
  )
}

export default EditJob
