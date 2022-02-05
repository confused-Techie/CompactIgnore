const options = require("../src/cli/options.js");

// Since options.js is unfinished we only need one test
test("Ensures true is returned as status obj, options is unfinished", () => {
  var testObj = { status: true };
  expect(options.parseArgv("anything")).toBe(testObj);
});
