const fs = require("fs");

module.exports = async function getConfig() {

  const fileConfig = await findFileConfig();

  if (!fileConfig) {
    // The .compactignore does not exist, we should check the next location
    // Which we would now want to check the package.json

    const packConfig = await readPackage();

    if (!packConfig) {
      console.log("Couldn't locate a .compactignore config!");
      process.exit(1);
    }

    return packConfig;
  }

  // The .compactignore exists, lets return
  return fileConfig;
}

async function findFileConfig() {
  // This will attempt to locate a `.compactignore` configuration file

  try {

    let fileExists = await findFile(".compactignore");

    console.log(`.compactignore Found: ${fileExists}`);

    let file = fs.readFileSync(fileExists, { encoding: "utf8" });

    return file;

  } catch(err) {
    console.log(err);
    return false;
  }
}

async function findFile(searchFile) {
  return new Promise(function (resolve, reject) {
    let fileFound = false;

    fs.readdir("./", (err, files) => {
      if (err) {
        reject(err);
      }

      files.forEach((file) => {
        if (file == searchFile) {
          fileFound = true;
          resolve(`./${file}`);
        }
      });

      if (!fileFound) {
        reject(false);
      }
    });
  });
}

async function readPackage() {
  try {

    let pack = fs.readFileSync("package.json", { encoding: "utf8" });

    pack = JSON.parse(pack);

    if (pack.compactignore) {

      return pack.compactignore;

    } else {
      return false;
    }
  } catch(err) {
    console.log(err);
    return false;
  }
}
