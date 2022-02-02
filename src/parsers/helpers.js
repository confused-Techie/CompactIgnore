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

module.exports = { isNotNull, sanatize };
