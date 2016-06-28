console.log('HELLO WORLD')

/* ------------------------------------- */

var total = process.argv.slice(2).reduce(function(accm,num){
  return accm += Number(num);
},0);

console.log(total);

/* ------------------------------------- */

var fs = require('fs');

var data = fs.readFileSync(process.argv[2]);
var newLinesCount = data.toString().split('\n').length - 1;
console.log(newLinesCount);

/* ------------------------------------- */

var fs = require('fs');

fs.readFile(process.argv[2],'utf8',function(err,data) {
  if(err) return err;
  console.log(data.toString().split("\n").length - 1);
})

/* ------------------------------------- */

var fs = require('fs');

fs.readdir(process.argv[2],function(err,data) {
  if(err) return err;

  var fileExtension = new RegExp("." + process.argv[3]);
  var test = data.toString().split(",").filter(function(file,idx,arr) {
    return file.match(fileExtension);
  })
  .forEach(function(filteredFile) {
    console.log(filteredFile);
  });
});

/* ------------------------------------- */


var moduleCheck = require("./madeItModular");

moduleCheck(process.argv[2],process.argv[3], function(err,data) {
  if(err) throw err;

  data.forEach(function(file) {
    console.log(file);
  });
});

/* ------------------------------------- */

var http = require('http');

http.get(process.argv[2],function(resp) {
  resp.setEncoding('utf8').on('data',function(data) {
    console.log(data);
  })
});

/* ------------------------------------- */

var http = require('http');
var bl = require('bl');

http.get(process.argv[2],function(resp) {

  resp.pipe(bl(function(err,data) {
    console.log(data.toString().length);
  }))

  resp.pipe(bl(function(err,data) {
    console.log(data.toString());
  }))
});

/* ------------------------------------- */

var http = require('http');
var bl = require('bl');

function getHttpData(url) {
  return new Promise(function(resolve,reject) {
    http.get(url,function(resp) {
      resp.pipe(bl(function(err,data) {
        resolve(data.toString())
      }))
    });
  })
}

var request1 = getHttpData(process.argv[2])
var request2 = getHttpData(process.argv[3])
var request3 = getHttpData(process.argv[4])

Promise.all([request1,request2,request3])
.then(function(data) {
  data.forEach(function(line) {
    console.log(line);
  })
})

/* ------------------------------------- */

var net = require('net');
var server = net.createServer(function (socket) {

   var date = new Date(Date.now() - 1000*60*60*4).toISOString().slice(0,16).replace('T',' ') + "\n";
   socket.end(date);
})
server.listen(process.argv[2]);

/* ------------------------------------- */

var fs = require('fs');
var http = require('http');

var server = http.createServer(function(req,res) {
  var readStream = fs.createReadStream(process.argv[3])

  readStream.on('open', function() {
    readStream.pipe(res);
  })
})
server.listen(process.argv[2]);

/* ------------------------------------- */

var fs = require('fs');
var http = require('http');
var map2 = require('through2-map');

var server = http.createServer(function(req,res) {
  if(req.method === "POST") {
    req.pipe(map2(function(chunk) {
      return chunk.toString().toUpperCase();
    })).pipe(res);
  }
})
server.listen(process.argv[2]);

/* ------------------------------------- */

var http = require('http');
var url = require('url');

var server = http.createServer(function(req,res) {
  res.writeHead(200,{'Content-Type': 'application/json'})

  var urlReq = url.parse(req.url,true)
  var date = new Date(urlReq.query.iso);

  if(urlReq.pathname === '/api/parsetime') {
    res.end(JSON.stringify({
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds()
    }));
  }

  if(urlReq.pathname === '/api/unixtime') {
    res.end(JSON.stringify({
      unixtime: date.getTime()
    }));
  }

});

server.listen(process.argv[2]);
