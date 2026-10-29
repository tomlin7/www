import { PageHeading } from "@/components/page-heading";
import { PageFooter } from "@/components/page-footer";
import { pageMetadata } from "@/lib/site";
import Link from "next/link";
import { projects } from "@/lib/projects";

export const metadata = pageMetadata(
  "Open source",
  "Biscuit, Hiroshi, systems tools, research experiments, and open-source contributions.",
  "/oss",
);
const contributions = [
  {
    name: "Zulip",
    href: "https://github.com/search?q=author%3Atomlin7+org%3Azulip+type%3Apr&type=pullrequests",
  },
  {
    name: "prometheus-operator",
    href: "https://github.com/search?q=author%3Atomlin7+repo%3Aprometheus-operator%2Fprometheus-operator+type%3Apr&type=pullrequests",
  },
  {
    name: "KubeVirt",
    href: "https://github.com/search?q=author%3Atomlin7+org%3Akubevirt+type%3Apr&type=pullrequests",
  },
];

export default function OssPage() {
  return (
    <main id="main-content" className="reading-page">
      <PageHeading title="Open source" />
      <section className="content-section" data-koi-avoid>
        <h2 className="section-label">maintaining</h2>
        <article className="open-project">
          <div className="row-heading">
            <h3>
              <a
                href="https://github.com/tomlin7/biscuit"
                target="_blank"
                rel="noopener noreferrer"
              >
                biscuit <span className="external-arrow">↗</span>
              </a>
            </h3>
            <span className="row-category">python / tree-sitter</span>
          </div>
          <p className="row-description">Native code editor with AI agents.</p>
          <a
            className="install-command"
            href="https://pypi.org/project/biscuit-editor/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span aria-hidden="true">$ </span>pip install biscuit-editor{" "}
            <span aria-hidden="true">↗</span>
          </a>
        </article>
        <article className="open-project">
          <div className="row-heading">
            <h3>
              <a
                href="https://github.com/tomlin7/cupcake"
                target="_blank"
                rel="noopener noreferrer"
              >
                cupcake <span className="external-arrow">↗</span>
              </a>
            </h3>
            <span className="row-category">python / tkinter</span>
          </div>
          <p className="row-description">Embeddable code editor for Tkinter.</p>
          <a
            className="install-command"
            href="https://pypi.org/project/cupcake-editor/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span aria-hidden="true">$ </span>pip install cupcake-editor{" "}
            <span aria-hidden="true">↗</span>
          </a>
        </article>
      </section>
      <section className="content-section" data-koi-avoid>
        <h2 className="section-label">systems & tools</h2>
        <div className="contribution-list">
          {projects
            .filter((project) =>
              [
                "hiroshi-os",
                "hookrelay",
                "quorumkv",
                "lsmstore",
                "toollearn",
                "toolrecover",
                "kernelbench",
              ].includes(project.slug),
            )
            .map((project) => (
              <Link
                className="contribution-row"
                key={project.slug}
                href={`/projects/${project.slug}`}
              >
                <span>
                  <strong>{project.title}</strong>
                </span>
                <span className="external-arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
            ))}
        </div>
        <p className="margin-note">
          <Link className="text-link" href="/projects">
            all projects ↗
          </Link>
        </p>
      </section>
      <section className="content-section" data-koi-avoid>
        <h2 className="section-label">contributions</h2>
        <div className="contribution-list">
          {contributions.map((item) => (
            <a
              className="contribution-row"
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                <strong>{item.name}</strong>
              </span>
              <span className="external-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
        </div>
      </section>
      <PageFooter />
    </main>
  );
}
