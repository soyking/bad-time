
import { Box } from 'react-polymer-layout'
import * as React from 'react'

export interface Props {
    items: Array<string>
    currentItems: object
}

export default class DateState extends React.Component<Props, {}> {
    static defaultProps = {
        'items': [],
        'currentItems': []
    }

    render() {
        let { items, currentItems } = this.props
        let states = items.map(item => {
            return {
                'item': item,
                'state': currentItems[item] ? true : false
            }
        })
        return (
            <Box style={{ width: '100%', padding: '10px 10px 10px 34px' }}>
                {states.map(state => {
                    return <Box flex key={state['item']}><input type='checkbox' checked={state['state']} />{state['item']}</Box>
                })}
            </Box>
        )
    }
}
