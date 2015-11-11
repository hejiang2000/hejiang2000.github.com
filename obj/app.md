
# APPLICATIONS

## 应用对象格式

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
}
```
