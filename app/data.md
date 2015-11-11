
## 记录多条表单数据

请求
> POST /api/projects/PROJECT_ID/sheets?api_key=WRITE_KEY  
> Content-Type: application/json; charset=utf-8
```json
{
      "trainers": [
        { "name" : "何江" },
        { "name" : "John" }
      ],
      "classes": [
        { "price": 10 },
        { "price": 20 }
      ]
}
```

返回
> HTTP/1.1 200 OK  
> Content-Type: application/json; charset=utf-8
```json
{
  "trainers": [
    {
      "success": true
    },
    {
      "success": true
    }
  ],
  "classes": [
    {
      "success": true
    },
    {
      "success": true
    }
  ]
}
```

## 记录单条数据

请求
> POST /api/projects/PROJECT_ID/sheets/SHEET_NAME?api_key=WRITE_KEY  
> Content-Type: application/json; charset=utf-8
```json
{
	"name" : "John"
}
```

返回
> HTTP/1.1 200 OK  
> Content-Type: application/json; charset=utf-8
```json
{
   "success": true
}
```

## 自动属性

自动属性会自动添加到每一条记录。

```json
{
  "device": {
    "id": "0980980231sdfsss",
    "model": "iPhone 6s plus"
  }
}
```

## 特别属性

当属性值为以下内容时，会被自动替换

| Placeholder(string)  |	Description                                            |
|----------------------|-----------------------------------------------------------|
| ${client.ip}         |	Replaced with the IP address of the client.            |
| ${client.user_agent} |	Replaced with the user agent string of the client.     |
