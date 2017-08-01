
import { Box } from 'react-polymer-layout'
import * as React from 'react'
import { Moment } from 'moment'

export interface DateCellProps {
    date: Moment
    color: string
    currentMonth: boolean
}

export default class DateCell extends React.Component<DateCellProps, {}> {
    render() {
        let { date, color, currentMonth } = this.props
        let fontColor = currentMonth ? '#000' : '#aaa'
        return (
            <Box centerJustified>
                <Box center centerJustified style={{
                    width: 26,
                    height: 26,
                    backgroundColor: color
                }}>
                    <div key={date.format('MMMM Do YYYY, h:mm:ss')}
                        style={{
                            color: fontColor
                        }}
                    >
                        {date.date()}
                    </div>
                </Box>
            </Box>
        )
    }
}
