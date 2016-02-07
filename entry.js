require("./style.css")

var _ = require('lodash')

var trains = require("./trains.hbs")

var format = require("./format")
var ajax = require("./ajax")

var names = {}

document.querySelector('body').insertAdjacentHTML('beforeend', require("./template.hbs")())

document.getElementById('index').addEventListener('click', handleIndex)

var $divs = document.querySelectorAll('#navs nav div')
for (var i = 0; i < $divs.length; i++)
    $divs[i].addEventListener('click', handleClickStation)

ajax('api/stations', function (data) {
    var stations = _.first(data.RESPONSE.RESULT).TrainStation
    names = _.zipObject(_.map(stations, 'LocationSignature'), _.map(stations, 'AdvertisedShortLocationName'))

    for (var i = 0; i < $divs.length; i++) {
        var $div = $divs[i]
        var key = $div.dataset.location
        $div.textContent = names[key] || key
    }
})

function handleIndex() {
    for (var i = 0; i < $divs.length; i++) {
        var $div = $divs[i]
        $div.style.display = ''
    }

    document.getElementById('trains').innerHTML = ''
}

function handleClickStation() {
    for (var i = 0; i < $divs.length; i++) {
        var $div = $divs[i]
        $div.style.display = $div.dataset.location === this.dataset.location ? '' : 'none'
    }

    return ajax('api/departures/' + this.dataset.location, handleJsonResponse)

    function handleJsonResponse(data) {
        var trainAnnouncements = data.RESPONSE.RESULT[0].TrainAnnouncement;
        document.getElementById('trains').innerHTML = trains(trainAnnouncements.map(_.partial(format, names)))
    }
}
