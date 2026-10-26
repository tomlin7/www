import fs from "node:fs";

// The scene consumes the same content archive as the rest of the portfolio.
const content = JSON.parse(fs.readFileSync("content/portfolio.json", "utf8"));
const root = "public/picnic";
const ids = [
  "biscuit",
  "ted",
  "hypercode",
  "lemon",
  "ember",
  "logicarium",
  "positron",
  "neurodriver",
];
const palettes = [
  "#355c54",
  "#354d76",
  "#8b413e",
  "#776935",
  "#914a32",
  "#4d4f77",
  "#37616c",
  "#3d664e",
];
const all = ids.map((id, index) => {
  const project = content.projects.find(
    (entry) => entry.title.toLowerCase() === id,
  );
  if (!project) throw new Error(`Missing picnic project: ${id}`);
  return {
    ...project,
    id,
    name: project.title,
    summary: project.description,
    ink: palettes[index],
    pm: { x: index % 2 ? 90 : 352, y: 224, R: 40 },
  };
});
const tools = [
  "rust",
  "python",
  "typescript",
  "cpp",
  "go",
  "react",
  "linux",
  "git",
  "pytorch",
  "nextjs",
];
const notes = content.experience.map((job, index) => ({
  name: job.organization.replace(/ \(.+\)$/, ""),
  role: `${job.role} / ${job.period}`,
  client: tools[index],
  quote: job.notes.slice(0, 2).join(" "),
}));
notes.push({
  name: "BIT Mesra",
  role: "Computer Science & Engineering / 2023–2027",
  client: "cpp",
  quote:
    "Learning by building: code editors, programming languages, game engines, and the systems underneath them. Most projects start with a small question I want to understand.",
});
const contacts = [
  { id: "email", name: "Email", value: "hello@tomlin7.com" },
  { id: "linkedin", name: "LinkedIn", url: "https://linkedin.com/in/initdhee" },
  { id: "github", name: "GitHub", url: "https://github.com/tomlin7" },
  { id: "x", name: "X", url: "https://x.com/tomfricks" },
  { id: "resume", name: "Résumé", url: "/Resume.pdf" },
];
const data = {
  bio: "I build code editors, devtools, graphics experiments, and things close to the metal. I’ve interned at Hooman Digital and OZI, researched EEG classification at NIT Calicut, and spend a lot of time wondering how systems work underneath. Currently working on biscuit, ted, and whatever question comes next.",
  identity: [
    "Dheeraj C.",
    "Systems & Software Engineer",
    "BIT Mesra · Class of 2027",
  ],
  cover: all[0],
  projects: all.slice(1),
  all,
  notes,
  tools,
  contacts,
};
for (const folder of [
  root,
  `${root}/stamps`,
  `${root}/stamps/mini`,
  `${root}/clients`,
  `${root}/work`,
])
  fs.mkdirSync(folder, { recursive: true });
fs.writeFileSync(
  `${root}/data.js`,
  `// Generated from content/portfolio.json. Run npm run picnic:content to refresh.\nwindow.PicnicData = ${JSON.stringify(data, null, 2)};\n`,
);
const escape = (text) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

