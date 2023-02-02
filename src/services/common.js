// Common utility functions for services

function getGenericProfiles(obj) {
  let use = [];

  if (obj["orphanComments"]) {
    for (let i = 0; i < obj["orphanComments"].length; i++) {
      use.push({ type: "comment", value: obj["orphanComments"] });
    }
  }

  if (obj["GLOBAL"]) {
    use = use.concat(obj["GLOBAL"].children);
  }

  if (obj["global"]) {
    use = use.concat(obj["global"].children);
  }

  return use;
}

module.exports = {
  getGenericProfiles,
};
