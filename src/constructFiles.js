
const gitignore = require("./services/gitignore.js");
const dockerignore = require("./services/dockerignore.js");

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

}

function generateProfiles() {
  PROFILES.push({
    profile: gitignore.PROFILE,
    build: gitignore.build
  });

  PROFILES.push({
    profile: dockerignore.PROFILE,
    build: dockerignore.build
  });
}
