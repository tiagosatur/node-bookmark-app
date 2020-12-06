const http = require('http')
const fs = require('fs')
const path = require('path')


http.createServer((req, res) => {
    const file = req.url === '/' ? 'index.html' : req.url
    const filePath = path.join(__dirname, 'public', file)
    const fileExtention = path.extname(filePath)
    const allowdFilePaths = ['.html', '.css', '.js']
    const allowed = allowdFilePaths.find((item) => item === fileExtention)

    // In case a file doens't exist, it does not freeze the app (like favicon.ico)
    if(!allowed) return

    fs.readFile(
        filePath,
        (error, content) => {
            if(error) throw error

            res.end(content)
        }
    )    
    
}).listen(5000)
