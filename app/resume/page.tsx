import data from "@/content/portfolio.json";
import { PageHeading } from "@/components/page-heading";
import { PageFooter } from "@/components/page-footer";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Resume",
  "Dheeraj C. — experience, education, systems projects, research, and technical skills.",
  "/resume",
);

export default function ResumePage() {
  return (
    <main id="main-content" className="reading-page">
      <PageHeading
        index="05"
        title="A little background."
        description="Dheeraj C. / Systems & Software Engineer / Bengaluru, India"
      >
        <div className="heading-links">
          <a className="text-link" href="/Resume.pdf" download>
            download resume.pdf ↓
          </a>
          <a className="small-link" href="mailto:hello@tomlin7.com">
            hello@tomlin7.com ↗
          </a>
        </div>
      </PageHeading>
      {data.resume.map((section) => (
        <section
          className="resume-section"
          id={section.heading.replaceAll(" ", "-")}
          key={section.heading}
          data-koi-avoid
        >
          <h2 className="section-label">{section.heading}</h2>
          <div className="resume-text">
            {section.content.split(/\n\n+/).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>
      ))}
      <p className="margin-note">
        <a className="text-link" href="/resume.txt">
          plain text version ↗
        </a>
      </p>
      <PageFooter />
    </main>
  );
}
