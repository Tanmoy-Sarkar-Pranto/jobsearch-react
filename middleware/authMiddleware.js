import {
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/customError.js"
import { verifyJWT } from "../utils/tokenUtils.js"

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies
  if (!token) {
    throw new UnauthenticatedError("authentication invalid")
  }
  try {
    const { userID, role } = verifyJWT(token)
    req.user = { userID, role }
    next()
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid")
  }
}

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Unauthorized to access this route")
    }
    next()
  }
}