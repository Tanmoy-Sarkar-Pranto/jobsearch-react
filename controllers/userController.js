import { StatusCodes } from "http-status-codes"
import cloudinary from "cloudinary"
import { promises as fs } from "fs"
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
  // console.log(req.file)
  const newUser = { ...req.body }
  delete newUser.password
  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path)
    await fs.unlink(req.file.path)
    newUser.avatar = response.secure_url
    newUser.avatarPublicID = response.public_id
  }
  const updatedUser = await User.findByIdAndUpdate(req.user.userID, newUser)

  if (req.file && updatedUser.avatarPublicID) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicID)
  }
  res.status(StatusCodes.OK).json({ user: "user updated" })
}
