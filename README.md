# WEBSERVER

this is a simple web server.

## http

this is the first module we require - it allows us to use the built-in http module.

it allows us to create HTTP servers and make Http requests.

## creating an HTTP server

to create an HTTP server we invoke one of the http module.it takes a callback function as its arguments, which will be executed every time a request is made to the server.

```javascript
http.createServer((req, res) => {

})

```

this callback takes two arguments, request and response:

1. request - contains information about the incoming HTTP request i.e the request method url, headers and body.
2. response - used to send the http response back to the client.
