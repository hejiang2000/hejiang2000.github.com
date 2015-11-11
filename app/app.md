
# APPLICATIONS

## 获取全部应用信息

请求
> GET /api/applications?api_key=MASTER_KEY

返回  
> HTTP/1.1 200 OK  
> Content-Type: application/json; charset=utf-8  
```json
[{
	"id":"<APPLICATION_ID>",
	"owner":"<OWNER_ID>",
	"user":"<USER_ID>",
	"name":"健身房管理",
	"description" : "description",
	"entries" : [{
		"name" : "输入教练信息",
		"icon" : "url1",
		"type" : "sheet",
		"sheet" : "<SHEET_NAME>"
	}, {
		"name" : "输入学员信息",
		"icon" : "url2",
		"type" : "sheet",
		"sheet" : "<SHEET_NAME>"
	}],
	"sheets" : [{
		"name" : "sheet1",
		"fields" : [{
		  "name" : "field",
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
	}]
  },
  { ... },
  { ... }
]
```

## 读取单个应用信息

请求
> GET /api/applications/APPLICATION_ID?api_key=MASTER_KEY

返回  
> HTTP/1.1 200 OK  
> Content-Type: application/json; charset=utf-8  
```json
{
	"id":"<APPLICATION_ID>",
	"owner":"<OWNER_ID>",
	"user":"<USER_ID>",
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
	}]
}
```

## 创建一个新应用

请求
> POST /api/applications?api_key=MASTER_KEY  
> Content-Type: application/json; charset=utf-8  
```json
{
	"name":"健身房管理应用"
}
```

返回  
> HTTP/1.1 200 OK  
> Content-Type: application/json; charset=utf-8  
```json
{
	"id":"<APPLICATION_ID>",
	"owner":"<OWNER_ID>",
	"user":"<USER_ID>",
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
	}]
}
```

## 更新应用

请求
> PUT /api/applications/APPLICATION_ID?api_key=MASTER_KEY  
> Content-Type: application/json; charset=utf-8  
```json
{
	"name":"我的健身房 2"
}
```

返回  
> HTTP/1.1 200 OK  


## 删除应用

请求
> DELETE /api/applications/APPLICATION_ID?api_key=MASTER_KEY

返回  
> HTTP/1.1 200 OK
