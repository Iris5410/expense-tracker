const express = require('express')
const mongoose = require('mongoose')
const Category = require('./models/category')
const Record = require('./models/record')
const User = require('./models/user')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

require('./config/mongoose')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', async (req, res) => {
  try {
    const records = await Record.find() .lean() // 所有紀錄
    const categories = await Category.find() .lean()

    // 找出categoryId
    const recordWithCategoryId = await Promise.all(records.map(async (record) => {
      const categoryId = record.categoryId
      const category = await Category.findOne({ _id: categoryId }) .lean()
      return {
        name: record.name,
        date: record.date.toLocaleDateString(),
        amount: record.amount,
        image: category.icon
      }
    }))
    console.log(recordWithCategoryId)
    res.render('index', { records: recordWithCategoryId })
  } catch (err) {
    console.log(err)
  }
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})