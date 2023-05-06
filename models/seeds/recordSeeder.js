if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const mongoose = require('mongoose')
const Record = require('../record')
const User = require('../user')

const db = require('../../config/mongoose')

const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: 'qweqwe'
}

db.once('open', () => {
  User.create( SEED_USER )
  .then(() => {
    console.log('done.')
    process.exit()
  })
})

