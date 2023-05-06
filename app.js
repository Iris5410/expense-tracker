const express = require('express')
const app = express()
const port = 3000

const exhbs = require('express-handlebars')

app.engine('handlebars', exhbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})