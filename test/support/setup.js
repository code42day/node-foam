var chai = require("chai");
global.should = chai.should();
global.expect = chai.expect;

var replay = require('replay');
// Set mode to `record` to save http requests as fixtures
//replay.mode = "record";
replay.fixtures = __dirname + "/fixtures";
replay.headers.push(/^soapaction/);
