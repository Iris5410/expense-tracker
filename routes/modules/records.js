const express = require('express')
const router = express.Router()

const Category = require('../../models/category')
const Record = require('../../models/record')

// new 頁面
router.get('/new', async (req, res) => {
  const categories = await Category.find().lean()
  res.render('new', { categories })
})

// 新增支出
router.post('/new', async (req, res) => {
  try {
    const { name, date, categoryId, amount } = req.body
    return Record.create({
      name,
      date,
      categoryId,
      amount
    })
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err))
  } catch (err) {
    console.log(err)
  }
})

module.exports = router