# Adding project images and artwork

## Projects

1. Put the image in `public/images/projects/`.
2. Find its slug in `content/project-media.json` and set `src` and `alt`:

```json
"ted": {
  "src": "/images/projects/ted.webp",
  "alt": "The ted editor showing its workspace",
  "period": null
}
```

`period` is optional, for a label such as a year or season. When it is empty,
the caption shows the project's first two technologies. One image is shared by
the project strip and its detail page. The strip uses a 3:2 crop.

## Gallery

1. Put artwork files in `public/images/gallery/`.
2. Edit the entries in `content/gallery.json`: replace `src: null` with the local
   image path, set the title and descriptive `alt`, and enter the image's pixel
   `width` and `height` so its proportions stay correct.
3. Add `dimensions`, `year`, and `notes` when useful. Leave them empty when they
   do not apply. Remove unused entries or add more; the staggered arrangement
   repeats every seven works.

The `instagram` field is optional. Set it to your profile URL to show the link.
Until an image is set, its position displays a neutral placeholder.

## Preview and cleanup

```bash
npm run dev
```

Check `/projects`, an individual project, and `/gallery`. Stop the preview with
`Ctrl+C`. When replacing an image, update its content entry first; remove the
old file only after confirming that no entries still refer to it. Reimporting
the text archive does not overwrite these media settings.
