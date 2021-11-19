import express from 'express'
const router = express.Router()

import {
  createPost,
  deletePost,
  updatePost,
  likePost,
  getAPost,
  getAllPost,
} from '../controllers/postController.js'

router.route('/').post(createPost)
router.route('/:id').put(updatePost).delete(deletePost).get(getAPost)
router.route('/timeline/all').get(getAllPost)
router.route('/:id/like').put(likePost)

export default router
