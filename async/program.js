var http = require('http');
var fs = require('fs');
var async = require('async');

fs.readFile(process.argv[2],'utf-8',function(err,data) {
  http.get(data,function(res) {
    res.on('data', function(chunk) {
      console.log(chunk.toString())
    })
  })
})

/* ------------------------------------ */

async.series({
  requestOne: function(cb) {
    http.get(process.argv[2],function(res) {
      res.on('data',function(chunk) {
        cb(null,chunk.toString())
      })
    })
  },
  requestTwo: function(cb) {
    http.get(process.argv[3],function(res) {
      res.on('data',function(chunk) {
        cb(null,chunk.toString())
      })
    })
  }
}, function(err, results) {
  if(err) { return console.log(err()) };
  console.log(results);
})

/* ------------------------------------ */

async.each([process.argv[2], process.argv[3]],function(element,cb) {
  http.get(element, function(res) {
    res.on('data', function(chunk) {
      // console.log(chunk.toString())
    })
    res.on('end',function(chunk) {
      cb();
    })
  }).on('error',function(err) {
    cb(err);
  })
},function(err) {
  if(err) console.log(err);
})

/* ------------------------------------ */

async.map([process.argv[2], process.argv[3]],function(element,cb) {
  http.get(element, function(res) {
    var reqBody = '';
    res.on('data', function(chunk) {
      reqBody += chunk.toString()
    })
    res.on('end',function(chunk) {
      cb(null,reqBody);
    })
  }).on('error',function(err) {
    cb(err);
  })
},function(err, results) {
  if(err) console.log(err);
  console.log(results);
})


/* --------------------------------------- */

async.series({
  postRequest: function(done) {
    function createUser(idx,cb) {
      var opts = {
        hostname: process.argv[2],
        method: "POST",
        port: process.argv[3],
        path: "/users/create"
      };
      var objectToSend = JSON.stringify({user_id: idx});
      var req = http.request(opts,function(res) {
        res.on('data',function(chunk) {
          // cb(null,objectToSend)
        })
        res.on('end', function() {
          cb();
        })
      })
      req.on('error',cb);
      req.write(objectToSend);
      req.end();
    }

    async.times(5, function(n,next) {
      createUser(++n,function(err) {
        next(err)
      });
    }, function(err) {
      if (err) return done(err);
      done(null)
    })
  },

  getRequest: function(done) {
    var body = ""
    http.get("http://" + process.argv[2] + ":" + process.argv[3] + '/users',function(res) {
      res.on('data',function(chunk) {
        body += chunk.toString();
      })
      res.on('end', function() {
        done(null,body)
      })
    }).on('error', function(err) {
      done(err);
    })
  }
}, function(err, results) {
  if(err) { return console.log(err)};
  console.log(results.getRequest);
})

/* --------------------------------------- */

async.reduce([1,2,3],0,function(accm,element,cb) {
  cb(null,accm + Number(element));
}, function(err,result) {
  if(err) { return console.log(err)};
  console.log(result);
});

/* --------------------------------------- */
var body = "";
var checks = 0;

async.whilst(
  function(){
    return !body.includes('meerkat');
  },
  function(cb) {
    http.get(process.argv[2], function(res) {
      res.on('data', function(chunk) {
        body += chunk.toString();
      })
      res.on('end', function() {
        checks++
        cb()
      })
    }).on('error',cb)
  },
  function(err) {
    if(err) return console.log(err);
    console.log(checks);
  }
)
