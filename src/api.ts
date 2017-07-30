export function getItems(done) {
    let items = [
        "coke",
        "coffee",
        "ice-cream"
    ]

    done(items)
}

export function getDaysItems(from: string, to: string, done) { 
    let daysItems = [
        {
            "date": "2017-07-30",
            "items": [
                {
                    "item": "coke",
                    "state": "damn"
                }
            ]
        },
        {
            "date": "2017-07-30",
            "items": [
                {
                    "item": "coke",
                    "state": "damn"
                },
                {
                    "item": "coffee",
                    "state": "damn"
                }
            ]
        },
        {
            "date": "2017-07-30",
            "items": [
                {
                    "item": "coke",
                    "state": "damn"
                },
                {
                    "item": "coffee",
                    "state": "damn"
                },
                {
                    "item": "ice-cream",
                    "state": "damn"
                }
            ]
        }
    ]

    done(daysItems)
}
