

var mysql = require('mysql');


var servers = ['d61ts-ls11', 'd61ts-ls53', 'd-mys010ts-ls11']

var connect = function(server, user, passwd) {
  var mysql_connection = mysql.createConnection({
    host: server,
    user: user || 'repmon',
    password: passwd || 'supermon'
  })
  return mysql_connection
}


function callDB (server, onData, onError) {
  var connection = connect(server)
  connection.query('show slave status', function(err, rows){
    connection.end()
    if(err) {
      onError(err)
      //return;
    }
    //console.log(rows[0].Master_Host)
    onData(rows[0])
    //return;
  })
}


let fetchDbStats = (server) => {
  return new Promise((resolve, reject) => {
    callDB(server, resolve, reject)
  })
}

Promise.all([
  fetchDbStats('d61ts-ls11'),
  fetchDbStats('d61ts-ls53'),
  fetchDbStats('d-mys010ts-ls11')
]).then((data) => {
  let [ foo, bar, baz ] = data
  console.log(`a: ${foo.Master_Host}, b: ${bar.Master_Host}, c: ${baz.Master_Host}`)
}, (err) => {
  console.log(err)
})

//callDB('d61ts-ls11');
