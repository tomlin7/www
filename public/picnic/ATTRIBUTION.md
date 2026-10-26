# Picnic scene

The WebGL picnic, paper rendering, cloth shaders, props, foliage, butterflies,
painting tools, ambient sound, and hero media are adapted from the public client
of [aarya.wtf](https://aarya.wtf/), by Aarya Shah, inspected on 27 October 2026.
The reference hero video and scenic photos remain reference artwork in this
experimental branch.

The postcard copy, project letters, generated postage stamps, tool stickers,
and contact destinations use Dheeraj's existing content archive. The reference's
analytics and email collection service are removed. The message form opens a
local email draft instead of submitting to a backend.

The scene runs in an isolated document at `/picnic/index.html`; React owns the
surrounding portfolio and the other routes. Removing the frame disposes its
animation and event listeners with its document.

Refresh the personalized assets after editing the archive:

```bash
npm run picnic:content
npm run dev
```

Stop the preview with `Ctrl+C`. This experiment lives on `codex/aarya-clone`;
use `git switch main` to return to the ASCII portfolio after committing changes.
