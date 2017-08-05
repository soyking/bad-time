import { DBAction } from './DB'
import { Moment } from 'moment'
import * as fs from 'fs'
import * as path from 'path'

export default class FileDB implements DBAction {
    private fileDir: string

    constructor(folder: string) {
        try {
            fs.mkdirSync(folder)
        } catch (err) {
            if (err.code !== 'EEXIST') {
                throw err
            }
        }

        let stat = fs.statSync(folder)
        if (!stat.isDirectory()) {
            throw new Error(`${folder} is not directory`)
        }

        this.fileDir = folder
    }

    getMonthItems(month: Moment): object {
        let daysItemsFile = path.join(this.fileDir, month.format('YYYY-MM') + '.json')
        try {
            let data = fs.readFileSync(daysItemsFile, 'utf-8')
            return JSON.parse(data)
        } catch (err) {
            if (err.code === 'ENOENT') {
                return {}
            } else {
                throw err
            }
        }
    }

    saveItemsToFile(filename: string, daysItems: object) {
        let fd = fs.openSync(filename, 'w')
        fs.writeSync(fd, JSON.stringify(daysItems))
    }

    saveItems(day: Moment, items: object) {
        let daysItemsFile = path.join(this.fileDir, day.format('YYYY-MM') + '.json')
        let dayStr = day.format('YYYY-MM-DD')

        let data = null
        try {
            data = fs.readFileSync(daysItemsFile, 'utf-8')
        } catch (err) {
            if (err.code === 'ENOENT') {
                this.saveItemsToFile(daysItemsFile, { dayStr: items })
            } else {
                throw err
            }
        }

        data = data || '{}'
        let daysItems = JSON.parse(data)
        daysItems[dayStr] = items
        this.saveItemsToFile(daysItemsFile, daysItems)
    }
}