import { nanoid } from "nanoid"
import StatusCodes from "http-status-codes"

import Job from "../model/JobModel.js"

import {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/customError.js"
export const getAllJobs = async (req, res) => {
  console.log(req.user)
  const jobs = await Job.find({ createdBy: req.user.userID })
  res.status(StatusCodes.OK).json({ jobs })
}

export const createJob = async (req, res) => {
  // console.log(req.body)
  req.body.createdBy = req.user.userID
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}

export const getJob = async (req, res) => {
  const { id } = req.params
  // console.log(id)
  const job = await Job.findById(id)

  res.status(StatusCodes.OK).json({ job })
}

export const updateJob = async (req, res) => {
  const { company, position } = req.body
  // if (!company || !position) {
  //   throw new BadRequestError("please provide both company and position")
  // }
  const { id } = req.params
  const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true })

  res.status(200).json({ msg: "job modified", job: updatedJob })
}

import mongoose from "mongoose"

export const deleteJob = async (req, res) => {
  const { id } = req.params
  try {
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   throw new BadRequestError("Invalid job id")
    // }

    const removedJob = await Job.findByIdAndDelete(id)

    res.status(200).json({ msg: "Job deleted", removedJob })
  } catch (error) {
    console.error(error.message)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error")
  }
}
