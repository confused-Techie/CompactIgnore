const { parseArgv } = require("./options.js");
const { getConfig } = require("./configuration.js");
const { parseConfig } = require("./parse.js");
const { saveFile } = require("./file_handles.js");

async function run(rawArguments) {
  var options = parseArgv(rawArguments);

  if (options.status) {
    getConfig()
      .then((config) => {
        // the config should be the raw file from .compactignore

        parseConfig(JSON.parse(config))
          .then((result) => {
            // finally the result here will be an array of objects containing the name and contents of each file that needs to be saved

            result.forEach((obj) => {
              saveFile(obj.fileName, obj.fileContents)
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => {
                  console.log(err);
                  process.exitCode = 1;
                });
            });
          })
          .catch((err) => {
            console.log(err);
            process.exitCode = 1;
          });
      })
      .catch((err) => {
        console.log(err);
        process.exitCode = 1;
      });
  } else {
    console.log("Something went wrong parsing CLI Options");
    process.exitCode = 1;
  }
}

module.exports = {
  run,
};
