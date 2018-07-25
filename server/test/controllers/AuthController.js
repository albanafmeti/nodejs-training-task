let chaiHttp = require('chai-http');
let chai = require('chai');
let expect = chai.expect;
let config = require('config');

const serverUrl = config.serverUrl;

chai.use(chaiHttp);

describe('AuthController', () => {

    describe('POST: /api/auth/check', () => {

        it('it should authenticate the user', (done) => {
            chai.request(serverUrl)
                .post('/api/auth/check')
                .send({
                    email: 'albanafmeti@gmail.com',
                    password: '123456'
                })
                .end(function (err, response) {
                    expect(err).to.be.null;
                    expect(response).to.have.status(200);
                    expect(response.body).to.be.an('object');

                    expect(response.body).to.have.property('success');
                    expect(response.body).to.have.property('data');
                    expect(response.body).to.have.property('message');

                    expect(response.body.success).to.be.true;
                    expect(response.body.data).to.be.an('object');
                    expect(response.body.message).to.equal('Credentials match.');
                    done();
                });
        });

        it('it should fail the user authentication', (done) => {
            chai.request(serverUrl)
                .post('/api/auth/check')
                .send({
                    email: 'albanafmeti@gmail.com',
                    password: '654321'
                })
                .end(function (err, response) {
                    expect(err).to.be.null;
                    expect(response).to.have.status(200);
                    expect(response.body).to.be.an('object');

                    expect(response.body).to.have.property('success');
                    expect(response.body).to.have.property('data');
                    expect(response.body).to.have.property('message');

                    expect(response.body.success).to.be.false;
                    expect(response.body.data).to.be.null;
                    expect(response.body.message).to.equal('Credentials do not match.');
                    done();
                });
        });

        it('it should require an email', (done) => {
            chai.request(serverUrl)
                .post('/api/auth/check')
                .send({})
                .end(function (err, response) {
                    expect(err).to.be.null;
                    expect(response).to.have.status(200);
                    expect(response.body).to.be.an('object');

                    expect(response.body).to.have.property('success');
                    expect(response.body).to.have.property('data');
                    expect(response.body).to.have.property('message');

                    expect(response.body.success).to.be.false;
                    expect(response.body.data).to.be.null;
                    expect(response.body.message).to.equal('Email is required.');
                    done();
                });
        });

        it('it should require a password', (done) => {
            chai.request(serverUrl)
                .post('/api/auth/check')
                .send({
                    email: 'albanafmeti@gmail.com',
                })
                .end(function (err, response) {
                    expect(err).to.be.null;
                    expect(response).to.have.status(200);
                    expect(response.body).to.be.an('object');

                    expect(response.body).to.have.property('success');
                    expect(response.body).to.have.property('data');
                    expect(response.body).to.have.property('message');

                    expect(response.body.success).to.be.false;
                    expect(response.body.data).to.be.null;
                    expect(response.body.message).to.equal('Password is required.');
                    done();
                });
        });
    });
});