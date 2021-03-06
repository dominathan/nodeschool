function upperCaser(input) {
  return input.toUpperCase();
}

module.exports = upperCaser;

/* ----------------------------------- */
function repeat(operation, num) {
  for(var i=0; i<num;i++) {
    operation();
  }
}

// Do not remove the line below
module.exports = repeat

/* ----------------------------------- */
function doubleAll(numbers) {
  return numbers.map(function(num) {
    return num * 2;
  })
}

 module.exports = doubleAll


/* ----------------------------------- */
 function getShortMessages(messages) {
   // SOLUTION GOES HERE
   return messages.filter(function(message) {
     return message.message.length < 50;
   })
   .map(function(msg) {
     return msg.message;
   });
 };

 module.exports = getShortMessages

/* ----------------------------------- */
 function checkUsersValid(goodUsers) {
  return function allUsersValid(submittedUsers) {
    // SOLUTION GOES HERE
    return submittedUsers.every(function(element) {
      return goodUsers.some(function(goodUser) {
        return goodUser.id === element.id
      })
    })
  };
}

module.exports = checkUsersValid

/* ----------------------------------- */
function countWords(inputWords) {
  // SOLUTION GOES HERE
  return inputWords.reduce(function(memo,element) {
    if(memo[element]) {
      memo[element] += 1
    } else {
      memo[element] = 1;
    }
    return memo
  },{})
}

module.exports = countWords


/* ----------------------------------- */
function reduce(arr, fn, initial) {
  // SOLUTION GOES HERE
  function newReduce(idx,obj) {
    if(idx > arr.length - 1) return obj
    return newReduce(idx + 1, fn(obj,arr[idx],idx,arr))
  }

  return newReduce(0,initial);
}

module.exports = reduce

/* ----------------------------------- */
function duckCount() {
   // SOLUTION GOES HERE
   var args = [].slice.call(arguments)
   return args.filter(function(object) {
     return Object.prototype.hasOwnProperty.call(object,'quack')
   }).length;
 }

 module.exports = duckCount


/* ----------------------------------- */
function logger(namespace) {
  // SOLUTION GOES HERE
  return function() {
    var args = [].slice.call(arguments)
    console.log(namespace + " " + args.join(" "));
  }
};

module.exports = logger



/* ----------------------------------- */
module.exports = function(namespace) {
  // SOLUTION GOES HERE
  return console.log.bind(console,namespace)
}


/* ----------------------------------- */
module.exports = function arrayMap(arr, fn) {
  // SOLUTION GOES HERE
  return arr.reduce(function(memo,element,idx,arr) {
    memo.push(fn(element));
    return memo
  },[])
}


/* ----------------------------------- */
function Spy(target, method) {
  // SOLUTION GOES HERE
  var oldFunc = target[method];
  var counter = {
    count: 0
  }

  target[method] = function() {
    counter.count += 1;
    return oldFunc.apply(this,arguments);
  }

  return counter;
}

module.exports = Spy

/* ----------------------------------- */
// I have a basic understanding why this works but would like further explanation.
function repeat(operation, num) {
  // modify this so it can be interrupted
  if (num <= 0) return
  operation()

  if(num % 10) {
    setTimeout(function() {
      repeat(operation, --num)
    })
  } else {
    repeat(operation, --num)
  }
}

module.exports = repeat

/* ----------------------------------- */
function* repeat(operation, num) {
    // Modify this so it doesn't cause a stack overflow!
   while(num>=0) {
      --num
      yield operation
   }
   return repeat(operation, --num)
 }

 function trampoline(fn) {
   // You probably want to implement a trampoline!
 }

 module.exports = function(operation, num) {
   // You probably want to call your trampoline here!
   return repeat(operation, num).next();
 }

/* ----------------------------------- */

 function loadUsers(userIds, load, done) {
    userIds.forEach(function(element) {
      return new Promise(function(resolve,reject) {
        load(element,function() {
          resolve(done)
        })
      })
    }).then(function(data) {
      return data;
    })
 }

 module.exports = loadUsers

 /* ----------------------------------- */

function getDependencies(tree, dependencyList) {
    //base case
    var dependencyList = dependencyList || []
    if(!tree || !tree.dependencies) return dependencyList
    var deps = tree.dependencies || {}

    var arrayDeps = Object.keys(tree.dependencies)
    arrayDeps.forEach(function(dep) {
      var dependencyString = dep + '@' + deps[dep]['version'];
      if(!dependencyList.includes(dependencyString)) {
        dependencyList.push(dependencyString)
      }

      getDependencies(deps[dep],dependencyList)
    })
    return dependencyList.sort()
}

 module.exports = getDependencies

/* ----------------------------------- */

 function curryN(fn, n) {
   // SOLUTION GOES HERE
   var arity = n || fn.length;

   
 }

 module.exports = curryN
