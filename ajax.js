var _ = require('lodash')

function onload(callback) {
    if (this.status >= 200 && this.status < 400)
        callback(JSON.parse(this.response))
    else
        console.log('We reached our target server, but it returned an error')
}

function onerror() {
    console.log('There was a connection error of some sort')
}

module.exports = function (url, callback) {
    var request = new XMLHttpRequest()

    request.open('GET', url, true)
    request.onload = _.partial(onload, callback)
    request.onerror = onerror
    request.send()

    return false
}