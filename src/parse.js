const Parser = require("./parser.js");
const { performance } = require("node:perf_hooks");

module.exports = async function parse(config) {
  // This function takes in the configuration, and manages it being
  // parsed properly, and converting this into usable files.

  if (typeof config === "object") {
    // This would be needed if reading config from a package.json
    // The object should match the internal structure
    return config;
  } else {
    // This would be needed when reading config from a file
    let parser = new Parser(config);

    let start = performance.now();

    await parser.parse();

    let end = performance.now() - start;

    //console.log(JSON.stringify(parser.out, null, 2));
    console.log(`Parsed .compactignore in ${end}ms`);

    return parser.out;
  }
}
