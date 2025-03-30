const fs = require("fs").promises;
const path = require("path");

const getHTMLContent = async (data) => {
  const templatePath = path.join("public", data.publicPath);

  let htmlContent = await fs.readFile(templatePath, "utf-8");

  for (let key in data) {
    const value = data[key] ?? "";
    htmlContent = htmlContent.replace(`{{${key}}}`, value);
  }

  return htmlContent;
};

module.exports = getHTMLContent;
