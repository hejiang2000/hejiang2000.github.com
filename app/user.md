
# USERS

用户管理模块管理用户信息和授权信息。

## 获取当前登录用户信息
请求:
> GET /api/users/me?api_key=MASTER_KEY HTTP/1.1

失败, 返回:
> HTTP/1.1 401 Unauthorized

成功, 返回:
> HTTP/1.1 200 OK  
> Content-Type: application/json; charset=utf-8  
```json
{
  "id": "5559fff32c8b9518f3672cd2",
  "user": "5559fff32c8b9518f3672cd2",
  "owner": "5559fff32c8b9518f3672cd2",
  "masterKey": "<MASTER_KEY>",
  "userName": "hejiang",
  "mobile": "13920922275",
  "email": "hejiang@tju.edu.cn",
  "firstName": "Jiang",
  "lastName": "He",
  "active": true,
  "preferences": {
    "locale": null
  },
  "created": "2015-05-18T15:06:28.841Z",
  "lastUpdated": "2015-05-18T13:18:48.181Z",
  "lastUsed": "2015-05-18T13:18:48.181Z"
}
```

## 重新生成MasterKey

请求:
> GET /api/users/me/createmasterkey?api_key=MASTER_KEY HTTP/1.1
失败, 返回:
> HTTP/1.1 401 Unauthorized

成功, 返回:
> HTTP/1.1 200 OK  
> Content-Type: application/json; charset=utf-8  
```json
{
	"masterKey": "asd9fadifjaqw9asdfasdf939"
}
```

