import xhr from 'xhr'

export const levelColor = {
    1: '#ffce3d',
    2: '#f78e3d',
    3: '#f04134',
    4: '#bd2636'
}

let daysItems = {
    '2017-08-13': {
        'coke': 0,
        'coffee': 0,
        'ice-cream': 0,
        'eat-after-9': 0
    },
    '2017-08-15': {
        'coke': 1,
        'coffee': 0,
        'ice-cream': 0,
        'eat-after-9': 0
    },
    '2017-08-17': {
        'coke': 1,
        'coffee': 1,
        'ice-cream': 0,
        'eat-after-9': 0
    },
    '2017-08-19': {
        'coke': 1,
        'coffee': 1,
        'ice-cream': 1,
        'eat-after-9': 0
    },
    '2017-08-21': {
        'coke': 1,
        'coffee': 1,
        'ice-cream': 1,
        'eat-after-9': 1
    }
}

function getURL(path: string) {
    return '/api' + path
}

export function getItems(done) {
    xhr.get(getURL('/items'), function (error, resp) {
        if (error) {
            console.error(error)
        } else {
            if (resp.err) {
                console.log(resp.err)
            } else {
                if (resp && resp.body) {
                    done(JSON.parse(resp.body))
                }
            }
        }
    })
}

export function getDaysItems(month, done) {
    done(daysItems)
}

export function updateDayItems(day, items, done) {
    daysItems[day] = items
    done()
}
