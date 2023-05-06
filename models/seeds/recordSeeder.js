if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const mongoose = require('mongoose')
const Record = require('../record')
const User = require('../user')
const Category = require('../category')

const db = require('../../config/mongoose')

// 種子資料
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: 'qweqwe'
}

const SEED_RECORD = [
  { name: '洗衣服', amount: 20, category: '家居物業' },
  { name: '機車加油', amount: 150, category: '交通出行' },
  { name: '運動鞋', amount: 2700, category: '其他' },
  { name: '麻辣烤魚', amount: 1599, category: '餐飲食品' },
  { name: '水電費', amount: 500, category: '家居物業' },
  { name: '串燒', amount: 1300, category: '餐飲食品' },
  { name: '回診拿藥', amount: 1680, category: '其他' }
]

db.once('open', async () => {
  try {
    const categories = await Category.find().lean()

    const recordWithCategoryId = SEED_RECORD.map(record => {
      for (const category of categories) {
        if (record.category === category.name) {
          const categoryId = category._id
          return {
            name: record.name,
            amount: record.amount,
            categoryId
          }
        }
      }
    })
    const user = await User.create(SEED_USER)
    for (const record of recordWithCategoryId) {
      record.userId = user._id
      await Record.create(record)
    }
  } catch (err) {
    console.error(err)
  }
  console.log('recordSeeder done.')
  process.exit()
})