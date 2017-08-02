let daysItems = {
    '2017-08-15': {
        'coke': 1,
        'coffee': 1
    }
}

export function getItems(done) {
    let items = [
        'coke',
        'coffee',
        'ice-cream',
        'eat-after-9'
    ]

    done(items)
}

export function getDaysItems(month, done) {
    done(daysItems)
}

export function updateDayItems(day, items, done) {
    daysItems[day] = items
    done()
}
