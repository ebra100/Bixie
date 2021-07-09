
let Book = require('../models/snapshot_group');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Stations', () => {

    describe('/GET stations', () => {
        it('should stations snapshat at specific time', (done) => {
            chai.request(app)
                .get('/api/v1/stations?at=2021-07-09 00:39:03')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eq("OK");
                    res.body.should.have.property('result');
                    res.body.should.have.property('result').have.property("at");
                    res.body.should.have.property('result').have.property("weather");
                    res.body.should.have.property('result').have.property("stations");
                    done();
                });
        });

        it('should return 404 ', (done) => {
            chai.request(app)
                .get('/api/v1/stations?at=2025-07-09 00:39:03')
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.should.have.property('message').be.a('string');
                    res.body.should.have.property('message').eq("resource not found");

                    done();
                });
        });

        it('should return 500 ', (done) => {
            chai.request(app)
                .get('/api/v1/stations?at=adfgw')
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.should.have.property('message').be.a('string');
                    res.body.should.have.property('message').eq("something went wrong , try again later");

                    done();
                });
        });



    });

});