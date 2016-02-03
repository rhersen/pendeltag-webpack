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

    it('handles wrong time format', function () {
        var result = format({
            AdvertisedTimeAtLocation: "22:38:00"
        })

        result.advertised.should.equal('22:38:00')
        result.location.should.equal('?')
    })

    it('handles no time', function () {
        var result = format({
            ToLocation: [{LocationName: "Söc", Priority: 1, Order: 0}]
        })

        result.advertised.should.equal('')
        result.location.should.equal('Söc')
    })

    it('estimated and actual', function () {
        var result = format({
            TimeAtLocation: "2016-02-02T22:40:00",
            EstimatedTimeAtLocation: "2016-02-02T22:39:00"
        })

        result.actual.should.equal('22:40')
        result.estimated.should.equal('22:39')
    })
})
