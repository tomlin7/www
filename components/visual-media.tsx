import Image from "next/image";

export function VisualMedia({
  src,
  alt,
  label = "image to come",
  sizes = "80vw",
}: {
  src: string | null;
  alt: string;
  label?: string;
  sizes?: string;
}) {
  if (src)
    return (
      <Image src={src} alt={alt} fill sizes={sizes} className="visual-image" />
    );
  return (
    <span className="visual-placeholder" role="img" aria-label={alt}>
      <span className="placeholder-cross" aria-hidden="true">
        <i />
        <i />
      </span>
      <span className="placeholder-label" aria-hidden="true">
        {label}
      </span>
      <span className="placeholder-corner corner-tl" aria-hidden="true" />
      <span className="placeholder-corner corner-br" aria-hidden="true" />
    </span>
  );
}
