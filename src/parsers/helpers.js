function isNotNull(toCheck) {
  return typeof toCheck !== null;
}

function sanatize(string) {
  let sanatizeString = string.replace("\r", "").replace("\n", "");
  sanatizeString = sanatizeString.trim();
  return sanatizeString;
}

module.exports = { isNotNull, sanatize };
