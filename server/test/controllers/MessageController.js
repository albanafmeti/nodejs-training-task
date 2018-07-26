let chaiHttp = require('chai-http');
let chai = require('chai');
let expect = chai.expect;
let config = require('config');

const serverUrl = config.serverUrl;

chai.use(chaiHttp);

require('../../src/database');
let User = require('../../src/models/user');

let io = require('socket.io-client');
io.connect(serverUrl);

describe('MessageController', () => {

    /**
     * Test GET messages endpoint.
     */
    describe('GET: /api/messages/:clientId', () => {

        it('it should return the list of messages', (done) => {

            chai.request(serverUrl)
                .post('/api/auth/check')
                .send({
                    email: 'albanafmeti@gmail.com',
                    password: '123456'
                })
                .end(function (err, response) {

                    const loggedUser = response.body.data.user;

                    User.findOne({ email: 'endrimija@gmail.com' }, function (err, client) {

                        chai.request(serverUrl)
                            .get(`/api/messages/${client._id}`)
                            .query({ _token: loggedUser.token })
                            .end(function (err, response) {
                                expect(err).to.be.null;
                                expect(response).to.have.status(200);

                                expect(response.body).to.be.an('object');

                                expect(response.body).to.have.property('success');
                                expect(response.body).to.have.property('data');
                                expect(response.body).to.have.property('message');

                                expect(response.body.success).to.be.true;

                                expect(response.body.data).to.be.an('object');
                                expect(response.body.data).to.have.property('messages');
                                expect(response.body.data.messages).to.be.an('array');
                                done();
                            });

                    });
                });
        });

        it('it should not authorize request with false token', (done) => {

            chai.request(serverUrl)
                .get('/api/messages/1')
                .query({ _token: 'false_token' })
                .end(function (err, response) {
                    expect(response.body.success).to.be.false;
                    expect(response.body.data).to.be.null;
                    expect(response.body.message).to.equal('You are not authorized.');
                    done();
                });
        });

    });


    /**
     * Test POST create message.
     */
    describe('POST: /api/messages/create', () => {

        it('it should create a new message', (done) => {

            chai.request(serverUrl)
                .post('/api/auth/check')
                .send({
                    email: 'albanafmeti@gmail.com',
                    password: '123456'
                })
                .end(function (err, response) {

                    const loggedUser = response.body.data.user;

                    User.findOne({ email: 'endrimija@gmail.com' }, function (err, client) {

                        chai.request(serverUrl)
                            .post('/api/messages/create')
                            .send({ message: "Hello Message.", dest_user_id: client._id })
                            .query({ _token: loggedUser.token })
                            .end(function (err, response) {
                                expect(err).to.be.null;
                                expect(response).to.have.status(200);

                                expect(response.body).to.be.an('object');

                                expect(response.body).to.have.property('success');
                                expect(response.body).to.have.property('data');
                                expect(response.body).to.have.property('message');

                                expect(response.body.success).to.be.true;

                                expect(response.body.data).to.be.an('object');
                                expect(response.body.data).to.have.property('message');
                                expect(response.body.data.message).to.be.an('object');

                                expect(response.body.message).to.be.equal('Message sent successfully.');
                                done();
                            });

                    });
                });
        });

        it('it should not authorize request with false token', (done) => {

            chai.request(serverUrl)
                .post('/api/messages/create')
                .query({ _token: 'false_token' })
                .send({ message: "Hello Message.", dest_user_id: 1 })
                .end(function (err, response) {
                    expect(response.body.success).to.be.false;
                    expect(response.body.data).to.be.null;
                    expect(response.body.message).to.equal('You are not authorized.');
                    done();
                });
        });

    });
});