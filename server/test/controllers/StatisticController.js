let chaiHttp = require('chai-http');
let chai = require('chai');
let expect = chai.expect;
let config = require('config');

const serverUrl = config.serverUrl;

chai.use(chaiHttp);

let io = require('socket.io-client');
io.connect(serverUrl);

describe('StatisticController', () => {

    /**
     * Test POST create command.
     */
    describe('POST: /api/statistics/create', () => {

        it('it should create a new statistic', (done) => {

            chai.request(serverUrl)
                .post('/api/auth/check')
                .send({
                    email: 'albanafmeti@gmail.com',
                    password: '123456'
                })
                .end(function (err, response) {

                    const user = response.body.data.user;

                    chai.request(serverUrl)
                        .post('/api/statistics/create')
                        .send({ eventData: '{type: "click", action: "btnClick"}' })
                        .query({ _token: user.token })
                        .end(function (err, response) {
                            expect(err).to.be.null;
                            expect(response).to.have.status(200);

                            expect(response.body).to.be.an('object');

                            expect(response.body).to.have.property('success');
                            expect(response.body).to.have.property('data');
                            expect(response.body).to.have.property('message');

                            expect(response.body.success).to.be.true;

                            expect(response.body.data).to.be.an('object');
                            expect(response.body.data).to.have.property('statistic');
                            expect(response.body.data.statistic).to.be.an('object');

                            expect(response.body.message).to.equal('Event sent successfully.');
                            done();
                        });
                });
        });

        it('it should not authorize request with false token', (done) => {

            chai.request(serverUrl)
                .post('/api/statistics/create')
                .send({ eventData: '{type: "click", action: "btnClick"}' })
                .query({ _token: 'false_token' })
                .end(function (err, response) {
                    expect(response.body.success).to.be.false;
                    expect(response.body.data).to.be.null;
                    expect(response.body.message).to.equal('You are not authorized.');
                    done();
                });
        });

    });
});