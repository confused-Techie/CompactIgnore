const ParseTable = require("../parse_table.json");

function parseConfig(config) {
  return new Promise(function (resolve, reject) {
    // Parse config will handle reading the config file, and using lookups provided in other methods to generate the proper syntax per
    // each type of config file specified, handing this back as an array of objects to index, which can finally start writing the files
    // to disk

    // this instead should use an importable lookup table.
    // then loop through with rules and logic to translate the neutral syntax to each platform
    //console.log(ParseTable);

    // Testing the new ParseTable

    console.log(`Using ParseTable Version ${ParseTable.version} for Matching`);
    var tmpProfileFile = [];
    ParseTable.profiles.forEach((profile, index) => {
      if (isNotNullCheck(config[profile.declarator])) {
        console.log(`Looking at: config.${profile.declarator}`);
        console.log(config[profile.declarator]);
        // now that we know the specific profile from the parse table is entered and not null, we can process it,
        // using the functions described in the parse table, with the import described.

        var profileObj = { fileName: profile.name, fileContents: "" };
        const tmpParser = require(profile.path);

        if (typeof tmpParser.attribution === "function") {
          profileObj.fileContents += tmpParser.attribution();
        }

        if (isArrayEmpty(config[profile.declarator])) {
          // since if one wants to populate all files with only globals, this may be empty
          config[profile.declarator].forEach((entry, entryIndex) => {
            // now we want to loop through each entry of compactignore within the specific declaration profile
            // and depending on the values that are specified, we will call the corresponding functions declared in the parse table.
            // while ensuring the minimium amount of values are there.

            profileObj.fileContents += tmpParser[profile.parser](entry);
          });
        }

        // Then to ensure this is called as well with the global values
        if (isNotNullCheck(config.global)) {
          config.global.forEach((globalEntry) => {
            profileObj.fileContents += tmpParser[profile.parser](globalEntry);
          });
        }

        tmpProfileFile.push(profileObj);
      }

      if (ParseTable.profiles.length - 1 == index) {
        resolve(tmpProfileFile);
      }
    });
  });
}

function isNotNullCheck(toCheck) {
  if (typeof toCheck !== "undefined") {
    return true;
  } else {
    return false;
  }
}

function isArrayEmpty(toCheck) {
  try {
    if (toCheck.length <= 0) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    // likely the error will be that length can't be read.
    return false;
  }
}

module.exports = { parseConfig };
