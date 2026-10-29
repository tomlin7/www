# Current portfolio content

The October 26, 2026 review in `C:/Users/BIT/Documents/github-new/eod-board/job-search/` supplies the current project descriptions and status notes. The resume also uses the general `dheeraj-resume.tex` and the reviewed research content in `resume 10 18/`.

- `current-projects.json` adds reviewed public projects and overrides matching archive titles without changing their URLs.
- `current-resume.json` supplies the concise web resume and plain-text download.
- `public/Resume.pdf` is the board's general `job-search/dheeraj-resume.pdf`, rather than a role-specific research resume.
- `projects.json`, `portfolio.json`, and `source/` retain the original extracted archive. The original importer preserves current overlays and resume downloads when `current-resume.json` exists.

Five implementation links point to PR #1 because the October review found README-only default branches. These are a dated snapshot, not a live GitHub status feed. Kernelbench's GPU validation and the research projects' pretrained-model results remain pending in the source review.

Private projects, application records, outreach, contacts, and administrative memory are excluded. Supporting registries/docs/sites and the README-only indic-voice-agent and LICENSE-only SLA are not presented as separate implemented projects.

To update the plain-text download after editing the web resume:

```powershell
node scripts/export-resume.mjs
```

No temporary files or services are created by this command.
