require("./style.css");

var content = require("./template.hbs");
var trains = require("./trains.hbs");

window.getDepartures = function (locationSignature) {
    console.log('GET');
    var request = new XMLHttpRequest();
    request.open('GET', 'departures/' + locationSignature, true);

    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            console.log('Success!');
            var data = JSON.parse(this.response);
            console.log(data);
            var htmlString = trains(data.RESPONSE.RESULT[0].TrainAnnouncement.map(function (train) {
                return {
                    advertised: train.AdvertisedTimeAtLocation.substr(11, 5),
                    location: train.ToLocation[0].LocationName
                };
            }));
            var $trains = document.getElementById('trains');
            if ($trains) {
                $trains.outerHTML = htmlString;
            } else {
                document.getElementById('navs').insertAdjacentHTML('afterend', htmlString);
            }
        } else {
            console.log('We reached our target server, but it returned an error');
        }
    };

    request.onerror = function () {
        console.log('There was a connection error of some sort');
    };

    request.send();
    return false;
};

document.write(content());
