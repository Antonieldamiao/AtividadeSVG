const express = require('express')
const app = express()
const db = require('./consultas/queries')
const port = 3000

app.get('/getSvg/:nome', db.getSVG)
app.get('/getViewBox/:nome', db.getViewBox)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})