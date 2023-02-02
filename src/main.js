const getConfig = require("./configuration.js");
const parse = require("./parse.js");
const constructFiles = require("./constructFiles.js");
const fs = require("fs");

async function run(rawArguments) {
  // Until we support options, we will leave rawArguments alone

  let config = await getConfig();

  // We have our config, now lets parse it, and get back the objects to write

  let writable = await parse(config);

  let files = await constructFiles(writable);

  let res = await writeFiles(files);

  if (res === 0) {
    console.log("Done!");
  } else {
    console.error(res);
  }
}

async function writeFiles(files) {
  let errs = [];
  for (file of files) {

    // Later on we can check if we should add an attribution
    try {
      let text = file.attribution;
      text += file.content;

      fs.writeFileSync(file.name, text, { encoding: "utf8" });

    } catch(err) {
      errs.push(err);
    }
  }

  if (errs.length === 0) {
    return 0;
  } else {
    return errs;
  }
}

module.exports = {
  run,
};
