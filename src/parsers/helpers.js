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

function gitLikeAddComment(string) {
  let comment = sanatize(string);
  comment = `# ${comment}\n`;
  return comment;
}

function gitLikeAddEntryNoEscape(action, location) {
  let fileLoc = sanatize(location);
  var tmpReturn = "";

  if (action == "exclude") {
    tmpReturn = `${fileLoc}\n`;
  } else if (action == "include") {
    tmpReturn = `!${fileLoc}\n`;
  }
  return tmpReturn;
}

function gitLikeAddEntryEscape(action, location) {
  let fileLoc = sanatize(location);
  let formattedLoc = gitLikeEscape(fileLoc);

  return gitLikeAddEntryNoEscape(action, formattedLoc);
}

function gitLikeEscape(string) {
  // this will take a sanatized file location string, and escape as needed, in line with the spec
  // Keeping in mind that this is used for actual entries and not comments.

  var escapedString = string;
  // Check starting with #
  if (escapedString.match(/^[#]/g) != null) {
    escapedString = `\\${escapedString}`;
  }
  // Check starting with !
  if (escapedString.match(/^[!]/g) != null) {
    escapedString = `\\${escapedString}`;
  }

  return escapedString;
}

module.exports = {
  isNotNull,
  sanatize,
  gitLikeAddComment,
  gitLikeAddEntryNoEscape,
  gitLikeEscape,
  gitLikeAddEntryEscape,
};
