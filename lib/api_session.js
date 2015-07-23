var util = require('./util');
var wrapper = util.wrapper;
var postJSON = util.postJSON;
var make = util.make;

// 创建会话
// 必须是3人以上的会话，群主必须在成员清单里。

make(exports, 'createChat', function (chatid, name, owner, userlist, callback) {
  var url = this.prefix + 'chat/create?access_token=' + this.token.accessToken;
  var data = {
    chatid: chatid,
    name: name,
    owner: owner,
    userlist: userlist
  };
  this.request(url, postJSON(data), wrapper(callback));
});

// 获取会话信息
// 通过chatid来获取
// 返回结果
//   {
//       "errcode": 0,
//       "errmsg": "ok",
//       "chat_info": {
//           "chatid": "235364212115767297",
//           "name": "企业应用中心",
//           "owner": "zhangsan",
//           "userlist": ["zhangsan", "lisi", "wangwu"]
//       }
//   }

make(exports, 'getChat', function (chatid, callback) {
  var url = this.prefix + 'chat/get?access_token=' + this.token.accessToken + '&chatid=' + chatid;
  this.request(url, {dataType: 'json'}, wrapper(callback));
});


// 修改会话信息

make(exports, 'updateChat', function (chatid, userid, opts, callback) {
  var url = this.prefix + 'chat/update?access_token=' + this.token.accessToken;
  var data = {
    chatid: chatid,
    userid: userid,
  };
  if (typeof opts === 'object') {
    if (opts.name) {
      data.name = opts.name;
    }
    if (opts.owner) {
      data.owner = opts.owner;
    }
    if (opts.add_user_list) {
      data.add_user_list = opts.add_user_list;
    }
    if (opts.del_user_list) {
      data.del_user_list = opts.del_user_list;
    }
  } else {
    data.name = opts;
  }
  this.request(url, postJSON(data), wrapper(callback));
});

// 退出会话
make(exports, 'quitChat', function (chatid, op_user, callback) {
  var url = this.prefix + 'chat/quit?access_token=' + this.token.accessToken;
  var data = {
    chatid: chatid,
    op_user: op_user,
  };
  this.request(url, postJSON(data), wrapper(callback));
});
