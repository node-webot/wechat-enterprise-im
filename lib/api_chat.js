var util = require('./util');
var extend = require('util')._extend;
var wrapper = util.wrapper;
var postJSON = util.postJSON;
var make = util.make;



make(exports, 'send', function (receiver, sender, msgtype, content, callback) {
  var url = this.prefix + 'chat/send?access_token=' + this.token.accessToken;
  var data = {
    receiver: receiver,
    sender: sender,
    msgtype: msgtype,
  };
  if (msgtype == 'text') {
      extend(data, {
          text: {
              content: content
          }
      });
  } else if (msgtype == 'image') {
      extend(data, {
          image: {
              media_id: content
          }
      });
  } else if (msgtype == 'file') {
      extend(data, {
          file: {
              media_id: content
          }
      });
  } else if (msgtype == 'voice') {
      extend(data, {
          voice: {
              media_id: content
          }
      });
  } else if (msgtype == 'link') {
      extend(data, {
          link: content
      });
  };

  this.request(url, postJSON(data), wrapper(callback));
});


make(exports, 'clearNotify', function (op_user, chat, callback) {
  var url = this.prefix + 'chat/clearnotify?access_token=' + this.token.accessToken;
  var data = {
    op_user: op_user,
    chat: chat,
  };
  this.request(url, postJSON(data), wrapper(callback));
});

make(exports, 'setMute', function (user_mute_list, callback) {
  var url = this.prefix + 'chat/setmute?access_token=' + this.token.accessToken;
  var data = {
    user_mute_list: user_mute_list,
  };
  this.request(url, postJSON(data), wrapper(callback));
});

