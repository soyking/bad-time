
import { Box } from 'react-polymer-layout'
import * as React from 'react'
import { Moment } from 'moment'
import { updateDayItems, levelColor } from './api'

export interface DateStateProps {
    items: Array<string>
    currentItems: object,
    current: Moment,
    itemCount: object,
    onChange: () => void
}

export default class DateState extends React.Component<DateStateProps, {}> {
    static defaultProps = {
        'items': [],
        'currentItems': []
    }

    _onChange(e, item) {
        let day = this.props.current.format('YYYY-MM-DD')
        let { currentItems } = this.props
        currentItems[item] = e.target.checked ? 1 : 0
        updateDayItems(day, currentItems, () => {
            this.props.onChange()
        })
    }

    constructor(props: any) {
        super(props)
        this.state = {
            'currentItems': {}
        }
    }

    render() {
        let { items, currentItems, itemCount } = this.props
        let states = items.map(item => {
            return {
                'item': item,
                'state': currentItems[item] ? true : false
            }
        })
        let todayStates = Array<object>()
        for (const level of Object.keys(itemCount)) {
            todayStates.push({ 'level': itemCount[level], 'color': levelColor[level] })
        }
        let awesome = todayStates.length === 0
        return (
            <Box vertical style={{ padding: '0px 10px 10px 34px', fontSize: 15 }}>
                <Box style={{ marginBottom: 10, marginLeft: 3, height: 50 }} center>
                    Month State: {todayStates.map(state => {
                        return <Box center centerJustified style={{ marginLeft: 20 }} key={Math.random()}>
                            <div style={{ width: 15, height: 15, backgroundColor: state['color'] }} />
                            <div style={{ width: 20 }}>{state['level']}</div>
                        </Box>
                    })}
                    {awesome ? <div style={{ paddingLeft: 20, fontWeight: 900 }}>AWESOME!</div> : null}
                </Box>
                <Box style={{ width: '100%' }} wrap>
                    {states.map(state => {
                        return <Box flex key={state['item']} center>
                            <input type='checkbox' checked={state['state']} onChange={(e) => { this._onChange.bind(this)(e, state['item']) }} />{state['item']}
                        </Box>
                    })}
                </Box>
            </Box>
        )
    }
}
