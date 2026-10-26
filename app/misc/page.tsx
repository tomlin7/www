import data from "@/content/portfolio.json";
import { PageHeading } from "@/components/page-heading";
import { PageFooter } from "@/components/page-footer";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Misc", "Tools and music.", "/misc");

export default function MiscPage() {
  return (
    <main id="main-content" className="reading-page">
      <PageHeading title="Misc" />
      <section className="content-section" data-koi-avoid>
        <h2 className="section-label">tools</h2>
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
        <h2 className="section-label">playlist</h2>
        <div className="track-list">
          {data.tracks.slice(0, 6).map((track, index) => (
            <Track key={track.title} track={track} index={index} />
          ))}
          <details className="more-tracks">
            <summary>{data.tracks.length - 6} more</summary>
            {data.tracks.slice(6).map((track, index) => (
              <Track key={track.title} track={track} index={index + 6} />
            ))}
          </details>
        </div>
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
