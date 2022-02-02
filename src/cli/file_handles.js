const fs = require('fs');

function findFile(searchFile) {
  return new Promise(function (resolve, reject) {
    var fileFound = false;
    fs.readdir('./', (err, files) => {
      if (err) {
        reject(err);
      }

      files.forEach(file => {
        if (file == searchFile) {
          fileFound = true;
          resolve('./'+file);
        }
      });
      if (!fileFound) {
        reject(false);
      }
    });
  });
}

function readFileContents(fileToRead) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileToRead, 'utf8', function(err, data) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function saveFile(fileName, fileContents) {
  return new Promise(function (resolve, reject) {
    try {
      fs.writeFileSync(`./${fileName}`, fileContents)
      resolve(`Successfully Wrote ${fileName}`);
    } catch(err) {
      reject(err);
    }
  });
}

module.exports = { findFile, readFileContents, saveFile };
