express = require('express')

var app = express();

app.get('/headers', function (req, res){
    res.json(req.headers)
})

app.get('/headers/:header_name', function(req, res){
    var headerName = req.params.header_name
    var reply = req.headers[headerName]
    res.json(reply)
})

app.get('/version', function(req, res){
    res.json(req.httpVersion)
})
app.listen(3000)

exports.echo = app