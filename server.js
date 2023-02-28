const http = require('http')
const url = require('url')
const path = require('path')
const fs  = require('fs')
const hostname = '127.0.0.1'
const port = 3000

const mimeTypes = {
    'html': 'text/html',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpg',
    'png': 'image/png',
    'js': 'text/javascript',
    'css': 'text/css',
}

// const server = http.createServer((req, res) => {
//     res.statusCode = 200
//     res.setHeader('Content-Type', 'text/plain')
//     res.end('Hello Multiverse')
// })

http.createServer(function(req, res) {
    var uri = url.parse(req.url).pathname
    var filename = path.join(process.cwd(), unescape(uri))
    console.log('loading'+uri)
    var stats
    try{
        stats = fs.lstatSync(filename)
    }catch(error){
        res.writeHead(404, { 'Content-Type': 'text/plain'})
        res.write('404 page not found\n')
        res.end()
        return
    }
    if(stats.isFile()){
        var mimeType = mimeTypes[path.extname(filename).split('.').reverse()[0]]
        res.writeHead(200, { 'Content-Type': mimeType})

        var fileStream = fs.createReadStream(filename)
        fileStream.pipe(res)
    }
    else if (stats.isDirectory()){
        res.writeHead(302, {
            'Location':'index.html'
        })
        res.end()
    }
    else {
        res.writeHead(500, {'content-type':'text/plain'})
        res.write('500 internal Error\n')
        res.end()
    }
}).listen(port)

// server.listen(port, hostname, () => {
//     console.log(`Server listening on host:${hostname}:${port}/`)
// })