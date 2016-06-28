function upperCaser(input) {
  return input.toUpperCase();
}

module.exports = upperCaser;


function repeat(operation, num) {
  for(var i=0; i<num;i++) {
    operation();
  }
}

// Do not remove the line below
module.exports = repeat


function doubleAll(numbers) {
  return numbers.map(function(num) {
    return num * 2;
  })
}

 module.exports = doubleAll



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
