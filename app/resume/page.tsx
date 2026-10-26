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
      <PageHeading title="Resume" description="Dheeraj C. · Bengaluru, India">
        <div className="heading-links">
          <a className="text-link" href="/Resume.pdf" download>
            download pdf ↓
          </a>
          <a className="small-link" href="mailto:hello@tomlin7.com">
            hello@tomlin7.com ↗
          </a>
        </div>
      </PageHeading>
      {data.resume.map((section) => (
        <details
          className="resume-section resume-disclosure"
          id={section.heading.replaceAll(" ", "-")}
          key={section.heading}
          data-koi-avoid
        >
          <summary>
            <h2>{section.heading}</h2>
          </summary>
          <div className="resume-text">
            {section.content.split(/\n\n+/).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </details>
      ))}
      <p className="margin-note">
        <a className="text-link" href="/resume.txt">
          plain text ↗
        </a>
      </p>
      <PageFooter />
    </main>
  );
}
