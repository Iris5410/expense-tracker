const express = require('express')
const router = express.Router()

const Category = require('../../models/category')
const Record = require('../../models/record')
const { totalAmount } = require('../../utilities/amount')

router.get('/', async (req, res) => {
  try {
    const records = await Record.find().lean() // 所有紀錄

    // 找出categoryId
    const recordWithCategoryId = await Promise.all(records.map(async (record) => {
      const categoryId = record.categoryId
      const category = await Category.findOne({ _id: categoryId }).lean()
      return {
        name: record.name,
        date: record.date.toLocaleDateString(),
        amount: record.amount,
        image: category.icon
      }
    }))
    console.log(recordWithCategoryId)
    res.render('index', { records: recordWithCategoryId, totalAmount: totalAmount(records) })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router