import asyncHandler from 'express-async-handler'
//import generateToken from '../utils/generateToken.js'
import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
      } catch (err) {
        return res.status(500).json(err)
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      })
      res.status(200).json('Account has been updated')
    } catch (err) {
      return res.status(500).json(err)
    }
  } else {
    return res.status(403).json('You can update only your account!')
  }
})

// @desc Delete User
// @route DELETE /api/users/:id
// @access  Private

const deleteUser = asyncHandler(async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id)

      res.status(200).json('Account has been deleted')
    } catch (err) {
      return res.status(500).json(err)
    }
  } else {
    return res.status(403).json('You can delete only your account!')
  }
})

// @desc Get a User
// @route GET /api/users/:id

const getAUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password')
    res.status(200).json(user)
  } catch (err) {
    return res.status(500).json(err)
  }
})

// @desc    Follow a user
// @route   PUT /api/users/:id/follow
// @access  Private
const followAUser = asyncHandler(async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.body.userId)

      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } })
        await currentUser.updateOne({ $push: { followings: req.params.id } })
        res.status(200).json('User has been followed')
      } else {
        res.status(403).json('You already follow this user')
      }
    } catch (err) {
      return res.status(500).json(err)
    }
  } else {
    return res.status(403).json('You cant follow yourself')
  }
})

// @desc    Unfollow a user
// @route   PUT /api/users/:id/unfollow
// @access  Private
const unfollowAUser = asyncHandler(async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.body.userId)

      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } })
        await currentUser.updateOne({ $pull: { followings: req.params.id } })
        res.status(200).json('User has been unfollowed')
      } else {
        res.status(403).json('You already unfollow this user')
      }
    } catch (err) {
      return res.status(500).json(err)
    }
  } else {
    return res.status(403).json('You cant unfollow yourself')
  }
})

export { updateUser, deleteUser, getAUser, followAUser, unfollowAUser }
