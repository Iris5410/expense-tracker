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

// edit 頁面
router.get('/:id/edit', async (req, res) => {
  try {
    const categories = await Category.find().lean()
    const _id = req.params.id
    const record = await Record.findOne({ _id }).lean()
    const category = await Category.findOne({ _id: record.categoryId }).lean()
    record.categoryName = category.name
    record.date = record.date.toISOString().slice(0, 10)
    res.render('edit', { categories, record })
  } catch (err) {
    console.log(err)
  }
})

// 修改支出
router.put('/:id', async (req, res) => {
  try {
    const _id = req.params.id
    const { name, date, categoryId, amount } = req.body
    return Record.findOneAndUpdate(
      { _id },
      {
        name,
        date,
        categoryId,
        amount
      })
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  } catch (err) {
    console.log(err)
  }
})

router.delete('/:id', (req, res) => {
  const _id = req.params.id
  return Record.findOneAndDelete({ _id })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router