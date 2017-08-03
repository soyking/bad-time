import * as express from 'express'
const app = express()

app.get('/api/items', function (req, res) {
  res.send([
    'coke',
    'coffee',
    'ice-cream',
    'eat-after-9'
  ])
})

app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
})

