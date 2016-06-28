// console.log('HELLO WORLD')

/* ------------------------------------- */

// var total = process.argv.slice(2).reduce(function(accm,num){
//   return accm += Number(num);
// },0);
//
// console.log(total);

/* ------------------------------------- */

// var fs = require('fs');
//
// var data = fs.readFileSync(process.argv[2]);
// var newLinesCount = data.toString().split('\n').length - 1;
// console.log(newLinesCount);

/* ------------------------------------- */

// var fs = require('fs');
//
// fs.readFile(process.argv[2],'utf8',function(err,data) {
//   if(err) return err;
//   console.log(data.toString().split("\n").length - 1);
// })

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
