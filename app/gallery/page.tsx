import data from "@/content/gallery.json";
import { ArtGallery } from "@/components/art-gallery";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Gallery",
  "A space for Dheeraj's sketches, studies, and artwork.",
  "/gallery",
);
export default function GalleryPage() {
  return (
    <main id="main-content" className="gallery-page">
      <header className="gallery-heading">
        <div>
          <h1 className="sr-only">Gallery</h1>
          <p className="gallery-intro">{data.intro}</p>
          <p className="gallery-description">{data.description}</p>
        </div>
        {data.instagram && (
          <a
            href={data.instagram}
            className="gallery-social"
            target="_blank"
            rel="noopener noreferrer"
          >
            instagram
          </a>
        )}
      </header>
      <ArtGallery works={data.works} />
    </main>
  );
}
