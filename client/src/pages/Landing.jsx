import React from "react"
import styled from "styled-components"
import Wrapper from "../assets/wrappers/LandingPage"
import main from "../assets/images/main.svg"
import logo from "../assets/images/logo.svg"
import { Link } from "react-router-dom"
import { Logo } from "../components"

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni quam
            pariatur, laudantium veritatis atque iste ea aspernatur ut numquam!
            Vitae blanditiis incidunt provident ut culpa explicabo quaerat
            repellendus eveniet saepe.
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn ">
            Login / Demo user
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  )
}

export default Landing
