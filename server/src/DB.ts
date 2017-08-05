import { Moment } from 'moment'

export interface DBAction {
    getMonthItems(month: Moment): object
    saveItems(day: Moment, items: object): void
}