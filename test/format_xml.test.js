var expect = require('expect.js');
var urllib = require('urllib');
var util = require('util');
var muk = require('muk');
var config = require('./config');
var xml2js = require('xml2js');

// var formatMessage = function (result) {
//   var message = {};
//   if (typeof result === 'object') {
//     for (var key in result) {
//       if (result[key].length === 1) {
//         var val = result[key][0];
//         if (typeof val === 'object') {
//           message[key] = formatMessage(val);
//         } else {
//           message[key] = (val || '').trim();
//         }
//       } else {
//         message[key] = result[key].map(formatMessage);
//       }
//     }
//   }
//   return message;
// };

var formatMessage = function (result) {
  var message = {};
  if (typeof result === 'object') {
    for (var key in result) {
      if (!(result[key] instanceof Array) || result[key].length === 0) {
        continue;
      }
      if (result[key].length === 1) {
        var val = result[key][0];
        if (typeof val === 'object') {
          message[key] = formatMessage(val);
        } else {
          message[key] = (val || '').trim();
        }
      } else {
        message[key] = [];
        result[key].forEach(function (item) {
          message[key].push(formatMessage(item));
        });
      }
    }
  }
  return message;
};

describe('format_xml', function() {
	it('parse should ok', function(done) {
        var messageWrapXml = "<xml><AgentType><![CDATA[chat]]></AgentType><ToUserName><![CDATA[wx3bd6f3aa75c0c7e7]]></ToUserName><ItemCount>9</ItemCount><PackageId>429496789897314899</PackageId><Item><FromUserName><![CDATA[0001]]></FromUserName><CreateTime>1437992392</CreateTime><MsgType><![CDATA[event]]></MsgType><Event><![CDATA[subscribe]]></Event></Item><Item><FromUserName><![CDATA[0018]]></FromUserName><CreateTime>1437992392</CreateTime><MsgType><![CDATA[event]]></MsgType><Event><![CDATA[subscribe]]></Event></Item><Item><FromUserName><![CDATA[wallevee]]></FromUserName><CreateTime>1437992720</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[可以看到吗？]]></Content><MsgId>6176131704492244074</MsgId><Receiver><Type>single</Type><Id>0003</Id></Receiver></Item><Item><FromUserName><![CDATA[wallevee]]></FromUserName><CreateTime>1437992862</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[收不到]]></Content><MsgId>6176132314377600177</MsgId><Receiver><Type>single</Type><Id>0003</Id></Receiver></Item><Item><FromUserName><![CDATA[0003]]></FromUserName><CreateTime>1437993533</CreateTime><MsgType><![CDATA[event]]></MsgType><Event><![CDATA[unsubscribe]]></Event></Item><Item><FromUserName><![CDATA[0003]]></FromUserName><CreateTime>1437993597</CreateTime><MsgType><![CDATA[event]]></MsgType><Event><![CDATA[subscribe]]></Event></Item><Item><FromUserName><![CDATA[0001]]></FromUserName><CreateTime>1438002322</CreateTime><MsgType><![CDATA[event]]></MsgType><Event><![CDATA[subscribe]]></Event></Item><Item><FromUserName><![CDATA[0018]]></FromUserName><CreateTime>1438002322</CreateTime><MsgType><![CDATA[event]]></MsgType><Event><![CDATA[subscribe]]></Event></Item><Item><FromUserName><![CDATA[0003]]></FromUserName><CreateTime>1438002322</CreateTime><MsgType><![CDATA[event]]></MsgType><Event><![CDATA[subscribe]]></Event></Item></xml>";
        
        xml2js.parseString(messageWrapXml, {trim: true}, function (err, result) {
            expect(err).not.to.be.ok();
            console.log(util.inspect(result,{depth:6}));
            expect(result).to.have.key('xml');
            done();
          });
    });

	it('format should ok', function(done) {
        var messageWrapXml = "<xml><AgentType><![CDATA[chat]]></AgentType><ToUserName><![CDATA[wx3bd6f3aa75c0c7e7]]></ToUserName><ItemCount>9</ItemCount><PackageId>429496789897314899</PackageId><Item><FromUserName><![CDATA[0001]]></FromUserName><CreateTime>1437992392</CreateTime><MsgType><![CDATA[event]]></MsgType><Event><![CDATA[subscribe]]></Event></Item><Item><FromUserName><![CDATA[0018]]></FromUserName><CreateTime>1437992392</CreateTime><MsgType><![CDATA[event]]></MsgType><Event><![CDATA[subscribe]]></Event></Item><Item><FromUserName><![CDATA[wallevee]]></FromUserName><CreateTime>1437992720</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[可以看到吗？]]></Content><MsgId>6176131704492244074</MsgId><Receiver><Type>single</Type><Id>0003</Id></Receiver></Item><Item><FromUserName><![CDATA[wallevee]]></FromUserName><CreateTime>1437992862</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[收不到]]></Content><MsgId>6176132314377600177</MsgId><Receiver><Type>single</Type><Id>0003</Id></Receiver></Item><Item><FromUserName><![CDATA[0003]]></FromUserName><CreateTime>1437993533</CreateTime><MsgType><![CDATA[event]]></MsgType><Event><![CDATA[unsubscribe]]></Event></Item><Item><FromUserName><![CDATA[0003]]></FromUserName><CreateTime>1437993597</CreateTime><MsgType><![CDATA[event]]></MsgType><Event><![CDATA[subscribe]]></Event></Item><Item><FromUserName><![CDATA[0001]]></FromUserName><CreateTime>1438002322</CreateTime><MsgType><![CDATA[event]]></MsgType><Event><![CDATA[subscribe]]></Event></Item><Item><FromUserName><![CDATA[0018]]></FromUserName><CreateTime>1438002322</CreateTime><MsgType><![CDATA[event]]></MsgType><Event><![CDATA[subscribe]]></Event></Item><Item><FromUserName><![CDATA[0003]]></FromUserName><CreateTime>1438002322</CreateTime><MsgType><![CDATA[event]]></MsgType><Event><![CDATA[subscribe]]></Event></Item></xml>";
        
        xml2js.parseString(messageWrapXml, {trim: true}, function (err, result) {
            expect(err).not.to.be.ok();
            var formated = formatMessage(result.xml);
            console.log(formated);
            expect(formated).to.have.property('PackageId','429496789897314899');
            done();
          });
    });
})