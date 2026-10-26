import { socialImage } from "@/lib/social-image";
import { siteDescription } from "@/lib/site";

export const runtime = "edge";
export function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  return socialImage(
    (params.get("title") || "Dheeraj (tomlin7)").slice(0, 140),
    (params.get("description") || params.get("desc") || siteDescription).slice(
      0,
      240,
    ),
  );
}
