import xhr from 'xhr'

export const levelColor = {
    1: '#ffce3d',
    2: '#f78e3d',
    3: '#f04134',
    4: '#bd2636'
}

function getURL(path: string) {
    return '/api' + path
}

function xhrGet(path, callback) {
    xhr.get(getURL(path), (error, resp) => {
        if (error) {
            console.error(error)
        } else {
            if (resp && resp.body) {
                callback(JSON.parse(resp.body))
            }
        }
    })
}

export function getItems(callback) {
    xhrGet('/items', callback)
}

export function getDaysItems(month, callback) {
    xhrGet('/day/items?month=' + month, callback)
}

export function updateDayItems(day, items, callback) {
    xhr.post(getURL('/day/items'), {
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            day: day,
            items: items
        })
    }, (error, resp) => {
        if (error) {
            console.error(error)
        } else {
            callback()
        }
    })
}
