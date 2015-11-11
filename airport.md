

登机桥应用
========

用例分析
--------

### Role 1：登机桥工作人员

1. 使用Android APP操作

1. 登录/修改密码
   登机桥工作人员需要使用用户名/密码登录，确认身份后才能进入系统。同一个账号不允许同时在多个设备上登录进入系统。再次登录时将使同一账号的其他设备下线。

1. 接收航班安排通知并确认
   * 每天早上(系统参数: 全天航班推送时间)，后台会将航班信息推送到相关客户端;
   * 航班到达前15分钟(系统参数: 航班到达提前提醒)，后台会将即将到达航班信息推送到相关客户端；
   * 航班变更后，后台会将航班变更信息推到相关客户端。
   
   客户端收到后台通知后，需要进行确认，表明已收到相关信息。
   
1. 查看所管辖的登机桥状态
   * 登机桥状态变更后，后台会将登机桥的状态信息推送到相关客户端；
   * 客户端以表格形式显示相关登机桥状态情况。

1. APP参数
   * 服务API URL

### Role 2：管理调度人员

1. 使用PC机浏览器操作

1. 登录/修改密码
   管理调度人员需要使用用户名/密码登录，确认身份后才能进入系统。不允许多个管理调度人员同时登录进入系统。再次登录时将使同一账号的其他设备下线。
   
1. 查看全部登机桥状态
   * 以候机楼俯视图显示所有登机桥状态。登机桥状态在登机桥旁边使用不同图标表示;
   * 单击图标显示相关描述和工作人员联系信息。  
   
1. 接收登机桥工作人员未及时响应(系统参数: 航班到达提醒响应时间)通知并进行处理
   * 对于单个航班信息推送：登机桥工作人员未及时响应信息时，在候机楼俯视图的登机桥旁边用图标显示出来；
   * 对于早上全部推送：登机桥工作人员未及时响应信息时，在值班人员列表中用图标显示出来；
   * 单击未响应图标，显示相关工作人员联系信息，并允许管理调度人员进行处理(显示"已解决", "未解决"供点击);
   * 当存在未解决的问题时，进行声音提醒。任意界面操作，将暂停声音提示，并在1分钟后再次声音提示。
   
1. AODB数据查询
   * 提供界面，支持带2~3个条件(都有哪些查询条件???)进行数据查询;
   * 查询结果以表格形式显示
   
### Role 3：系统管理人员
暂不开发。

1. 使用PC机浏览器操作

1. 登录/修改密码

   系统管理人员需要使用用户名/密码登录，确认身份后才能进入系统。不允许多个系统管理人员同时登录进入系统。再次登录时将使同一账号的其他设备下线。

1. 管理(添加/修改/查看/删除)登机桥工作人员信息
   * 允许管理登机桥工作人员信息，支持增删改查操作；
   * 工作人员信息包括登录名，密码，姓名，联系方式。

1. 分配登机桥、时间段和工作人员的对应关系(排班)
   * 允许以周为单位，对每天各个时段(系统参数: 2个小时为一个时段)进行人员安排；
   * 以表格形式显示，行表头为周日到周六，列表头为时间段，中间格子显示人员姓名并可编辑；
   * 编辑后需要点击保存按钮确认修改。

1. 系统参数
   * 全天航班推送时间(具体时间)
   * 航班到达提前提醒(单位: 分钟)
   * 航班到达提醒响应时间(单位: 分钟)
   * 航班信息轮询时间间隔(单位: 秒)
   * 候机楼俯视图图片上传
   * 登机桥信息(登机桥名称，以及在候机楼俯视图片上的位置)
   * AODB数据库连接信息
   * 工作时段设置

系统设计
--------

### 开发技术和环境

1. WEB和服务端使用Java开发, Tomcat部署
1. APP使用Cordova开发
1. 浏览器要求支持HTML5，平板要求安卓4.0以上
1. 使用MSSQLServer存储数据

### 主要开源/免费工具和组件
1. Java, Tomcat, Nutsam, Druid
1. Cordova, Angular, Ionic, ui-router

APP设计
--------

### Page 1. APP登录页面

1. 显示登录页面
2. 输入用户名，密码
3. 调用登录API，获取masterKey

### Page 2. 航班信息通知和登机桥状态页面

1. 调用获取登机桥当前状态API
1. 显示航班信息通知和登机桥状态页面
1. 调用通知和状态更新API，等待通知
1. 收到通知，显示通知等待用户确认，确认后调用确认API
1. 收到状态更新，更新显示状态

