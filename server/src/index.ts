import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as moment from 'moment'
import { DBAction } from './DB'
import FileDB from './FileDB'

const app = express()
app.use(bodyParser.json());

const db: DBAction = new FileDB('db')
const items: Array<string> = [
  'coke',
  'coffee',
  'ice-cream',
  'eat-after-9'
]
const validState = [0, 1]

app.get('/api/items', function (req, res) {
  res.send(items)
})

app.get('/api/day/items', function (req, res) {
  let month = req.query['month']
  if (!month) {
    res.status(400).send('Withoud month')
    return
  }

  let monthMoment = moment(month)
  if (!monthMoment.isValid()) {
    res.status(400).send('Bad Moment')
    return
  }

  res.send(db.getMonthItems(monthMoment))
})

app.post('/api/day/items', function (req, res) {
  let dayItemsBody = req.body
  let day = dayItemsBody['day']
  let dayItems = dayItemsBody['items']
  if (!day || !dayItems || typeof (day) !== 'string' || typeof (dayItems) !== 'object') {
    res.status(400).send('Bad Request')
  } else {
    let dayMoment = moment(day)
    if (!dayMoment.isValid()) {
      res.status(400).send('Bad Moment')
      return
    }

    let filteredItems = {}
    items.map(item => {
      let state = dayItems[item] || 0
      if (typeof (state) === 'number' && state in validState) {
        filteredItems[item] = state
      }
    })

    try {
      db.saveItems(dayMoment, filteredItems)
    } catch (err) {
      res.status(500).send(err.message)
      return
    }
    res.send('ok')
  }
})

app.listen(3001, function () {
  console.log('Bad Time is Running')
})

