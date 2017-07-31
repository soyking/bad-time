import * as React from 'react'
import Calendar from 'rc-calendar'
import 'rc-calendar/assets/index.css'
import { Box } from 'react-polymer-layout'
import DateCell from './DateCell'
import { getDaysItems, getItems } from './api'
import * as moment from 'moment'

const levelColor = {
  1: '#FFFF99',
  2: '#FF6633',
}

interface State {
  items: Array<string>
  levels: object
  daysItems: object
}

export default class BadTimeCalendar extends React.Component<{}, State> {
  _dateRender(current, value) {
    let items = this.state.levels[current.format('YYYY-MM-DD')]
    let color = levelColor[items] ? levelColor[items] : ''
    let currentMonth = current.month() === value.month()
    return <DateCell date={current} color={color} currentMonth={currentMonth} />
  }

  _updateDaysItems(date) {
    getDaysItems(date.format('YYYY-MM'), daysItems => {
      let levels = {}
      for (const key of Object.keys(daysItems)) {
        let items = daysItems[key]
        let level = 0
        items.forEach(item => { if (item['state'] === 'damn') { level += 1 } })
        levels[key] = level
      }
      this.setState({ 'daysItems': daysItems, 'levels': levels })
    })
  }

  _onChange(date) {
    this._updateDaysItems(date)
  }

  constructor(props: any) {
    super(props)
    this.state = {
      'items': [],
      'levels': {},
      'daysItems': {}
    }
  }

  componentDidMount() {
    getItems(items => { this.setState({ 'items': items }) })
    this._updateDaysItems(moment(new Date()))
  }


  render() {
    return (
      <Box style={{ width: '100%' }} centerJustified>
        <Calendar
          style={{ width: 500 }}
          onSelect={() => { console.log('select') }}
          onChange={this._onChange.bind(this)}
          dateRender={this._dateRender.bind(this)}
          renderFooter={() => { return <div>footer</div> }}
          showToday={false}
        />
      </Box>
    );
  }
}
