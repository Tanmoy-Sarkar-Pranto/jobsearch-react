import { body, validationResult, param } from "express-validator"
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../errors/customError.js"
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js"
import mongoose from "mongoose"
import Job from "../model/JobModel.js"
import User from "../model/UserModel.js"

const withValidationMiddleware = (validationValues) => {
  return [
    validationValues,
    (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        const errorMessage = errors.array().map((error) => error.msg)
        if (errorMessage[0].startsWith("not authorized")) {
          throw new UnauthenticatedError("not authorized to access this route")
        }
        throw new BadRequestError(errorMessage)
      }
      next()
    },
  ]
}

export const validateTest = withValidationMiddleware([
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Length must be between 3 and 20")
    .trim(),
])

export const validateJobInput = withValidationMiddleware([
  body("company").notEmpty().withMessage("company is required"),
  body("position").notEmpty().withMessage("position is required"),
  body("jobLocation").notEmpty().withMessage("job location is required"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("Invalid status value"),
  body("jobType").isIn(Object.values(JOB_TYPE)).withMessage("Invalid job type"),
])

export const validateIdParam = withValidationMiddleware([
  param("id").custom(async (value, { req }) => {
    const isValidMongoID = mongoose.Types.ObjectId.isValid(value)
    if (!isValidMongoID) throw new BadRequestError("Invalid MongoDB ID")
    const job = await Job.findById(value)
    if (!job) throw new NotFoundError(`No job with ID: ${value}`)
    const isAdmin = req.user.role === "admin"
    const isOwner = req.user.userID === job.createdBy.toString()
    if (!isAdmin && !isOwner) {
      throw new UnauthenticatedError("not authorized to access this route")
    }
  }),
])

export const validateRegisterInput = withValidationMiddleware([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .custom(async (email) => {
      const user = await User.findOne({ email })
      if (user) {
        throw new BadRequestError("email already exists")
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be of minimum 8 characters"),
  body("location").notEmpty().withMessage("Location is required"),
  body("lastName").notEmpty().withMessage("lastname is required"),
])

export const validateLoginInput = withValidationMiddleware([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
])

export const validateUpdateUserInput = withValidationMiddleware([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email })
      if (user && user._id.toString() !== req.user.userID) {
        throw new Error("Email already exists")
      }
    }),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("location").notEmpty().withMessage("location is required"),
])
