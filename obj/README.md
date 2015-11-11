
# 对象格式说明  
分析云应用RESTFUL服务接口说明。

# JSONP callback
You can give any request a "callback" request parameter to encapsulate the result json as function call - that is, jsonp.

# Authentication
Youtu supports two mechanisms for authenticating API requests, both requiring API keys for the project you want to use.

# HTTP Header
One way you can authenticate requests is with an HTTP header called “Authorization”. This method works for every API call.  
> All POSTs require a “Content-Type” header set to “application/json”.

# Query String Parameter
You can also authenticate requests with a query string parameter called api_key.

# API Keys
Each of your projects will have its own set of API keys, which you can retrieve from your project information.

# Master key

The Master Key is the most powerful API key of all. It can be used to authenticate any API call, and is required to perform various administrative functions.

# Write key

The write key is an API key specifically for writing data. It can authenticate any API request that writes data to Youtu. The write key is a Scoped key that is automatically created for each project, and can be regenerated. Typically, you would use the write key for requests described in the Record section of the docs.

# Read key

The read key is an API key for querying and extracting data. It can authenticate any API request to query or analyze data from Youtu. Like the write key, the read key is a Scoped key that is automatically created for each project, and can be regenerated. Typically, you would use the read key for requests described in the Query section of the docs.

# Scoped keys

Scoped keys are customized API keys you can generate yourself. Each key has a defined scope of allowed operations (read/write), along with a set of predetermined filters that are applied to every request.

For example, if you wanted to feature a customer-facing dashboard in your app, scoped keys would allow individual customers to see their own data without exposing anyone else’s data.

> Parameters  
  Filters you wish to apply to all API calls made with this key  
  Allowed operations for this key (“read” and/or “write”)

This is useful if you need to expose data to your users, but you don’t want them to have access to anyone else’s data.

> Generate a scoped key  
  There's no way to generate a scoped key at present.

# Errors

## 200: Event accepted

    Note: Check the response body for individual event statuses. Some or all may have failed.

## 201: Event created successfully

## 400: Bad Request

    Missing or invalid parameters. Error messages will often contain more information to help
	you figure out what’s wrong.

## 401: Unauthorized

    The API key is invalid.

## 403: Forbidden

    The API key is not allowed to run this request.

## 404: Not Found

    The requested resource was not found.

## 429: Too many requests, see Rate Limiting

## 500: Internal Server Error

    Something went wrong on our end. If the issue persists, give us a shout so we can
	investigate.

## 503: Service Unavailable

    Our service is temporarily offline. If the issue persists, let us know.

## 504 - Timeout

    Your query did not complete in the time allowed.