<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Blog & Content Guidelines

When writing or editing blog posts, social posts (LinkedIn, Twitter), or documentation for this repo, strictly adhere to the following voice and principles:

### 1. Persona & Tone (Junior / Intern Perspective)
- **Authentic & Relatable**: Write from the perspective of a fresher / junior engineer learning by doing. Never pretend to be a senior architect or seasoned tech lead.
- **No Corporate Melodrama**: Avoid cringe tropes ("Slack chimes at 2 AM", "Production down", "The Death of X", "High-ROI workflows"). Ground scenarios in everyday dev life: testing a teammate's PR, fixing a small bug while mid-feature with uncommitted debug logs, local build caching issues.
- **Low Ego**: Be humble, curious, and straightforward. Don't write like a tech influencer or genius. If something caught you off guard, say so.

### 2. Structure & Technical Depth
- **Point-to-Point & Actionable**: Skip long fluff introductions. Explain the problem in 2 sentences, then show the solution with concrete commands.
- **Always Include Cleanup**: Never leave the reader stranded after spinning something up. Always document the cleanup and teardown steps (e.g., `git worktree remove`, branch deletion, pruning).
- **Surface Practical Gotchas**: Mention the real stumbling blocks that tutorials skip (e.g., `.env` files not being copied, disk usage with multiple `node_modules`, lock constraints).
- **Nuanced, Not Dogmatic**: Don't declare tools "dead" or "useless". Always state where the older/simpler alternative is still better (e.g., `git stash` is still king for a 10-second check).

### 3. Formatting
- Clean Markdown with tight headings (`h2`, `h3`).
- Code blocks with language tags, kept clean and minimal.
- Use bullet points and numbered steps for commands instead of dense paragraphs.

