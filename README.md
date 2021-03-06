[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][gemnasium-image]][gemnasium-url]

# node-foam

Fork of the [foam] library without native dependency.
It is using [superagent] for requests and [xml2js] for XML stringifying and parsing.

## Usage

    npm install @pirxpilot/node-foam --save

```js
var operation = 'CelsiusToFahrenheit'
    , namespace = 'http://www.w3schools.com/webservices/'
    , action = "http://www.w3schools.com/webservices/CelsiusToFahrenheit"
    , message = {'Celsius': '23'}
    , uri = namespace + 'tempconvert.asmx'
    ;

var foam = require('@pirxpilot/node-foam');

foam(uri, operation, action, message, {namespace: namespace},
  function (err, result) {
    console.log(result.CelsiusToFahrenheitResponse.CelsiusToFahrenheitResult);
  }
);
```

### Parameters

- `uri` - endpoint of the SOAP service
- `operation` - SOAP operation
- `action` - `Soapaction` http header
- `message` - a Javascript object that will be serialised to XML
- `options` - an options object

### Options

- `header` - optional SOAP header
- `namespace` - optional xmlns namespace for the `operation`
- `namespaces` - optional additional namespaces for the `Envelope` element
- `benchmark` - set to true to log the request timing to the console, defaults **false**

[foam]: https://www.npmjs.com/package/foam
[superagent]: https://www.npmjs.com/package/superagent
[xml2js]: https://www.npmjs.com/package/xml2js

[npm-image]: https://img.shields.io/npm/v/@pirxpilot/node-foam.svg
[npm-url]: https://npmjs.org/package/@pirxpilot/node-foam

[travis-url]: https://travis-ci.org/pirxpilot/node-foam
[travis-image]: https://img.shields.io/travis/pirxpilot/node-foam.svg

[gemnasium-image]: https://img.shields.io/gemnasium/pirxpilot/node-foam.svg
[gemnasium-url]: https://gemnasium.com/pirxpilot/node-foam
