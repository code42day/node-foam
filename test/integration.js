describe('integration tests', function(){
  describe('foam', function () {
    var foam = require('../foam');

    // http://www.dataaccess.com/webservicesserver/numberconversion.wso?WSDL

    it('converts numbers', function (done){
      var operation = 'NumberToWords'
        , namespace = 'http://www.dataaccess.com/webservicesserver/'
        , action = "http://www.dataaccess.com/webservicesserver/NumberToWords"
        , message = {'ubiNum': 1745};

      foam(namespace + 'numberconversion.wso', operation, action, message, {namespace: namespace}, function (err, result) {
        if (err) return done(err);
        result.should.have.nested.property('NumberToWordsResponse.NumberToWordsResult', 'one thousand seven hundred and forty five ');
        done();
      });
    });

    // http://services.aonaware.com/DictService/DictService.asmx?WSDL

    it('define word', function (done){
      var operation = 'aon:Define'
        , action = "http://services.aonaware.com/webservices/Define"
        , message = {'aon:word': 'soap'};

      foam('http://services.aonaware.com/DictService/DictService.asmx', operation, action, message, {
        namespaces: {
          'xmlns:aon': 'http://services.aonaware.com/webservices/'
        }
      },
      function (err, result) {
        if (err) return done(err);
        result.should.have.nested.property('DefineResponse.DefineResult.Word', 'soap');
        result.should.have.nested.property('DefineResponse.DefineResult.Definitions');
        done();
      });
    });

  });
});


