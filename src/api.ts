export function getItems(done) {
    let items = [
        'coke',
        'coffee',
        'ice-cream'
    ]

    done(items)
}

export function getDaysItems(month: string, done) {
    console.log(month)
    let daysItems = {
        '2017-08-15': [
            {
                'item': 'coke',
                'state': 'damn'
            },
            {
                'item': 'coffee',
                'state': 'damn'
            }
        ]
    }

    done(daysItems)
}
