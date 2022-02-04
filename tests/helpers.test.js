const helpers = require("../src/parsers/helpers.js");

test("Passes 'Comment' to gitLikeAddComment to get '# Comment'", () => {
  expect(helpers.gitLikeAddComment("Comment")).toBe("# Comment\n");
});
