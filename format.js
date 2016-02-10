function removeDate(s) {
    if (!s)
        return ''

    if (s.length > 11)
        return s.substr(11, 5)

    return s
}

function location(names, train) {
    var locations = train.ToLocation

    if (locations && locations.length)
        return getName(locations[0].LocationName, names)

    return '?'
}

function getName(key, names) {
    return names[key] || key
}

module.exports = function (names, train) {
    var actual = train.TimeAtLocation
    var estimated = train.EstimatedTimeAtLocation
    var advertised = train.AdvertisedTimeAtLocation

    var s = actual || estimated || advertised;
    var now = new Date()
    var minutes = now.getTimezoneOffset() + (Date.parse(s) - now) / 60000;

    return {
        ident: train.AdvertisedTrainIdent,
        direction: /[02468]$/.test(train.AdvertisedTrainIdent) ? 'northbound' : 'southbound',
        time: removeDate(s),
        minutes: minutes.toFixed(1),
        realtime: actual ? 'actual' : estimated ? 'estimated' : 'advertised',
        location: location(names, train)
    }
}
