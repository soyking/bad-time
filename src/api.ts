export function getItems(done) {
    let items = [
        'coke',
        'coffee',
        'ice-cream'
    ]

    done(items)
}

export function getDaysItems(month: string, done) {
    let daysItems = {
        '2017-08-15': {
            'coke': 1,
            'coffee': 1
        }
    }

    done(daysItems)
}
