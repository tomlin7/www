import fs from "node:fs";
import path from "node:path";

// Import data only. The extracted archive never supplies application components.
const source = path.resolve(process.argv[2] || "../extracted_data");
const destination = path.resolve("content/source");
fs.mkdirSync(destination, { recursive: true });
function copyText(directory, relative = "") {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const next = path.join(relative, entry.name);
    if (entry.isDirectory()) copyText(path.join(directory, entry.name), next);
    else if (entry.name.endsWith(".txt")) {
      fs.mkdirSync(path.dirname(path.join(destination, next)), {
        recursive: true,
      });
      fs.copyFileSync(
        path.join(directory, entry.name),
        path.join(destination, next),
      );
    }
  }
}
copyText(source);
fs.mkdirSync("public", { recursive: true });
// Reviewed current downloads take precedence over the historical archive.
if (!fs.existsSync("content/current-resume.json")) {
  fs.copyFileSync(path.join(source, "Resume.pdf"), "public/Resume.pdf");
  fs.copyFileSync(path.join(source, "resume.txt"), "public/resume.txt");
}
const read = (name) =>
  fs.readFileSync(path.join(source, name), "utf8").replace(/\r\n/g, "\n");
const field = (text, name) =>
  text.match(new RegExp(`^${name}: (.+)$`, "m"))?.[1]?.trim() || "";
const section = (text, name) =>
  text
    .match(
      new RegExp(
        `(?:^|\\n)${name}:\\n([\\s\\S]*?)(?=\\n(?:Problem Solved|Impact Created|Recruiter Points):|$)`,
      ),
    )?.[1]
    ?.trim() || "";
const projectSource = read("projects.txt");
const projects = projectSource
  .split(/={10,}\n\d+\. [^\n]+\n={10,}\n/)
  .slice(1)
  .map((block) => {
    block = block.split(/={10,}\nADDITIONAL NOTABLE/)[0];
    const category = field(block, "Category");
    return {
      title: field(block, "Title"),
      subtitle: field(block, "Subtitle"),
      category,
      group: category.startsWith("AI")
        ? "ai"
        : category.startsWith("Systems")
          ? "systems"
          : "apps",
      github: field(block, "GitHub"),
      package: field(block, "PyPI"),
      technologies: field(block, "Technologies").split(", "),
      description: section(block, "Description"),
      problem: section(block, "Problem Solved"),
      impact: section(block, "Impact Created"),
      notes: section(block, "Recruiter Points")
        .split("\n")
        .filter((line) => line.startsWith("- "))
        .map((line) => line.slice(2)),
    };
  });
const additionalProjects = [
  ...projectSource.matchAll(
    /\n(1[567])\. (.+?) – (.+)\nStack: (.+)\nBullets:\n([\s\S]*?)(?=\n1[567]\. |$)/g,
  ),
].map((match) => ({
  title: match[2],
  subtitle: match[3],
  technologies: match[4].split(", "),
  notes: match[5]
    .trim()
    .split("\n")
    .map((line) => line.replace(/^- /, "")),
}));
const posts = fs
  .readdirSync(path.join(source, "blog_posts"))
  .filter((name) => name.endsWith(".txt"))
  .map((name) => {
    const raw = read(`blog_posts/${name}`);
    const boundary = raw.indexOf(
      "--------------------------------------------------------------------------------",
    );
    return {
      slug: name.replace(/\.txt$/, ""),
      title: raw.match(/^# (.+)/)?.[1] || name,
      date: field(raw, "Date"),
      category: field(raw, "Category"),
      readTime: field(raw, "Read Time"),
      description: field(raw, "Description"),
      image: field(raw, "Image"),
      medium: field(raw, "Medium Link"),
      content: raw.slice(boundary + 80).trim(),
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date));
const experience = read("experience.txt")
  .split(/={10,}\n\d+\. ([^\n]+)\n={10,}\n/)
  .slice(1);
const jobs = [];
for (let i = 0; i < experience.length; i += 2)
  jobs.push({
    organization: experience[i],
    role: field(experience[i + 1], "Role"),
    period: field(experience[i + 1], "Period").replace(/ \(.+\)$/, ""),
    location: field(experience[i + 1], "Location"),
    href: field(experience[i + 1], "Link"),
    notes: experience[i + 1]
      .split("\n")
      .filter((line) => line.startsWith("- "))
      .map((line) => line.slice(2)),
  });
const skills = [
  ...read("skills_and_technologies.txt").matchAll(
    /## (.+)\n([\s\S]*?)(?=\n## |$)/g,
  ),
].map((match) => ({
  name: match[1],
  items: match[2]
    .trim()
    .split("\n")
    .map((line) => line.replace(/^- /, "")),
}));
const tracks = [
  ...read("ipod_tracks.txt").matchAll(
    /^\d+\. (.+?) - (.+?) \(Album: (.+?) \| Duration: (.+?) \| Genre: (.+?) \| YouTube: ([^)]+)\)/gm,
  ),
].map((match) => ({
  artist: match[1],
  title: match[2],
  album: match[3],
  duration: match[4],
  genre: match[5],
  href: `https://www.youtube.com/watch?v=${match[6]}`,
}));
const resume = [
  ...read("resume.txt").matchAll(
    /\n([A-Z &]+)\n-{10,}\n([\s\S]*?)(?=\n[A-Z &]+\n-{10,}|={10,}|$)/g,
  ),
].map((match) => ({
  heading: match[1].toLowerCase(),
  content: match[2].trim(),
}));
if (
  projects.length !== 14 ||
  posts.length !== 2 ||
  jobs.length !== 3 ||
  tracks.length !== 30 ||
  additionalProjects.length !== 3
)
  throw new Error(
    "Archive shape changed; review the importer before publishing.",
  );
fs.writeFileSync(
  "content/projects.json",
  JSON.stringify({ projects, additionalProjects }, null, 2) + "\n",
);
fs.writeFileSync(
  "content/portfolio.json",
  JSON.stringify(
    {
      projects,
      additionalProjects,
      posts,
      experience: jobs,
      skills,
      tracks,
      resume,
    },
    null,
    2,
  ) + "\n",
);
console.log(
  `Imported ${projects.length + additionalProjects.length} projects, ${posts.length} posts, ${jobs.length} experience entries, ${tracks.length} tracks, and the complete text archive.`,
);
