import { Router } from "express"
const router = Router()

import {
  createJob,
  deleteJob,
  getAllJobs,
  getJob,
  updateJob,
  showStats,
} from "../controllers/jobController.js"
import {
  validateJobInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js"
import { checkForTestUser } from "../middleware/authMiddleware.js"

router
  .route("/")
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createJob)

router.get("/stats", showStats)
router
  .route("/:id")
  .get(validateIdParam, getJob)
  .patch(checkForTestUser, validateJobInput, validateIdParam, updateJob)
  .delete(checkForTestUser, validateIdParam, deleteJob)

export default router
