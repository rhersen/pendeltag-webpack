function time(train, field) {
    var s = train[field + 'TimeAtLocation']

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
    var actual = time(train, '');
    var estimated = time(train, 'Estimated');
    var advertised = time(train, 'Advertised');

    return {
        ident: train.AdvertisedTrainIdent,
        direction: /[02468]$/.test(train.AdvertisedTrainIdent) ? 'northbound' : 'southbound',
        time: actual || estimated || advertised,
        realtime: actual ? 'actual' : estimated ? 'estimated' : 'advertised',
        location: location(names, train)
    }
}
