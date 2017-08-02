
import { Box } from 'react-polymer-layout'
import * as React from 'react'
import { Moment } from 'moment'

export interface DateCellProps {
    date: Moment
    color: string
    currentMonth: boolean
    currentDay: boolean
}

export default class DateCell extends React.Component<DateCellProps, {}> {
    render() {
        let { date, color, currentMonth, currentDay } = this.props
        let fontColor = currentMonth ? '#000' : '#aaa'
        color = currentDay ? color || '#d2d2d2' : color
        return (
            <Box centerJustified>
                < Box center centerJustified style={{
                    width: 26,
                    height: 26,
                    backgroundColor: color,
                    cursor: 'pointer',
                    border: 10
                }
                }>
                    <div key={date.format('MMMM Do YYYY, h:mm:ss')}
                        style={{
                            color: fontColor
                        }}
                    >
                        {date.date()}
                    </div>
                </Box >
            </Box >
        )
    }
}