### Page 3. 修改密码页面

1. 显示修改密码页面
1. 两次输入新密码，确认两次密码输入一致
1. 调用修改密码API，更新密码

### 其他注意事项
1. 保持屏幕常亮
1. 保持后台运行
1. 通知更新API，忽略超时错，反复调用

WEB设计
--------

### Page 1. WEB登录页面

1. 显示登录页面
2. 输入用户名，密码
3. 调用登录API，获取masterKey

### Page 2. 全部登机桥状态页面

1. 调用获取登机桥当前状态API
1. 显示航班信息通知(状态)和登机桥状态页面
1. 收到状态更新，更新显示状态: 有timeout状态，发出声音提示
1. 单击登机桥通知状态，显示提示框。如果有timeout状态, 增加“已处理”按钮
1. 用户单击“已处理”按钮，调用确认API

### Page 3. AODB数据查询页面

1. 显示查询条件输入框，和结果表格
1. 对于已输入条件，调用AODB查询API
1. 在结果表格中显示查询结果

### Page 4. 登机桥工作人员管理页面

1. 暂不开发, 手工维护数据

### Page 5. 登机桥排班管理页面

1. 暂不开发, 手工维护数据

### Page 6. 修改密码页面

1. 显示修改密码页面
1. 两次输入新密码，确认两次密码输入一致
1. 调用修改密码API，更新密码

服务接口
--------

### 1. 用户登录API
请求:
> POST /api/auth/login HTTP/1.1  
> Content-Type: application/json; charset=utf-8  
```json
{
	"userName": "hejiang",
	"password": "123456"
}
```

登录失败, 返回:
> HTTP/1.1 401 Unauthorized

登录成功, 返回:
> HTTP/1.1 200 OK  
> Content-Type: application/json; charset=utf-8  
```json
{
    "client": "app",
	"userName": "hejiang",
    "name": "何江",
	"masterKey": "asd9fadifjaqw9asdfasdf939"
}
```

### 2. 修改密码API
请求:
> POST /api/users/me/changepass?api_key=MASTER_KEY HTTP/1.1
> Content-Type: application/json; charset=utf-8  
```json
{
	"userName": "hejiang",
	"password": "123456"
}
```

修改失败, 返回:
> HTTP/1.1 401 Unauthorized

修改成功, 返回:
> HTTP/1.1 200 OK  

### 3. 登机桥当前状态API
请求:
> GET /api/status?api_key=MASTER_KEY HTTP/1.1

获取失败, 返回:
> HTTP/1.1 401 Unauthorized

获取成功, 返回:
> HTTP/1.1 200 OK  
> Content-Type: application/json; charset=utf-8  
```json
{
    bridges: [{
        bridge: "1号桥",
        status: "开启"
    },{
        bridge: "2号桥",
        status: "关闭"
    }]
}
```

### 4. 通知和状态更新API
请求:
> GET /api/status/new?api_key=MASTER_KEY HTTP/1.1

获取失败, 返回:
> HTTP/1.1 401 Unauthorized

获取成功, 返回:
> HTTP/1.1 200 OK  
> Content-Type: application/json; charset=utf-8  
```json
{
    messages: [{
        id: "1",
        bridge: "1号桥",
        message: "10点15分到达"
    },{
        id: "2",
        bridge: "2号桥",
        message: "10点33分到达"
    }],
    bridges: [{
        bridge: "1号桥",
        status: "开启"
    },{
        bridge: "2号桥",
        status: "关闭"
    }]
}
```

### 5. 消息确认API
请求:
> PUT /api/status?api_key=MASTER_KEY HTTP/1.1
> Content-Type: application/json; charset=utf-8  
```json
{
    messages: [{
        id: "1",
        bridge: "1号桥",
        status: "acknowledged"
    },{
        id: "2",
        bridge: "2号桥",
        status: "acknowledged"
    }]
}
```

确认失败, 返回:
> HTTP/1.1 401 Unauthorized

确认成功, 返回:
> HTTP/1.1 200 OK  

### 6. AODB查询API
> POST /api/status?api_key=MASTER_KEY HTTP/1.1
> Content-Type: application/json; charset=utf-8  
```json
{
    flightNo: "MU1372"
}
```

查询失败, 返回:
> HTTP/1.1 401 Unauthorized

查询成功, 返回:
> HTTP/1.1 200 OK  
> Content-Type: application/json; charset=utf-8  
```json
{
    data: [{
        flightNo: "MU1372",
        //...
    }]
}
```

