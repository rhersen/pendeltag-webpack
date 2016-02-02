require("./style.css")

var trains = require("./trains.hbs")
var format = require("./format")
var ajax = require("./ajax")

window.getDepartures = function (locationSignature) {
    return ajax('departures/' + locationSignature, handleJsonResponse)

    function handleJsonResponse(data) {
        var htmlString = trains(data.RESPONSE.RESULT[0].TrainAnnouncement.map(format))
        var $trains = document.getElementById('trains')

        if ($trains)
            $trains.outerHTML = htmlString
        else
            document.getElementById('navs').insertAdjacentHTML('afterend', htmlString)
    }
}

document.write(require("./template.hbs")())
