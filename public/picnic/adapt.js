// Add the personal GitHub sticker without changing the reference's other artwork.
(() => {
  Print.CONTACT_DIMS.github = [0.76, 0.76];
  const original = Print.contactSticker;
  Print.contactSticker = (id, size) => {
    if (id !== "github") return original(id, size);
    const width = size * 0.76;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = Math.round(width * 3);
    const context = canvas.getContext("2d");
    context.scale(3, 3);
    context.fillStyle = "#fff9e8";
    context.beginPath();
    context.arc(width / 2, width / 2, width / 2, 0, Math.PI * 2);
    context.fill();
    context.save();
    context.translate(width * 0.13, width * 0.13);
    context.scale((width * 0.74) / 24, (width * 0.74) / 24);
    context.fillStyle = "#252321";
    context.fill(
      new Path2D(
        "M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.31-1.25-1.66-1.25-1.66-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1.01 1.72 2.64 1.22 3.28.93.1-.73.4-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.57 0-1.23.44-2.23 1.16-3.01-.12-.28-.5-1.43.11-2.97 0 0 .95-.3 3.08 1.15a10.7 10.7 0 0 1 5.6 0c2.13-1.44 3.07-1.15 3.07-1.15.61 1.54.23 2.69.11 2.97.72.78 1.16 1.78 1.16 3.01 0 4.33-2.63 5.28-5.14 5.56.41.35.77 1.03.77 2.08v3.12c0 .3.2.65.78.54A11.2 11.2 0 0 0 12 .8Z",
      ),
    );
    context.restore();
    return { canvas, w: width, h: width };
  };
})();
