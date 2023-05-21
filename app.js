const express = require('express')
const routes = require('./routes')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

require('./config/mongoose')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')



app.use(routes)

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})