import asyncHandler from 'express-async-handler'
//import generateToken from '../utils/generateToken.js'
//import bcrypt from 'bcryptjs'
import Post from '../models/postModel.js'
import User from '../models/userModel.js'

// @desc    Create a post
// @route   POST /api/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
  const newPost = new Post(req.body)
  try {
    const savedPost = await newPost.save()
    res.status(201).json(savedPost)
  } catch (err) {
    res.status(500).json(err)
  }
})

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body })
      res.status(201).json('The post has been updated!')
    } else {
      res.status(403).json('You can update only your posts')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (post.userId === req.body.userId) {
      await post.deleteOne()
      res.status(201).json('The post has been deleted!')
    } else {
      res.status(403).json('You can delete only your posts')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

// @desc    Like/Dislike a post
// @route   PUT /api/posts/:id/like
// @access  Private
const likePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } })
      res.status(201).json('The post has been liked!')
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } })
      res.status(201).json('The post has been disliked!')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

// @desc    Get a post
// @route   GET /api/posts/:id
const getAPost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json(err)
  }
})

// @desc    Get all post
// @route   GET /api/posts/timeline
const getAllPost = asyncHandler(async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId)
    const posts = await Post.find({ userId: currentUser._id })
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId })
      })
    )
    res.json(posts.concat(...friendPosts))
  } catch (err) {
    res.status(500).json(err)
  }
})

export { createPost, updatePost, deletePost, likePost, getAPost, getAllPost }
