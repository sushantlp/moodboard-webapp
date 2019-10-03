const express = require('express')
const app = express()
const cors = require('cors')
const linkRoutes = require('./routes/link')

app.use(cors())
app.use(linkRoutes)

module.exports = app