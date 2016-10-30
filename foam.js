var superagent = require('superagent')
  , XML = require('./lib/xml')
  ;

module.exports = function soap (uri, operation, action, message, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  var xml = envelope(operation, message, options);
  if (options.benchmark) console.time('soap request: ' + uri);

  superagent
    .post(uri)
    .send(xml)
    .set(headers(action, xml.length))
    .buffer(true)
    .end(function(err, res) {
      if (err) return callback(err);
      XML.parse(res.text, function(err, obj) {
        if (err) return callback(err);
        callback(null, obj['Envelope']['Body']);
      });
    });
};

function envelope (operation, message, options) {
  var xml = '<?xml version="1.0" encoding="UTF-8"?>';
  xml += '<env:Envelope xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
    'xmlns:env="http://schemas.xmlsoap.org/soap/envelope/" ' + namespaces(options.namespaces) + '>';

  if (options.header) {
    xml += '<env:Header>';
    xml += typeof options.header === 'object' ? XML.stringify(options.header) : options.header.toString();
    xml += '</env:Header>';
  }

  xml += '<env:Body>';
  xml += serializeOperation(operation, options); // '<' + operation + ' xmlns="' + options.namespace + '"' + '>';
  xml += typeof message === 'object' ? XML.stringify(message) : message.toString();
  xml += '</' + operation + '>';
  xml += '</env:Body>';
  xml += '</env:Envelope>';

  return xml;
}

function headers (schema, length) {
  return {
    Soapaction: schema,
    'Content-Type': 'text/xml;charset=UTF-8',
    'Content-Length': length,
    'Accept-Encoding': 'gzip',
    Accept: '*/*'
  };
}

function namespaces (ns) {
  var attributes = '';
  for (var name in ns) {
    attributes += name + '="' + ns[name] + '" ';
  }
  return attributes.trim();
}

function serializeOperation (operation, options) {
  return '<' + operation + (options.namespace ? ' xmlns="' + options.namespace + '"' : '') + '>';
}
