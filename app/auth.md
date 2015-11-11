
# AUTHENTICATION

用户认证管理负责用户的认证，授权。

## 用户注册

请求:
> POST /api/auth/signup HTTP/1.1  
> Content-Type: application/json; charset=utf-8  
```json
{
	"userName": "hejiang",
	"mobile": "13920922275",
	"email": "hejiang@tju.edu.cn",
	"password": "123456"
}
```

注册失败, 返回:
> HTTP/1.1 412 Precondition Failed

注册成功, 返回:
> HTTP/1.1 200 OK  
> Content-Type: application/json; charset=utf-8  
```json
{
	"userName": "hejiang",
	"masterKey": "asd9fadifjaqw9asdfasdf939"
}
```

## 用户登录
请求:
> POST /api/auth/login HTTP/1.1  
> Content-Type: application/json; charset=utf-8  
```json
{
	"email": "hejiang@tju.edu.cn",
	"password": "123456"
}
```
或者
```json
{
	"mobile": "13920922275",
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
	"userName": "hejiang",
	"masterKey": "asd9fadifjaqw9asdfasdf939"
}
```


## 重置用户密码
请求:
> POST /api/auth/resetpassword HTTP/1.1  
> Content-Type: application/json;charset=UTF-8  
```json
{
	"email": "hejiang@tju.edu.cn"
}
```
或者
```json
{
	"mobile": "13920922275"
}
```

返回:
> HTTP/1.1 200 OK
