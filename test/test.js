var should = require('chai').should()
var format = require('../format')

describe('format', function () {
    it('parses AdvertisedTimeAtLocation', function () {
        var result = format({
            AdvertisedTimeAtLocation: "2016-02-02T22:38:00",
            ToLocation: [{LocationName: "Söc", Priority: 1, Order: 0}]
        })

        result.advertised.should.equal('22:38')
        result.location.should.equal('Söc')
    })
})
