const { defaults } = require("jest-config");
module.exports = {
  collectCoverage: true,
  coverageDirectory: "./tests/coverage/",
  coverageReporters: ["clover", "json"]
};
