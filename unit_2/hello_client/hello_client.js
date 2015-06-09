var unirest = require('unirest')

unirest.get('http://127.0.0.1:3000/headers').end(function(response){
  console.log('Status:', response.statusCode)
  console.log('Headers:', response.headers)
  console.log('Body:', response.body)
})