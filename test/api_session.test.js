var expect = require('expect.js');
var urllib = require('urllib');
var muk = require('muk');
var config = require('./config');
var API = require('../lib/api');

describe('api_session.js', function() {
    var api = new API(config.corpid, config.corpsecret);

    before(function(done) {
        api.getAccessToken(done);
    });

    it('create group chat session should ok', function(done) {
        var chatid = config.chatid;
        var name = "测试的群聊";
        var owner = "0003";
        var userlist = ["0001", "0002", "0003", "0004"];
        api.createChat(chatid, name, owner, userlist, function(err, data, res) {
            expect(err).not.to.be.ok();
            expect(data).to.have.property('errmsg', 'ok');
            done();
        });
    });


    it('create group chat session with exist chatid should not ok', function(done) {
        var chatid = config.chatid;
        var name = "测试的群聊";
        var owner = "0003";
        var userlist = ["0001", "0002", "0003", "0004"];
        api.createChat(chatid, name, owner, userlist, function(err, data, res) {
            expect(err).to.be.ok();
            expect(err).to.have.property('name', 'WeChatAPIError');
            expect(err).to.have.property('code', 86215);
            expect(err).to.have.property('message', 'chatid existed');
            done();
        });
    });

    it('get group chat session info should ok', function(done) {
        var chatid = config.chatid;
        
        api.getChat(chatid, function(err, data, res) {
        	// console.log(data);
            expect(err).not.to.be.ok();
            expect(data).to.have.property('errmsg', 'ok');
            expect(data.chat_info).to.be.an('object');
            expect(data.chat_info).to.have.property('chatid', config.chatid);
            done();
        });
    });

    
});
