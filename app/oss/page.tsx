import { PageHeading } from "@/components/page-heading";
import { PageFooter } from "@/components/page-footer";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Open source",
  "Biscuit, published Python packages, and contributions to Zulip, prometheus-operator, and KubeVirt.",
  "/oss",
);
const contributions = [
  {
    name: "Zulip",
    description: "A threaded, open-source team chat.",
    href: "https://github.com/search?q=author%3Atomlin7+org%3Azulip+type%3Apr&type=pullrequests",
  },
  {
    name: "prometheus-operator",
    description: "Running Prometheus on Kubernetes.",
    href: "https://github.com/search?q=author%3Atomlin7+repo%3Aprometheus-operator%2Fprometheus-operator+type%3Apr&type=pullrequests",
  },
  {
    name: "KubeVirt",
    description: "Virtual machines alongside Kubernetes workloads.",
    href: "https://github.com/search?q=author%3Atomlin7+org%3Akubevirt+type%3Apr&type=pullrequests",
  },
];

export default function OssPage() {
  return (
    <main id="main-content" className="reading-page">
      <PageHeading
        index="02"
        title="Built in the open."
        description="Maintaining my own tools and finding my way around other people's codebases."
      />
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
          <p className="row-description">
            A fast, extensible native code editor with integrated AI agents. A
            small footprint, language tooling, and room to make it your own.
          </p>
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
          <p className="row-description">
            An embeddable code editor widget for Tkinter, with support for 500+
            languages, a canvas minimap, and Git diffs.
          </p>
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
        <h2 className="section-label">contributing upstream</h2>
        <p className="section-intro">
          A few places I&apos;ve contributed. The links go to my authored pull
          requests.
        </p>
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
                <span className="row-description">{item.description}</span>
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
