import Link from "next/link";
import { socials } from "@/lib/site";

export function PageFooter() {
  return (
    <footer className="page-footer" data-koi-avoid>
      <Link href="/">← back to the pond</Link>
      <div className="footer-socials">
        {socials.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("https") ? "_blank" : undefined}
            rel="noopener noreferrer"
          >
            {label}
          </a>
        ))}
      </div>
      <span className="copyright">© {new Date().getFullYear()} Dheeraj</span>
    </footer>
  );
}
