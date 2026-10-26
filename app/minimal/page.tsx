import Link from "next/link";
import { socials } from "@/lib/site";

export default function HomePage() {
  return (
    <main className="home-content" id="main-content">
      <blockquote className="pond-quote" data-koi-avoid>
        in an ocean of gluttony,
        <br />
        cast a fine net
      </blockquote>
      <div className="introduction" data-koi-avoid>
        <h1>Hey, I&apos;m Dheeraj.</h1>
        <p>
          Systems &amp; Software Engineer, building devtools and things close to
          the metal.
        </p>
        <p>
          Previously, interning at{" "}
          <Link href="/resume#professional-experience">Hooman Digital</Link> and{" "}
          <Link href="/resume#professional-experience">OZI</Link>, researching
          at <Link href="/resume#research-experience">NIT Calicut</Link>.
        </p>
        <p>
          Currently, working on <Link href="/projects#biscuit">biscuit</Link>,{" "}
          <Link href="/projects#ted">ted</Link>, and following my curiosity.
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
