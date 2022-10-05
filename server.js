const http = require("http")
const fs = require("fs")
const _ = require("lodash")

const server = http.createServer((req,res)=>{

    const greet = _.once(()=>{console.log("Hello.")})

    res.setHeader('Content-Text','text/html')

    let path = './views/'

    switch(req.url){
        case '/':
            path += 'index.html'
            res.statusCode = 200
            break
        case '/about':
            path += 'about.html'
            res.statusCode = 200
            break
        case '/about-me':
            res.setHeader('Location','/about')
            res.statusCode = 301
            res.end()
        default:
            path += '404.html'
            res.statusCode = 404
    }

    fs.readFile(path, (err, data) =>{
        if(err){
            console.log(err);
        }
        else{
            res.write(data)
        }
        res.end()
    })
    
})

server.listen(3000, 'localhost', () => {console.log("listening for requests on localhost:3000")})