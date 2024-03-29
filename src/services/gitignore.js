const common = require("./common.js");

const PROFILE = "gitignore";
const ATTRIBUTION = "# === Autogenerated by CompactIgnore::gitignore === #\n\n";

async function build(obj) {
  let use = common.getGenericProfiles(obj);

  // Lets pull only the values we care about if they exist

  if (obj["gitignore"]) {
    use = use.concat(obj["gitignore"].children);
  }

  let tempContent = await generateContent(use);

  let file = {
    name: ".gitignore",
    content: tempContent,
    attribution: ATTRIBUTION,
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
