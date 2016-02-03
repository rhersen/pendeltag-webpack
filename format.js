function time(train, field) {
    var s = train[field + 'TimeAtLocation'];

    if (!s)
        return ''

    if (s.length > 11)
        return s.substr(11, 5)

    return s
}

function location(train) {
    var a = train.ToLocation;
    if (a && a.length)
        return a[0].LocationName;
    else
        return '?'

}

module.exports = function (train) {
    return {
        advertised: time(train, 'Advertised'),
        estimated: time(train, 'Estimated'),
        actual: time(train, ''),
        location: location(train)
    }
}
