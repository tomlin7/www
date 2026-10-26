import { PicnicHome } from "@/components/picnic-home";

export default function HomePage() {
  return (
    <>
      <PicnicHome />
      <div className="sr-only">
        <h1>Dheeraj C. — Systems &amp; Software Engineer</h1>
        <p>Projects, open-source work, and engineering notes.</p>
        <a href="/projects">Projects</a>
        <a href="/oss">Open source</a>
        <a href="/blog">Blog</a>
        <a href="/resume">Resume</a>
        <a href="/minimal">Minimal portfolio</a>
      </div>
    </>
  );
}
