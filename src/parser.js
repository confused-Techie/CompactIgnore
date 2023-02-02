// This class will take a config, and destructure it appropriately
class Parser {
  constructor(config) {
    this.config = config;
    this.out = {};
    this.index = 0;

    // State Tracking
    this.curProfile;
  }

  async parse() {
    let cur = this.cur();

    if (cur === ">") {
      // This character means a profile declarator
      let profile = this.greedyNext();
      this.curProfile = profile.trim(); // set profile state
      this.out[this.curProfile] = { children: [] }; // We assign an object for our profile
      return this.parse();
    }

    if (cur === "#") {
      // This character means this line is a comment
      let comment = this.greedyNext();
      // Store comments with their profile
      if (this.curProfile) {
        this.out[this.curProfile].children.push({
          type: "comment",
          value: comment.trim()
        });
      } else {
        // the comment occured outside of proper profile, add under custom profile
        this.out.orphanComments = [];
        this.out.orphanComments.push(comment.trim());
      }
      return this.parse();
    }

    if (cur === "!") {
      // This character means an inclusion
      let line = this.greedyNext();
      if (this.curProfile) {
        this.out[this.curProfile].children.push({
          type: "inclusion",
          value: line
        });
      } // else the inclusion is dropped
      return this.parse();
    }

    if (this.index === this.config.length || this.index > this.config.length) {
      // This indicates we have parsed the whole file
      this.curProfile = undefined;
      return;
    }

    if (/[\r\n]+/.test(cur)) {
      // If we are currently on a line ending selector, just move to the next character
      this.next();
      return this.parse();
    }

    if (/./.test(cur)) {
      // Any non-line terminator was found
      // Match as generic text

      // While in most cases we don't care about the line identifier
      // since that's required on lines where the first character is part of the path
      // we can pass that value to greedyNext
      let line = this.greedyNext(cur);
      if (this.curProfile) {
        this.out[this.curProfile].children.push({
          type: "exclusion",
          value: line
        });
      } // else the exclusion is dropped
      return this.parse();
    }

    // Else it's none of these. Lets parse just in case
    return this.parse();
  }

  cur() {
    return this.config.charAt(this.index);
  }

  next() {
    this.index = this.index + 1;
    return this.config.charAt(this.index);
  }

  peek() {
    // Returns the next char without moving the index
    return this.config.charAt(this.index + 1);
  }

  greedyNext(existingLine) {
    // Will use next to consume the text until line ending characters are found
    // We optionally assign line to existing line in case of self called recursion
    let line = existingLine ?? "";

    if (/[\r\n]+/.test(this.peek())) {
      // if a newline is found
      this.index = this.index + 1;
      return line;
    } else {
      // if the next index contains anything other than newline characters
      line += this.next();
      return this.greedyNext(line);
    }
  }

}

module.exports = Parser;
