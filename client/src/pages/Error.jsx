import React from "react"
import { Link, useRouteError } from "react-router-dom"
import Wrapper from "../assets/wrappers/ErrorPage"
import errorImg from "../assets/images/not-found.svg"

const Error = () => {
  const error = useRouteError()
  console.log(error)
  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={errorImg} alt="not found" />
          <h1>Page Not Found!!!!!</h1>
          <p>Can't find the page you're looking for</p>
          <Link to="/dashboard">back home</Link>
        </div>
      </Wrapper>
    )
  }
  return (
    <div>
      <h3>Something went wrong</h3>
      <Link to="/">Home page</Link>
    </div>
  )
}

export default Error
