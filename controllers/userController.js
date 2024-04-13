import { StatusCodes } from "http-status-codes"

import User from "../model/UserModel.js"
import Job from "../model/JobModel.js"

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userID })
  const userWithoutPassword = user.toJSON()
  res.status(StatusCodes.OK).json({ user: userWithoutPassword })
}

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments()
  const jobs = await Job.countDocuments()
  res.status(StatusCodes.OK).json({ users, jobs })
}

export const updateUser = async (req, res) => {
  const updateUser = await User.findByIdAndUpdate(req.user.userID, req.body)
  res.status(StatusCodes.OK).json({ user: "user updated" })
}
