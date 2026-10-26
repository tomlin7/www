import Link from "next/link";
import { socials } from "@/lib/site";

export default function HomePage() {
  return (
    <main className="home-content" id="main-content">
      <div className="introduction" data-koi-avoid>
        <h1>Hey, I&apos;m Dheeraj.</h1>
        <p>Systems &amp; Software Engineer.</p>
        <p>
          Previously at{" "}
          <Link href="/resume#professional-experience">Hooman Digital</Link>,{" "}
          <Link href="/resume#professional-experience">OZI</Link>, and{" "}
          <Link href="/resume#research-experience">NIT Calicut</Link>.
        </p>
        <p>
          Building <Link href="/projects#biscuit">biscuit</Link> and{" "}
          <Link href="/projects#ted">ted</Link>.
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
