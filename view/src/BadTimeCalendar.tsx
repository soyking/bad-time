import * as React from 'react'
import Calendar from 'rc-calendar'
import 'rc-calendar/assets/index.css'
import { Box } from 'react-polymer-layout'
import DateCell from './DateCell'
import { getDaysItems, getItems, levelColor } from './api'
import * as moment from 'moment'
import DateState from './DateState'

interface BadTimeCalendarState {
  items: Array<string>
  levels: object
  daysItems: object
  current: moment.Moment
}

export default class BadTimeCalendar extends React.Component<{}, BadTimeCalendarState> {
  _dateRender(current, value) {
    let items = this.state.levels[current.format('YYYY-MM-DD')]
    let color = levelColor[items] ? levelColor[items] : ''
    let currentMonth = current.month() === value.month()
    let currentDay = current.format('YYYY-MM-DD') === value.format('YYYY-MM-DD')
    return <DateCell date={current} color={color} currentMonth={currentMonth} currentDay={currentDay} />
  }

  _updateDaysItems(date) {
    getDaysItems(date.format('YYYY-MM'), daysItems => {
      let levels = {}
      for (const day of Object.keys(daysItems)) {
        let items = daysItems[day]
        let level = 0
        for (const itemKey of Object.keys(items)) {
          if (items[itemKey]) { level += 1 }
        }
        levels[day] = level
      }
      this.setState({ 'daysItems': daysItems, 'levels': levels })
    })
  }

  _onChange(date) {
    this._updateDaysItems(date)
    this.setState({ 'current': date })
  }

  _getFooter() {
    let currentItems = this.state.daysItems[this.state.current.format('YYYY-MM-DD')] || {}
    let daysItems = this.state.daysItems
    let itemCount = {}
    for (const day of Object.keys(daysItems)) {
      let dayItems = daysItems[day]
      let count = 0;
      for (const item of Object.keys(dayItems)) {
        if (dayItems[item]) { count += 1 }
      }
      if (count) {
        itemCount[count] = itemCount[count] ? itemCount[count] + 1 : 1
      }
    }
    return <DateState
      items={this.state.items}
      currentItems={currentItems}
      current={this.state.current}
      itemCount={itemCount}
      onChange={() => this._onChange(this.state.current)}
    />
  }

  constructor(props: any) {
    super(props)
    this.state = {
      'items': [],
      'levels': {},
      'daysItems': {},
      'current': moment(new Date())
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
          onChange={this._onChange.bind(this)}
          dateRender={this._dateRender.bind(this)}
          renderFooter={this._getFooter.bind(this)}
          showToday={false}
        />
      </Box>
    );
  }
}
