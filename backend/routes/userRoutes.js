import express from 'express'
const router = express.Router()

import {
  deleteUser,
  followAUser,
  getAUser,
  updateUser,
  unfollowAUser,
} from '../controllers/userController.js'

router.route('/:id').get(getAUser).put(updateUser).delete(deleteUser)
router.route('/:id/follow').put(followAUser)
router.route('/:id/unfollow').put(unfollowAUser)

export default router
