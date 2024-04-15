import React from "react"
import {
  Link,
  Form,
  redirect,
  useNavigation,
  useNavigate,
} from "react-router-dom"
import { FormRow, Logo, SubmitBtn } from "../components"
import Wrapper from "../assets/wrappers/RegisterAndLoginPage"
import customFetch from "../utils/customFetch"
import { toast } from "react-toastify"

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  console.log(data)
  try {
    await customFetch.post("/auth/login", data)
    toast.success("Successfully logged in")
    return redirect("/dashboard")
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const Login = () => {
  const navigate = useNavigate()
  const loginDemoUser = async () => {
    const data = {
      email: "test@test.com",
      password: "secret123",
    }
    try {
      await customFetch.post("/auth/login", data)
      toast.success("Welcome, take a test drive")
      navigate("/dashboard")
    } catch (error) {
      toast.error(error?.respose?.data?.msg)
    }
  }
  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />
        <SubmitBtn formBtn={true} />
        <button type="button" className="btn btn-block" onClick={loginDemoUser}>
          explore the app
        </button>
        <p>
          Not a member yes?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  )
}

export default Login
