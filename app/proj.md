
# PROJECTS

## 获取全部项目信息

请求
> GET /api/projects?api_key=MASTER_KEY

返回  
> HTTP/1.1 200 OK  
> Content-Type: application/json; charset=utf-8  
```json
[
  {
	"id":"<PROJECT_ID>",
	"owner":"<OWNER_ID>",
	"user":"<USER_ID>",
    "readKey":"<READ_KEY>",
    "writeKey":"<WRITE_KEY>",
	"name":"健身房管理",
	"description" : "description",
	"entries" : [{
		"name" : "输入教练信息",
		"icon" : "url1",
		"type" : "sheet",
		"sheet" : "<SHEET_ID>"
	}, {
		"name" : "输入学员信息",
		"icon" : "url2",
		"type" : "sheet",
		"sheet" : "<SHEET_ID>"
	}],
	"sheets" : [{
		"id" : "<SHEET_ID>",
		"name" : "sheet1",
		"fields" : [{
		  "id" : "<FIELD_ID>",
		  "name" : "field title",
		  "type" : "text",
		  "description" : "description",
		  "format" : "format",
		  "default" : {
			"type" : "literal",
			"value" : "3223"
		  },
		  "required" : true,
		  "visible" : true,
		  "editable" : true
		}],
		"parentSheet" : null
	}],
	"source": {
		"application": "<APPLICATION_ID>",
		"owner": "<OWNER_ID>"
	}
  },
  { ... },
  { ... }
]
```

## 读取单个项目信息

请求
> GET /api/projects/PROJECT_ID?api_key=MASTER_KEY

返回  
> HTTP/1.1 200 OK  
> Content-Type: application/json; charset=utf-8  
```json
{
	"id":"<PROJECT_ID>",
	"owner":"<OWNER_ID>",
	"user":"<USER_ID>",
    "readKey":"<READ_KEY>",
    "writeKey":"<WRITE_KEY>",
	"name":"健身房管理",
	"description" : "description",
	"entries" : [{
		"name" : "输入教练信息",
		"icon" : "url1",
		"type" : "sheet",
		"sheet" : "<SHEET_ID>"
	}, {
		"name" : "输入学员信息",
		"icon" : "url2",
		"type" : "sheet",
		"sheet" : "<SHEET_ID>"
	}],
	"sheets" : [{
		"id" : "<SHEET_ID>",
		"name" : "sheet1",
		"fields" : [{
		  "id" : "<FIELD_ID>",
		  "name" : "field title",
		  "type" : "text",
		  "description" : "description",
		  "format" : "format",
		  "default" : {
			"type" : "literal",
			"value" : "3223"
		  },
		  "required" : true,
		  "visible" : true,
		  "editable" : true
		}],
		"parentSheet" : null
	}],
	"source": {
		"application": "<APPLICATION_ID>",
		"owner": "<OWNER_ID>"
	}
}
```

## 创建一个新项目

请求
> POST /api/projects?api_key=MASTER_KEY  
> Content-Type: application/json; charset=utf-8  
```json
{
	"name":"我的健身房",
	"source": {
		"application": "<APPLICATION_ID",
		"owner": "<OWNER_ID>"
	}
}
```

返回  
> HTTP/1.1 200 OK  
> Content-Type: application/json; charset=utf-8  
```json
{
	"id":"<PROJECT_ID>",
	"owner":"<OWNER_ID>",
	"user":"<USER_ID>",
    "readKey":"<READ_KEY>",
    "writeKey":"<WRITE_KEY>",
	"name":"健身房管理",
	"description" : "description",
	"entries" : [{
		"name" : "输入教练信息",
		"icon" : "url1",
		"type" : "sheet",
		"sheet" : "<SHEET_ID>"
	}, {
		"name" : "输入学员信息",
		"icon" : "url2",
		"type" : "sheet",
		"sheet" : "<SHEET_ID>"
	}],
	"sheets" : [{
		"id" : "<SHEET_ID>",
		"name" : "sheet1",
		"fields" : [{
		  "id" : "<FIELD_ID>",
		  "name" : "field title",
		  "type" : "text",
		  "description" : "description",
		  "format" : "format",
		  "default" : {
			"type" : "literal",
			"value" : "3223"
		  },
		  "required" : true,
		  "visible" : true,
		  "editable" : true
		}],
		"parentSheet" : null
	}],
	"source": {
		"application": "<APPLICATION_ID>",
		"owner": "<OWNER_ID>"
	}
}
```

## 更新项目

请求
> PUT /api/projects/PROJECT_ID?api_key=MASTER_KEY  
> Content-Type: application/json; charset=utf-8  
```json
{
	"name":"我的健身房 2"
}
```

返回  
> HTTP/1.1 200 OK  


## 删除项目

请求
> DELETE /api/projects/PROJECT_ID?api_key=MASTER_KEY

返回  
> HTTP/1.1 200 OK

## 重新生成ReadKey

请求:
> GET /api/projects/PROJECT_ID/createreadkey?api_key=MASTER_KEY HTTP/1.1
失败, 返回:
> HTTP/1.1 401 Unauthorized

成功, 返回:
> HTTP/1.1 200 OK  
> Content-Type: application/json; charset=utf-8  
```json
{
	"readKey": "asd9fadifjaqw9asdfasdf939"
}
```

## 重新生成WriteKey

请求:
> GET /api/projects/PROJECT_ID/createwritekey?api_key=MASTER_KEY HTTP/1.1
失败, 返回:
> HTTP/1.1 401 Unauthorized

成功, 返回:
> HTTP/1.1 200 OK  
> Content-Type: application/json; charset=utf-8  
```json
{
	"writeKey": "asd9fadifjaqw9asdfasdf939"
}
```

