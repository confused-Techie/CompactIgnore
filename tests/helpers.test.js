const helpers = require("../src/parsers/helpers.js");

test("Passes 'Comment' to gitLikeAddComment to get '# Comment'", () => {
  expect(helpers.gitLikeAddComment("Comment")).toBe("# Comment\n");
});

test("Passes 'Thisisastring' to isNotNull to get 'true'", () => {
  expect(helpers.isNotNull("Thisisastring")).toBe(true);
});
