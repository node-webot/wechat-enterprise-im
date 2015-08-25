# wechat-enterprise-im
A lib for wechat enterprise IM services.

微信公共平台企业号版－企业号消息

## 目的与场景

目前，较多的企业已在内部部署了IM工具，并运行良好。但随着移动办公需求的不断增强，迫切需要在移动设备上接入企业IM。企业号消息服务，可以方便地将微信和企业IM连接起来，把微信做为企业IM的移动端，快速实现内部IM的移动化。

企业号消息服务支持文本、图片、文件消息类型；支持单聊和群聊，支持在微信客户端主动发起会话。


### 使用企业号消息服务，你需要：

- 一、将企业IM的组织架构导入企业号，保持两者一致

- 二、在企业号管理端，以超级管理员身份开通企业号消息服务。开通后，即可基于组织架构在微信上聊天。如果需要对接企业IM，则仍需做以下几步

- 三、配置回调URL等参数，并获取corpid、secret

- 四、根据用户在企业IM的行为，调用企业号api，维护会话、发消息

- 五、接收企业号推送的事件，包括会话的变更、用户发送的消息等，并在企业IM上做出响应。当推送失败时，企业号会重试，重试时间最大为一天。

### 请注意：

企业号消息服务的secret，只具有部分接口权限，不支持管理企业号应用、基于应用的发送消息/自定义菜单等接口。支持的接口包括：

- 1、通讯录的管理，管辖范围为整个公司

- 2、管理多媒体文件

- 3、本文中描述的消息通道接口

## 官方文档
- [文档主页](http://qydev.weixin.qq.com/wiki/index.php?title=%E4%BC%81%E4%B8%9A%E5%8F%B7%E6%B6%88%E6%81%AF%E6%9C%8D%E5%8A%A1)


## License
The MIT license.

## 交流群
QQ群：157964097，使用疑问，开发，贡献代码请加群。

## 感谢
感谢以下贡献者：

```

 project  : wechat-enterprise-im
 repo age : 6 weeks
 active   : 5 days
 commits  : 6
 files    : 18
 authors  :
     6	Nick Ma                 100%

```

## 捐赠
如果您觉得Wechat企业号版本对您有帮助，欢迎请作者一杯咖啡

![捐赠wechat](https://cloud.githubusercontent.com/assets/327019/2941591/2b9e5e58-d9a7-11e3-9e80-c25aba0a48a1.png)
