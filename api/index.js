const http = require('http');
const URL = require('url')
const port = 8080
const fs = require('fs')
const path = require('path')
const data = require('./urls.json');

function writeFile(newUrls, callback, type) {
    fs.writeFile(
        path.join(__dirname, 'urls.json'),
        JSON.stringify(newUrls, null, 2),
        (err) => { 
            if(err) return err
            callback(JSON.stringify({type, message: 'success'}))
            
        }
    )
}

http.createServer((req, res) => {
    const {name, url, del } = URL.parse(req.url, true).query

    //Cors
    res.writeHead(200, {
        'Access-Control-Allow-Origin': "*"
    })

    if(name, url) {
        const id = String(Math.round(Math.random() * 100000))
        const addUrl = { urls: data.urls.concat({id, name, url }) }

        return writeFile(
            addUrl, (message) => {
                res.end(message)
            },
            'create'
        )
    }
        

    if(del) {
        const newUrls = data.urls.filter(item => String(item.id) !== String(del))
        
        return writeFile(newUrls, (message) => 
            res.end(message),
            'delete'
        )
    }
    
    return  res.end(JSON.stringify(data))
}).listen(port, () => console.log('Server running on port', port))