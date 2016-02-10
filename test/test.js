var should = require('chai').should()
var format = require('../format')

describe('format', function () {
    var names = {"Söc": "Södertälje C"};

    describe('normal data', function () {
        var result = format(names, {
            AdvertisedTrainIdent: "2753",
            AdvertisedTimeAtLocation: "2016-02-02T22:38:00",
            EstimatedTimeAtLocation: "2016-02-02T22:39:00",
            TimeAtLocation: "2016-02-02T22:40:00",
            ToLocation: [{LocationName: "Söc", Priority: 1, Order: 0}]
        })

        it('return train identifier', function () {
            result.ident.should.equal('2753')
        })

        it('odd train identifier for southbound train', function () {
            result.direction.should.equal('southbound')
        })

        it('looks up station name', function () {
            result.location.should.equal('Södertälje C')
        })

        it('time shows actual if set', function () {
            result.time.should.equal('22:40')
        })

        it('shows what kind of time is reported in "time" property', function () {
            result.realtime.should.equal('actual')
        })
    })

    it('handles wrong time format', function () {
        var result = format(names, {
            AdvertisedTimeAtLocation: "22:38:00"
        })

        result.time.should.equal('22:38:00')
        result.location.should.equal('?')
    })

    it('handles no time', function () {
        var result = format(names, {
            ToLocation: [{LocationName: "Söc", Priority: 1, Order: 0}]
        })

        result.location.should.equal('Södertälje C')
    })

    it('returns location key if there is no name', function () {
        var result = format(names, {
            AdvertisedTimeAtLocation: "2016-02-02T22:38:00",
            ToLocation: [{LocationName: "Tul", Priority: 1, Order: 0}]
        })

        result.location.should.equal('Tul')
    })

    it('estimated but no actual', function () {
        var result = format(names, {
            EstimatedTimeAtLocation: "2016-02-02T22:39:00"
        })

        result.time.should.equal('22:39')
        result.realtime.should.equal('estimated')
    })

    it('no estimated nor actual', function () {
        var result = format(names, {
            AdvertisedTimeAtLocation: "2016-02-02T22:38:00"
        })

        result.time.should.equal('22:38')
        result.realtime.should.equal('advertised')
    })

    it('even train identifier for northbound train', function () {
        var result = format(names, {
            AdvertisedTrainIdent: "2754"
        })

        result.direction.should.equal('northbound')
    })
})
