
import { Box } from 'react-polymer-layout'
import * as React from 'react'
import { Moment } from 'moment'
import { updateDayItems } from './api'

export interface DateStateProps {
    items: Array<string>
    currentItems: object,
    current: Moment,
    onChange: () => void
}

export interface DateStateState {
    currentItems: object
}

export default class DateState extends React.Component<DateStateProps, DateStateState> {
    static defaultProps = {
        'items': [],
        'currentItems': []
    }

    _onChange(e, item) {
        let day = this.props.current.format('YYYY-MM-DD')
        let currentItems = this.state.currentItems
        currentItems[item] = e.target.checked ? 1 : 0
        updateDayItems(day, currentItems, () => {
            this.props.onChange()
        })
    }

    componentDidMount() {
        this.setState({ 'currentItems': this.props.currentItems })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ 'currentItems': nextProps.currentItems })
    }

    constructor(props: any) {
        super(props)
        this.state = {
            'currentItems': {}
        }
    }

    render() {
        let { items } = this.props
        let currentItems = this.state.currentItems
        let states = items.map(item => {
            return {
                'item': item,
                'state': currentItems[item] ? true : false
            }
        })
        return (
            <Box style={{ width: '100%', padding: '10px 10px 10px 34px' }} wrap>
                {states.map(state => {
                    return <Box flex key={state['item']}>
                        <input type='checkbox' checked={state['state']} onChange={(e) => { this._onChange.bind(this)(e, state['item']) }} />{state['item']}
                    </Box>
                })}
            </Box>
        )
    }
}