function stamp(project, index) {
  const color = project.ink;
  let perforation = "";
  for (let x = 0; x <= 440; x += 20)
    perforation += `<circle cx="${x}" cy="0" r="5.5"/><circle cx="${x}" cy="308" r="5.5"/>`;
  for (let y = 0; y <= 308; y += 20)
    perforation += `<circle cx="0" cy="${y}" r="5.5"/><circle cx="440" cy="${y}" r="5.5"/>`;
  let hatching = "";
  for (let x = -200; x < 650; x += 7) hatching += `<path d="M${x} 0l200 220"/>`;
  const graphic =
    project.id === "lemon"
      ? `<path d="M142 183c-21-47 17-92 70-83 23-28 53-20 71-1 29 30 19 94-29 115-50 23-94 6-112-31Z" fill="#f1df97"/><path d="M213 102c2-31 26-37 52-33-10 25-26 35-52 33Z" fill="${color}"/><path d="M178 123q-34 31-12 62m76-64q24 17 8 51" opacity=".5"/>`
      : project.id === "ember" || project.id === "neurodriver"
        ? `<path d="M40 226l101-124 65 66 60-105 138 163Z" fill="${color}" opacity=".24"/><path d="M41 226l100-124 31 38 34 28 60-105 137 163M199 226l43-65 44 65M66 226l63-46 58 46"/><circle cx="330" cy="100" r="24" fill="${color}" opacity=".4"/><path d="M40 227h364M40 234h364"/>`
        : `<rect x="91" y="78" width="258" height="145" rx="7" fill="#f1ebd6"/><rect x="99" y="86" width="242" height="126" fill="${color}" opacity=".16"/><path d="M99 106h242M147 107v104M202 223v19m36-19v19m-62 3h88"/><circle cx="110" cy="96" r="2"/><circle cx="120" cy="96" r="2"/><circle cx="130" cy="96" r="2"/><path d="m189 139-17 14 17 14m78-28 17 14-17 14m-28-35-16 43" stroke-width="4"/><path d="M109 123h26m-26 10h18m-18 10h24m-24 10h14m33 37h163" opacity=".6"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="440" height="308" viewBox="0 0 440 308"><defs><mask id="edge"><rect width="440" height="308" fill="white"/><g fill="black">${perforation}</g></mask><clipPath id="art"><rect x="31" y="70" width="378" height="172"/></clipPath></defs><g mask="url(#edge)"><rect width="440" height="308" fill="#f8f0d8"/><rect x="15" y="15" width="410" height="278" fill="${color}"/><rect x="24" y="24" width="392" height="260" fill="#f1e8cb" stroke="#f9f3e4" stroke-width="2"/><rect x="31" y="70" width="378" height="172" fill="${color}" opacity=".05"/><g clip-path="url(#art)" stroke="${color}" stroke-width=".45" opacity=".15">${hatching}</g><g stroke="${color}" fill="none" stroke-width="2">${graphic}</g><text x="220" y="57" text-anchor="middle" font-family="Georgia,serif" font-weight="bold" font-size="${project.name.length > 10 ? 27 : 34}" fill="${color}">${escape(project.name.toUpperCase())}</text><text x="220" y="270" text-anchor="middle" font-family="Georgia,serif" letter-spacing="2" font-size="13" fill="${color}">SYSTEMS · SOFTWARE · CURIOSITY</text><text x="47" y="269" font-family="Georgia,serif" font-size="25" fill="${color}">${index + 1}</text><text x="395" y="269" text-anchor="end" font-family="Georgia,serif" font-size="25" fill="${color}">${index + 1}</text></g></svg>`;
}

for (const [index, project] of all.entries()) {
  const svg = stamp(project, index);
  fs.writeFileSync(`${root}/stamps/${project.id}.svg`, svg);
  fs.writeFileSync(`${root}/stamps/mini/${project.id}.svg`, svg);
}
for (const [index, tool] of tools.entries()) {
  const colors = [
    "#bb552f",
    "#345b85",
    "#2c61a3",
    "#586aa4",
    "#42909d",
    "#38728f",
    "#48453d",
    "#c35a34",
    "#ba4b34",
    "#292724",
  ];
  const title =
    tool === "cpp" ? "C++" : tool === "nextjs" ? "NEXT.JS" : tool.toUpperCase();
  fs.writeFileSync(
    `${root}/clients/${tool}.svg`,
    `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="150"><rect x="4" y="4" width="352" height="142" rx="32" fill="#fff9e8" stroke="${colors[index]}" stroke-width="5"/><text x="180" y="94" text-anchor="middle" font-family="Georgia,serif" font-weight="bold" font-size="${title.length > 7 ? 37 : 48}" fill="${colors[index]}">${title}</text></svg>`,
  );
}
fs.writeFileSync(
  `${root}/clients/title.svg`,
  `<svg xmlns="http://www.w3.org/2000/svg" width="1086" height="110"><text x="323" y="84" text-anchor="middle" font-family="Georgia,serif" font-weight="bold" font-style="italic" font-size="82" fill="#355942">A few field</text><text x="866" y="84" text-anchor="middle" font-family="Georgia,serif" font-weight="bold" font-style="italic" font-size="92" fill="#a64038">notes.</text></svg>`,
);
fs.writeFileSync(
  `${root}/clients/logo.svg`,
  `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="100"><text x="80" y="69" text-anchor="middle" font-family="cursive" font-weight="bold" font-style="italic" font-size="70" fill="#315b94">dhee.</text></svg>`,
);

