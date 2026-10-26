import data from "@/content/portfolio.json";
import { PageHeading } from "@/components/page-heading";
import { PageFooter } from "@/components/page-footer";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Misc",
  "A few interests, technologies I'm exploring, and a nostalgic soundtrack.",
  "/misc",
);

export default function MiscPage() {
  return (
    <main id="main-content" className="reading-page">
      <PageHeading
        index="04"
        title="Around the edges."
        description="The tools, side interests, and background music that don't quite fit anywhere else."
      />
      <section className="content-section" data-koi-avoid>
        <h2 className="section-label">things i keep coming back to</h2>
        <p className="section-intro">
          How editors understand code. How a compiler turns text into
          instructions. How a few rendering primitives become something you can
          interact with.
        </p>
        <p className="row-description">
          Most of my projects start with wanting to understand one small part of
          that.
        </p>
      </section>
      <section className="content-section" data-koi-avoid>
        <h2 className="section-label">the toolbox</h2>
        <div className="skills-list">
          {data.skills.map((skill) => (
            <details key={skill.name}>
              <summary>{skill.name.toLowerCase()}</summary>
              <ul className="plain-list">
                {skill.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </section>
      <section className="content-section" data-koi-avoid>
        <h2 className="section-label">a nostalgic soundtrack</h2>
        <p className="section-intro">
          The playlist from the old iPod, kept as a list. Pick something and let
          it play.
        </p>
        <div className="track-list">
          {data.tracks.slice(0, 6).map((track, index) => (
            <Track key={track.title} track={track} index={index} />
          ))}
          <details className="more-tracks">
            <summary>the other {data.tracks.length - 6} tracks</summary>
            {data.tracks.slice(6).map((track, index) => (
              <Track key={track.title} track={track} index={index + 6} />
            ))}
          </details>
        </div>
      </section>
      <section className="content-section colophon" data-koi-avoid>
        <h2 className="section-label">about this little pond</h2>
        <p className="row-description">
          A koi simulation rendered into a grid of ASCII characters. Move your
          pointer to get their attention; click the water to drop a little food.
        </p>
        <p className="row-description">
          The pond and visual direction come from{" "}
          <a
            className="text-link"
            href="https://www.daoho.dev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dao Ho&apos;s site ↗
          </a>
          . Built here with Next.js, React, and a 2D canvas. The fish rest when
          reduced motion is enabled.
        </p>
      </section>
      <PageFooter />
    </main>
  );
}

function Track({
  track,
  index,
}: {
  track: (typeof data.tracks)[number];
  index: number;
}) {
  return (
    <a
      className="track-row"
      href={track.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="row-index">{String(index + 1).padStart(2, "0")}</span>
      <span>
        <strong>{track.title}</strong>
        <span className="track-artist">{track.artist}</span>
      </span>
      <span className="track-duration">{track.duration} ↗</span>
    </a>
  );
}
