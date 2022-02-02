const { findFile, readFileContents } = require("./file_handles.js");

function getConfig() {
  // we would normally want to check for a config passed via options in the command line
  // otherwise we can continue on

  // then first to see if our config file exists.
  return new Promise(function (resolve, reject) {

    findFile(".compactignore")
      .then((doesConfigFileExist) => {
        console.log(`Configuration File Found: ${doesConfigFileExist}`);
          readFileContents(doesConfigFileExist)
            .then(configFileContents => {
              resolve(configFileContents);
            });

      })
      .catch(err => {
        console.log(err);
        console.log("Configuration file coudln't be found");
        reject(err);
      });

  });
}

module.exports = { getConfig };