const letterCss = `:root{--paper:#fbf7ec;--ink:#141210;--ink2:#5b554c;--line:#e4d9c2}*{box-sizing:border-box}html,body{background:transparent;margin:0;color:var(--ink);font-family:Geist,system-ui,sans-serif}button,a{-webkit-tap-highlight-color:transparent}a{color:inherit}button:focus-visible,a:focus-visible{outline:2px solid #1d3fa6;outline-offset:5px}.back{position:fixed;left:16px;top:16px;z-index:10;border:0;border-radius:100px;padding:12px 18px;background:var(--paper);box-shadow:0 6px 24px #46141930;font:500 15px Geist,system-ui;cursor:pointer}.letter{position:relative;width:min(1180px,calc(100% - 48px));margin:max(96px,14vh) auto 120px;padding:80px 80px 100px;background:var(--paper);box-shadow:0 1px 2px #46141930,0 40px 80px -30px #46141960}.col{max-width:960px;margin:auto}.lt-head{display:grid;grid-template-columns:1fr auto;gap:48px}.lt-head h1{margin:48px 0 16px;font-size:clamp(36px,4.4vw,56px);letter-spacing:-.045em;line-height:1.06}.label{font-size:13px;color:var(--ink2);letter-spacing:.06em}.lede{font-size:20px;line-height:1.6;color:var(--ink2);max-width:600px}.lt-slot{position:relative;width:clamp(170px,20vw,240px);margin:-16px -16px 0 0}.lt-stamp{display:block;width:100%;aspect-ratio:440/308;transform:rotate(3deg);filter:drop-shadow(0 3px 5px #3c280029);opacity:0}.live{display:inline-flex;gap:8px;align-items:center;padding:16px 24px;border-radius:50px;background:var(--ink);color:var(--paper);text-decoration:none;font-weight:600;margin-top:20px}.stack{display:flex;flex-wrap:wrap;gap:10px 24px;border-block:1px solid var(--line);padding:22px 0;margin-top:64px;font-size:13px;color:var(--ink2)}section{padding-top:90px}h2{font-size:clamp(28px,3.6vw,40px);letter-spacing:-.035em;line-height:1.2;margin:0 0 24px}section p,section li{font-size:18px;line-height:1.8;color:var(--ink2)}section li{margin-bottom:18px}footer{margin-top:90px;padding-top:26px;border-top:1px solid var(--line);display:flex;justify-content:space-between;gap:20px;font-size:14px}footer button{border:0;background:transparent;font:inherit;cursor:pointer}.postmark{position:absolute;width:160px;height:160px;right:19%;top:10%;border:3px double #324981;border-radius:50%;display:grid;place-content:center;color:#324981;text-align:center;transform:rotate(-17deg);font-size:11px;letter-spacing:.1em;line-height:2;opacity:0;pointer-events:none}.postmark.on{opacity:.65}@media(max-width:650px){.letter{width:calc(100% - 24px);padding:40px 24px 60px;margin-top:85px}.lt-head{grid-template-columns:1fr;gap:10px}.lt-slot{grid-row:1;width:150px;justify-self:end}.lt-head h1{margin-top:10px}.lede{font-size:17px}.stack{margin-top:35px}section{padding-top:55px}section p,section li{font-size:16px}.postmark{right:20px;top:150px;width:110px;height:110px;font-size:8px}footer{flex-wrap:wrap}}@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important}}`;
fs.writeFileSync(`${root}/work/letter.css`, letterCss);
for (const [index, project] of all.entries()) {
  const next = all[(index + 1) % all.length];
  fs.writeFileSync(
    `${root}/work/${project.id}.html`,
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(project.name)} / Dheeraj</title><meta name="description" content="${escape(project.summary)}"><link rel="canonical" href="https://tomlin7.com/projects#${project.id}"><link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap" rel="stylesheet"><link href="letter.css" rel="stylesheet"></head><body><button class="back" id="back">← Back to the picnic</button><main class="letter"><div class="col"><header class="lt-head"><div><p class="label">A PROJECT BY DHEERAJ C. / ${String(index + 1).padStart(2, "0")}</p><h1>${escape(project.name)}</h1><p class="lede">${escape(project.subtitle)}</p><a class="live" href="${escape(project.github)}" target="_blank" rel="noopener noreferrer">View on GitHub ↗</a></div><div class="lt-slot"><canvas class="lt-stamp" id="stamp" role="img" aria-label="${escape(project.name)} postage stamp"></canvas></div></header><div class="postmark" id="postmark">DHEERAJ C.<br>SELECTED WORK<br>PERSONAL PROJECT</div><div class="stack">${project.technologies.map((technology) => `<span>${escape(technology)}</span>`).join("")}</div><section><h2>The idea.</h2><p>${escape(project.summary)}</p></section><section><h2>The problem.</h2><p>${escape(project.problem)}</p></section><section><h2>What came out of it.</h2><p>${escape(project.impact)}</p><ul>${project.notes.map((note) => `<li>${escape(note)}</li>`).join("")}</ul></section><footer><a href="/projects" target="_top">All 17 projects ↗</a><button data-next="${next.id}">Next letter: ${escape(next.name)} →</button></footer></div></main><script src="letter.js"></script><script>initLetter(${JSON.stringify(project.id)});</script></body></html>`,
  );
}
fs.writeFileSync(
  `${root}/work/letter.js`,
  `function initLetter(id){const host=parent!==window?parent:null,stamp=document.getElementById("stamp"),mark=document.getElementById("postmark");function draw(art){stamp.width=art.width;stamp.height=art.height;stamp.getContext("2d").drawImage(art,0,0)}const art=host?.Picnic?.art(id)?.front;if(art)draw(art);else{const image=new Image;image.onload=()=>{draw(image);stamp.style.opacity=1};image.src="../stamps/"+id+".svg"}window.Letter={slot(){const rect=stamp.getBoundingClientRect();return{x:rect.left+rect.width/2,y:rect.top+rect.height/2,w:stamp.offsetWidth,h:stamp.offsetHeight,r:3*Math.PI/180}},hideStamp(){stamp.style.opacity=0;mark.classList.remove("on")},land(){stamp.style.opacity=1;mark.classList.add("on")},toTop(){return new Promise(resolve=>{if(scrollY<2)return resolve();scrollTo({top:0,behavior:matchMedia("(prefers-reduced-motion:reduce)").matches?"instant":"smooth"});const start=performance.now(),check=()=>scrollY<2||performance.now()-start>1000?resolve():setTimeout(check,30);check()})}};const close=()=>host?.Case?host.Case.close():location.assign("/minimal");document.getElementById("back").addEventListener("click",close);document.querySelector("[data-next]").addEventListener("click",event=>{const next=event.currentTarget.dataset.next;if(host?.Case)host.Case.go(next);else location.assign(next+".html")});addEventListener("keydown",event=>{if(event.key==="Escape")close()});if(!host)Letter.land();}\n`,
);
console.log(
  `Prepared ${all.length} project stamps and letters, ${notes.length} experience cards, and ${tools.length} tool stickers.`,
);
