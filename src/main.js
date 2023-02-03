const fs = require("fs");
const { performance } = require("node:perf_hooks");
const getConfig = require("./configuration.js");
const parse = require("./parse.js");
const constructFiles = require("./constructFiles.js");

async function run(rawArguments) {
  let start = performance.now();

  // Until we support options, we will leave rawArguments alone

  let config = await getConfig();

  // We have our config, now lets parse it, and get back the objects to write

  let writable = await parse(config);

  let writeStart = performance.now();

  let files = await constructFiles(writable);

  let writeEnd = performance.now() - start;

  console.log(`Generated .ignores in ${writeEnd}ms`);

  let res = await writeFiles(files);

  let end = performance.now() - start;

  console.log(`Ran in ${end}ms`);

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
