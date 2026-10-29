import Link from "next/link";
import { socials } from "@/lib/site";

export default function HomePage() {
  return (
    <main className="home-content" id="main-content">
      <div className="introduction" data-koi-avoid>
        <h1>Hey, I&apos;m Dheeraj.</h1>
        <p>Systems &amp; Software Engineer.</p>
        <p>
          At <Link href="/resume#professional-experience">Valura.Ai</Link>.
          Previously <Link href="/resume#professional-experience">OZI</Link> and{" "}
          <Link href="/resume#research-experience">NIT Calicut</Link>.
        </p>
        <p>
          Building <Link href="/projects/hiroshi-os">Hiroshi</Link> and{" "}
          <Link href="/projects/biscuit">biscuit</Link>.
        </p>
        <div className="social-links">
          {socials.map(({ label, href }, i) => (
            <span key={label}>
              {i > 0 && <span className="link-divider"> / </span>}
              <a
                href={href}
                target={href.startsWith("https") ? "_blank" : undefined}
                rel="noopener noreferrer"
              >
                {label}
              </a>
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
