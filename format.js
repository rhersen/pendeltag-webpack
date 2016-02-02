module.exports = function (train) {
    return {
        advertised: train.AdvertisedTimeAtLocation.substr(11, 5),
        location: train.ToLocation[0].LocationName
    }
}
