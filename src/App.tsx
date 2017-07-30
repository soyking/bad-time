import * as React from 'react'
import Calendar from 'rc-calendar'
import 'rc-calendar/assets/index.css'
import { Box } from 'react-polymer-layout'
import DateCell from './DateCell'

const levelColor = {
  1: '#FFFF99',
  2: '#FF6633',
}

class App extends React.Component<{}, {}> {
  _dateRender(current, value) {
    let color = levelColor[this.state['level'][current.format('YYYY-MM-DD')]] || ''
    let currentMonth = current.month() === value.month()
    return <DateCell date={current} color={color} currentMonth={currentMonth} />
  }

  _getLevel() {
    return {
      '2017-08-04': 1,
      '2017-08-03': 1,
      '2017-08-02': 2,
      '2017-08-01': 2,
      '2017-07-31': 1,
      '2017-07-30': 1,
      '2017-07-29': 2,
      '2017-07-28': 1,
      '2017-07-27': 2,
      '2017-07-26': 2,
    }
  }

  constructor(props: any) {
    super(props)
    this.state = { 'level': this._getLevel() }
  }


  render() {
    return (
      <Box style={{ width: '100%' }} centerJustified>
        <Calendar
          style={{ width: 500 }}
          onSelect={() => { console.log('select') }}
          onChange={() => { console.log('change') }}
          dateRender={this._dateRender.bind(this)}
          renderFooter={() => { return <div>footer</div> }}
          showToday={false}
        />
      </Box>
    );
  }
}

export default App
