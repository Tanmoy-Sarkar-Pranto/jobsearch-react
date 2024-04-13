import express from "express"
import morgan from "morgan"
import mongoose from "mongoose"
import * as dotenv from "dotenv"
import "express-async-errors"

import cookieParser from "cookie-parser"

//routers
import jobRouter from "./routes/jobRouter.js"
import authRouter from "./routes/authRouter.js"
import userRouter from "./routes/userRouter.js"

//validator
import { validateTest } from "./middleware/validationMiddleware.js"

import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js"
import { authenticateUser } from "./middleware/authMiddleware.js"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}
app.use(cookieParser())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello World")
})

app.post(
  "/api/v1/test",

  validateTest,
  (req, res) => {
    const { name } = req.body
    res.status(201).json({ msg: `Hello ${name}` })
  }
)

app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" })
})

app.use("/api/v1/jobs", authenticateUser, jobRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", authenticateUser, userRouter)

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" })
})

app.use(errorHandlerMiddleware)

try {
  await mongoose.connect(process.env.MONGO_URL)
  await app.listen(port, () => {
    console.log(`Server listening to port: ${port}`)
  })
} catch (error) {
  console.log(error)
  process.exit(1)
}
