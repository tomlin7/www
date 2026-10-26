import { socialImage } from "@/lib/social-image";
import { siteDescription } from "@/lib/site";

export const runtime = "edge";

export const alt = "Dheeraj (tomlin7)";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return socialImage("Dheeraj (tomlin7)", siteDescription);
}
