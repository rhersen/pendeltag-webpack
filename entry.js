require("./style.css")

var trains = require("./trains.hbs")
var format = require("./format")
var ajax = require("./ajax")

document.querySelector('body').insertAdjacentHTML('beforeend', require("./template.hbs")())

var as = document.querySelectorAll('#navs nav div')
for (var i = 0; i < as.length; i++) {
    as[i].addEventListener('click', handleClick)
}

function handleClick() {
    var selected = document.querySelector('.selected')
    if (selected)
        selected.classList.remove('selected')

    document.getElementById('navs').classList.add('inactive')
    this.classList.add('selected')

    return ajax('departures/' + this.dataset.location, handleJsonResponse)

    function handleJsonResponse(data) {
        var htmlString = trains(data.RESPONSE.RESULT[0].TrainAnnouncement.map(format))
        var $trains = document.getElementById('trains')

        if ($trains)
            $trains.outerHTML = htmlString
        else
            document.getElementById('navs').insertAdjacentHTML('afterend', htmlString)
    }
}
