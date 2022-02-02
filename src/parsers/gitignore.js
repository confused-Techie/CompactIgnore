// The Gitignore Parser will take an entry in and return a valid .gitignore entry, consisting of only the file directive, or may put an associated comment before it.
// This file will escape any characters as needed, but will not remove or operate on pre-escaped characters.
// Attempting to leave all the benifits of the .gitignore format available with use of the parser.

function injest(data) {
  var tmpReturn = "";

  if (isNotNull(data.comment)) {
    tmpReturn += addComment(data.comment);
  }

  if (isNotNull(data.action) && isNotNull(data.location)) {
    tmpReturn += addEntry(data.action, data.location);
  }
  return tmpReturn;
}

function addComment(string) {
  // this will simply add in a standard comment in .gitignore formatting
  let comment = sanatize(string);
  comment = `# ${comment}\n`;
  return comment;
}

function addEntry(action, location) {
  let fileLoc = sanatize(location);
  let formattedLoc = escape(fileLoc);
  var tmpReturn = "";

  if (action == "exclude") {
    tmpReturn = `${formattedLoc}\n`;
  } else if (action == "include") {
    tmpReturn = `!${formattedLoc}\n`;
  }

  return tmpReturn;
}

function attribution() {
  return "# === This file was Autogenerated by the CompactIgnore gitignore Profile === #\n\n";
}

function isNotNull(toCheck) {
  return typeof toCheck !== null;
}

function sanatize(string) {
  let sanatizeString = string.replace("\r", "").replace("\n", "");
  sanatizeString = sanatizeString.trim();
  return sanatizeString;
}

function escape(string) {
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

module.exports = { injest, attribution };
