import React from "react"
import { Link, Form, useNavigation, redirect } from "react-router-dom"
import { Logo, FormRow, SubmitBtn } from "../components"
import Wrapper from "../assets/wrappers/RegisterAndLoginPage"
import customFetch from "../utils/customFetch"
import { toast } from "react-toastify"

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  console.log(data)
  try {
    await customFetch.post("/auth/register", data)
    toast.success("Successfully Registered")
    return redirect("/login")
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
  // console.log("hello")
  // return null
}

const Register = () => {
  const navigation = useNavigation()
  // console.log(navigation)
  const isSubmitting = navigation.state === "submitting"
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" />
        <FormRow type="text" name="lastName" labelText="last name" />
        <FormRow type="text" name="location" />
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />

        <SubmitBtn formBtn={true} />
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  )
}

export default Register
