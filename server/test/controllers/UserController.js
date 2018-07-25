let chaiHttp = require('chai-http');
let chai = require('chai');
let expect = chai.expect;
let config = require('config');

const serverUrl = config.serverUrl;

chai.use(chaiHttp);

describe('UserController', () => {

    /**
     * Test GET clients endpoint.
     */
    describe('GET: /api/users/clients', () => {

        it('it should return the list of clients', (done) => {

            chai.request(serverUrl)
                .post('/api/auth/check')
                .send({
                    email: 'albanafmeti@gmail.com',
                    password: '123456'
                })
                .end(function (err, response) {

                    const user = response.body.data.user;

                    chai.request(serverUrl)
                        .get('/api/users/clients')
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
                            expect(response.body.data).to.have.property('clients');
                            expect(response.body.data.clients).to.be.an('array');

                            const client = response.body.data.clients[0];

                            expect(client).to.have.property('is_admin');
                            expect(client.is_admin).to.be.false;
                            done();
                        });
                });
        });

        it('it should not authorize request with false token', (done) => {

            chai.request(serverUrl)
                .get('/api/users/clients')
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
     * Test GET admin endpoint.
     */
    describe('GET: /api/users/admin', () => {

        it('it should return the admin user', (done) => {

            chai.request(serverUrl)
                .post('/api/auth/check')
                .send({
                    email: 'endrimija@gmail.com',
                    password: '123456'
                })
                .end(function (err, response) {

                    const user = response.body.data.user;

                    chai.request(serverUrl)
                        .get('/api/users/admin')
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
                            expect(response.body.data).to.have.property('admin');
                            expect(response.body.data.admin).to.be.an('object');

                            expect(response.body.data.admin).to.have.property('is_admin');
                            expect(response.body.data.admin.is_admin).to.be.true;
                            done();
                        });
                });
        });

        it('it should not authorize request with false token', (done) => {

            chai.request(serverUrl)
                .get('/api/users/admin')
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