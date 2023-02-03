const common = require("./common.js");

const PROFILE = "prettierignore";
const ATTRIBUTION = "# === Autogenerated by CompactIgnore::prettierignore === #\n\n";

async function build(obj) {
  let use = common.getGenericProfiles(obj);

  if (obj["prettierignore"]) {
    use = use.concat(obj["prettierignore"].children);
  }

  let tempContent = await generateContent(use);

  let file = {
    name: ".prettierignore",
    content: tempContent,
    attribution: ATTRIBUTION
  };

  return file;
}

async function generateContent(obj) {
  let content = "";

  for (let i = 0; i < obj.length; i++) {
    if (obj[i].type === "comment") {
      content += `# ${obj[i].value}\n`;
    }
    if (obj[i].type === "inclusion") {
      content += `!${obj[i].value}\n`;
    }
    if (obj[i].type === "exclusion") {
      content += `${obj[i].value}\n`;
    }
  }

  return content;
}

module.exports = {
  PROFILE,
  build,
};
