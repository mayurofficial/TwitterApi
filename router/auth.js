const express = require('express')
const jwt = require('jsonwebtoken')
const authenticate = require('../middleware/authenticate')
const router = express.Router()
require('../db/conn')
const userController = require('../controller/user');
const User = require('../model/userSchema')
const middleware = (req, res, next) => {
    console.log('Hello my middleware')
    next()
}
router.get('/', (req, res) => {
    res.send("Homepage")
})


// User Signup
router.post('/signup', userController.userSignup)

// User Signin
router.post('/signin', userController.userSignin)

// Follow user
router.put("/:id/follow", authenticate, userController.userFollow)

//unfollow user



router.get('/tweet', authenticate, (req, res) => {
    // res.cookie("jwtoken", "token")
    res.send('Hi')
})



module.exports = router;