var fs = require('fs');

module.exports = function(dirName,fileExt,cb) {

  fs.readdir(dirName,function(err,data) {
    if (err) return cb(err);

    var fileExtension = new RegExp('.' + fileExt);

    var filteredFiles = data.toString().split(",").filter(function(file,idx,arr) {
      return file.match(fileExtension);
    })


    return cb(null,filteredFiles);

  });

};
