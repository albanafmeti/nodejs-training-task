let chaiHttp = require('chai-http');
let chai = require('chai');
let expect = chai.expect;
let config = require('config');

const serverUrl = config.serverUrl;

chai.use(chaiHttp);

describe('MessageController', () => {

    /**
     * Test GET commands endpoint.
     */
    describe('GET: /api/commands', () => {


    });

});