var xml2js = require('xml2js');
var stripPrefix = xml2js.processors.stripPrefix;

module.exports = {
  parse: parse,
  stringify: stringify
};

function parse(str, fn) {
  var parser = new xml2js.Parser({
    explicitArray: false,
    tagNameProcessors: [ stripPrefix ]
  });
  parser.parseString(str, fn);
}


function stringify(obj) {
  var builder = new xml2js.Builder({
    headless: true
  });
  return builder.buildObject(obj);
}
