
## 表单数据记录格式

```json
{
	"id" : "<DATA_ID>",
	"owner": "<OWNER_ID>",
	"user": "<USER_ID>",
	"created": "ISO8601DATE",
	"lastUpdated": "ISO8601DATE",
	"project": "<PROJECT_ID>",
	"sheet": "<SHEET_NAME>",
	"record": {
		"<FIELD_NAME>": "<FIELD_VALUE",
		...
	},
	"device": {
		"id":"<DEVICE_ID>",
		"model":"<DEVICE_MODEL>"
	}
}
```
