function isNotNull(toCheck) {
  if (typeof toCheck !== "undefined") {
    return true;
  } else {
    return false;
  }
}

function sanatize(string) {
  let sanatizeString = string.replace("\r", "").replace("\n", "");
  sanatizeString = sanatizeString.trim();
  return sanatizeString;
}

// Due to how many of these formats implement gitLike syntax, there should be some common functions defined here to rely on

module.exports = { isNotNull, sanatize };
