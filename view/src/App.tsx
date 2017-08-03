import * as React from 'react'
import 'rc-calendar/assets/index.css'
import { Box } from 'react-polymer-layout'
import BadTimeCalendar from './BadTimeCalendar'

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <Box style={{ width: '100%' }} centerJustified>
        <BadTimeCalendar />
      </Box>
    );
  }
}
