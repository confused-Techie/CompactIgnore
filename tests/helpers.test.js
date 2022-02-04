const helpers = require("../src/parsers/helpers.js");

test("Passes 'Thisisastring' to isNotNull to get 'true'", () => {
  expect(helpers.isNotNull("Thisisastring")).toBe(true);
});

test("Passes undeclared variable to isNotNull to get 'false'", () => {
  var tmp;
  expect(helpers.isNotNull(tmp)).toBe(false);
});

test("Passes 'undefined' to isNotNull to get 'false'", () => {
  expect(helpers.isNotNull(undefined)).toBe(false);
});

test("Passes ' Test \n\r' to sanatize to get 'Test'", () => {
  expect(helpers.sanatize(" Test \n\r")).toBe("Test");
});

test("Passes 'Comment' to gitLikeAddComment to get '# Comment'", () => {
  expect(helpers.gitLikeAddComment("Comment")).toBe("# Comment\n");
});

test("Passes exclude 'node_modules/' to get node_modules/", () => {
  expect(helpers.gitLikeAddEntryNoEscape("exclude", "node_modules/")).toBe(
    "node_modules/\n"
  );
});

test("Passes exclude node_modules/  \n to get node_modules/", () => {
  expect(helpers.gitLikeAddEntryNoEscape("exclude", "node_modules/   \n")).toBe(
    "node_modules/\n"
  );
});

test("Passes include node_modules/ to get !node_modules/NEW_LINE", () => {
  expect(helpers.gitLikeAddEntryNoEscape("include", "node_modules/")).toBe(
    "!node_modules/\n"
  );
});

test("Passes BLANK node_modules/ to get # node_modules/ Has no valid ACTION!\n", () => {
  expect(helpers.gitLikeAddEntryNoEscape("", "node_modules/")).toBe("# node_modules/ Has no valid ACTION!\n");
});

test("Passes exclude #node_modules/ to get \\#node_modules", () => {
  expect(helpers.gitLikeAddEntryEscape("exclude", "#node_modules")).toBe(
    "\\#node_modules\n"
  );
});

test("Passes exclude !node_modules/ to get \\!node_modules", () => {
  expect(helpers.gitLikeAddEntryEscape("exclude", "!node_modules")).toBe(
    "\\!node_modules\n"
  );
});

test("Passes Entry Obj needing escaping, to expect proper, escaped obj", () => {
  var data = { comment: "Comment", action: "exclude", location: ".git\r" };
  var expectData = "# Comment\n.git\n";
  expect(helpers.gitLikeInjest(data, true)).toBe(expectData);
});

test("Passes Entry Obj w/o escaping, to expect proper, non-escaped obj", () => {
  var data = { comment: "Comment", action: "exclude", location: ".git" };
  var expectData = "# Comment\n.git\n";
  expect(helpers.gitLikeInjest(data, false)).toBe(expectData);
});
