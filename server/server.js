const express = require('express')
const cors = require('cors')
const fs = require('fs')

const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3000

// GET ranking
app.get('/ranking', (req, res) => {
  const data = JSON.parse(
    fs.readFileSync('./db.json')
  )

  res.json(data)
})

// POST click
app.post('/click', (req, res) => {
  const data = JSON.parse(
    fs.readFileSync('./db.json')
  )

  const { nickname, clicks } = req.body

  const player = data.find(
    player => player.nickname === nickname
  )

  if (player) {
    player.clicks += clicks
  } else {
    data.push({
      nickname,
      clicks
    })
  }

  fs.writeFileSync(
    './db.json',
    JSON.stringify(data, null, 2)
  )

  res.json({
    message: 'click saved'
  })
})

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`)
})