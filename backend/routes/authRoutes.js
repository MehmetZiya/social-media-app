import express from 'express'
import User from '../model/userModel.js'

const router = express.Router()

// REGISTER
router.route('/register').post(async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
  try {
    const user = await newUser.save()
    res.status(201).send(user)
  } catch (err) {
    console.log(err)
  }
})

export default router
