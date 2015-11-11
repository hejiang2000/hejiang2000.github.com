
# PROJECTS

## 项目对象格式
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
