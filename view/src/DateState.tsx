
import { Box } from 'react-polymer-layout'
import * as React from 'react'
import { Moment } from 'moment'
import { updateDayItems, levelColor } from './api'

export interface DateStateProps {
    items: Array<string>
    currentItems: object,
    current: Moment,
    itemCount: object,
    itemStat: object
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
        let { items, currentItems, itemCount, itemStat } = this.props
        let states = items.map(item => {
            return {
                'item': item,
                'state': currentItems[item] ? true : false
            }
        })

        let monthStates = Array<object>()
        for (const level of Object.keys(levelColor)) {
            monthStates.push({ 'count': itemCount[level] || 0, 'color': levelColor[level] })
        }
        let awesome = monthStates.every((state) => { return state['count'] === 0 })
        let monthStatesComponent = awesome ? <div style={{ paddingLeft: 20, fontWeight: 900 }}>AWESOME!</div> :
            monthStates.map(state => {
                return <Box center centerJustified style={{ marginLeft: 20 }} key={Math.random()}>
                    <div style={{ width: 15, height: 15, backgroundColor: state['color'] }} />
                    <div style={{ width: 20 }}>{state['count']}</div>
                </Box>
            })
        let monthItemComponent = awesome ? <div style={{ fontWeight: 900 }}>AWESOME!</div> :
            Object.keys(itemStat).map(function (key, index) {
                return <Box style={{ width: '100%' }} key={key}>
                    <Box key={key} style={{ width: 167 }}>
                        {key}
                    </Box>
                    <Box style={{ width: 50 }}>
                        {itemStat[key]}
                    </Box>
                </Box>
            })


        return (
            <Box vertical style={{ padding: '0px 10px 10px 34px', fontSize: 15 }}>
                <Box style={{ marginBottom: 10, marginLeft: 3 }} vertical>
                    <Box style={{ height: 50 }} center>
                        <div style={{ width: 100 }}>Month States:</div>
                        {monthStatesComponent}
                    </Box>
                    <Box>
                        <div style={{ width: 100 }}>Items States:</div>
                        <Box style={{ paddingLeft: 21 }} vertical start flex>
                            {monthItemComponent}
                        </Box>
                    </Box>
                </Box>
                <div style={{ paddingTop: 20, paddingBottom: 20 }}>
                    <div style={{ width: '100%', height: 1, background: '#E0E0E0' }}></div>
                </div>
                <Box style={{ width: '100%' }} wrap>
                    {states.map(state => {
                        return <Box flex key={state['item']} center>
                            <input type='checkbox' checked={state['state']} onChange={(e) => { this._onChange.bind(this)(e, state['item']) }} />{state['item']}
                        </Box>
                    })}
                </Box>
            </Box >
        )
    }
}
