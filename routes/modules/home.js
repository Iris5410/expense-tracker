const express = require('express')
const router = express.Router()

const Category = require('../../models/category')
const Record = require('../../models/record')
const { totalAmount } = require('../../utilities/amount')

// 所有紀錄
router.get('/', async (req, res) => {
  try {
    const userId = req.user._id
    const records = await Record .find({ userId }) .lean() .sort({ date: 'asc' }) // 找出所有紀錄 並依日期排序

    // 找出categoryId
    const recordWithCategoryId = await Promise.all(records.map(async (record) => {
      const categoryId = record.categoryId
      const category = await Category.findOne({ _id: categoryId }).lean()
      return {
        ...record,
        date: record.date.toLocaleDateString(),
        image: category.icon
      }
    }))
    res.render('index', { records: recordWithCategoryId, totalAmount: totalAmount(records) })
  } catch (err) {
    console.log(err)
  }
})

// 選取特定類別的紀錄
router.get('/search', async (req, res) => {
  const category = req.query.category
  const userId = req.user._id
  try {
    const categoryWithId = await Category.findOne({ name: category }) .lean()
    const records = await Record.find({ userId, categoryId: categoryWithId._id}) .lean()
    const sortedRecords = await Promise.all(records.map(async record => {
    return {
      ...record,
      date: record.date.toLocaleDateString(),
      image: categoryWithId.icon
    }}))
    res.render('index', { records: sortedRecords, totalAmount: totalAmount(records) })
  } catch (err) {
    console.log(err)
  }
})


module.exports = router