const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../../models/user')

// login page
router.get('/login', (req, res) => {
  res.render('login')
})

// register page
router.get('/register', (req, res) => {
  res.render('register')
})

// 註冊使用者
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  User.findOne({ email }) .then((user) => {
    if (user) {
      console.log('User already exists.')
      res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    } else {
      return User.create({
        name,
        email,
        password
      })
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
    }
  })
  .catch(err => console.log(err))
})

// 使用者登入
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

// 使用者登出
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

module.exports = router