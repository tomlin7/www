import fs from "node:fs";

const sections = JSON.parse(
  fs.readFileSync("content/current-resume.json", "utf8"),
);
const text = sections
  .map(({ heading, content }) => `${heading.toUpperCase()}\n${content}`)
  .join("\n\n");
fs.writeFileSync(
  "public/resume.txt",
  `Dheeraj C.\nBengaluru, India · hello@tomlin7.com\nhttps://tomlin7.com\n\n${text}\n`,
);
