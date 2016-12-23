require("./style.css")

const _ = require('lodash')

const trains = require("./trains.hbs")

const format = require("./format")
const ajax = require("./ajax")

let names = {}

document.querySelector('body').insertAdjacentHTML('beforeend', require("./template.hbs")())

document.getElementById('index').addEventListener('click', handleIndex)

const $divs = document.querySelectorAll('#navs nav div')
for (let i = 0; i < $divs.length; i++)
    $divs[i].addEventListener('click', handleClickStation)

ajax('api/stations', function (data) {
    const stations = _.first(data.RESPONSE.RESULT).TrainStation
    names = _.zipObject(_.map(stations, 'LocationSignature'), _.map(stations, 'AdvertisedShortLocationName'))

    for (let i = 0; i < $divs.length; i++) {
        const $div = $divs[i]
        const key = $div.dataset.location
        $div.textContent = names[key] || key
    }
})

function handleIndex() {
    for (let i = 0; i < $divs.length; i++) {
        $divs[i].style.display = ''
    }

    document.getElementById('trains').innerHTML = ''
}

function handleClickStation() {
    for (let i = 0; i < $divs.length; i++) {
        const $div = $divs[i]
        $div.style.display = $div.dataset.location === this.dataset.location ? '' : 'none'
    }

    return ajax('api/departures?since=0:15&until=0:59&locations=' + this.dataset.location, handleJsonResponse)

    function handleJsonResponse(data) {
        const trainAnnouncements = data.RESPONSE.RESULT[0].TrainAnnouncement
        document.getElementById('trains').innerHTML = trains(trainAnnouncements.map(_.partial(format, names)))
    }
}
