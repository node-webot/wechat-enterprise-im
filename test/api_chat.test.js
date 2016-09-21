var expect = require('expect.js');
var urllib = require('urllib');
var muk = require('muk');
var config = require('./config');
var API = require('../lib/api');

describe('api_chat.js', function() {
    var api = new API(config.corpid, config.corpsecret);

    before(function(done) {
        api.getAccessToken(done);
    });


    describe('send message', function() {
        it('to single user should ok', function(done) {
            var receiver = {
                "type": "single",
                "id": "0004"
            };
            var sender = "0003";
            var msgtype = "text";
            var content = "来自企业号IM的问候,hahaha";
            api.send(receiver, sender, msgtype, content, function(err, data, res) {
                expect(err).not.to.be.ok();
                expect(data).to.have.property('errmsg', 'ok');
                done();
            });
        });

        it('to single invalid user should not ok', function(done) {
            var receiver = {
                "type": "single",
                "id": "9999"
            };
            var sender = "0003";
            var msgtype = "text";
            var content = "来自企业号IM的问候";
            api.send(receiver, sender, msgtype, content, function(err, data, res) {
                expect(err).to.be.ok();
                expect(err).to.have.property('name', 'WeChatAPIError');
                expect(err).to.have.property('code', 86219);
                expect(err).to.have.property('message', 'invalid chat receiver');
                done();
            });
        });
    });

    describe('clear notify', function() {
        it('clearNotify for single', function(done) {
            var op_user = '0003';
            var chat = {
                type: 'single',
                id: '0004'
            };
            api.clearNotify(op_user, chat, function(err, data, res) {
                expect(err).not.to.be.ok();
                expect(data).to.have.property('errmsg', 'ok');
                done();
            });
        });
    });

    describe('set mute', function() {
        it('setMute', function(done) {
            var user_mute_list = [{
                'userid': '0003',
                'status': 0
            }, {
                'userid': '0004',
                'status': 1
            }];
            api.setMute(user_mute_list, function(err, data, res) {
                expect(err).not.to.be.ok();
                expect(data).to.have.property('errmsg', 'ok');
                done();
            });
        });
    });

});
