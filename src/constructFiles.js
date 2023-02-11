const dockerignore = require("./services/dockerignore.js");
const eslintignore = require("./services/eslintignore.js");
const gitignore = require("./services/gitignore.js");
const npmignore = require("./services/npmignore.js");
const prettierignore = require("./services/prettierignore.js");
const gcloudignore = require("./services/gcloudignore.js");

let PROFILES = [];

module.exports = async function constructFiles(obj) {
  // Takes the internal structure and passes it to required profiles who should
  // return a filename and file content

  // Generate our list of supported profiles
  generateProfiles();

  let files = [];

  for (const profile in obj) {
    // First ignore generic profiles
    if (profile === "GLOBAL" || profile === "global") {
      continue;
    }
    if (profile === "orphanComments") {
      continue;
    }

    for (const service of PROFILES) {
      if (profile === service.profile) {
        let temp = await service.build(obj);
        files.push(temp);
        break;
      }
    }
  }

  return files;
};

function generateProfiles() {
  PROFILES.push({
    profile: dockerignore.PROFILE,
    build: dockerignore.build,
  });

  PROFILES.push({
    profile: eslintignore.PROFILE,
    build: eslintignore.build,
  });

  PROFILES.push({
    profile: gitignore.PROFILE,
    build: gitignore.build,
  });

  PROFILES.push({
    profile: npmignore.PROFILE,
    build: npmignore.build,
  });

  PROFILES.push({
    profile: prettierignore.PROFILE,
    build: prettierignore.build,
  });

  PROFILES.push({
    profile: gcloudignore.PROFILE,
    build: gcloudignore.build,
  });
}
