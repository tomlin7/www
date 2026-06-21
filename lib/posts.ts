import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/blog");

export interface PostData {
  slug: string;
  title: string;
  date: string;
  category: string;
  readTime: string;
  description: string;
  image?: string;
  mediumLink?: string;
  content?: string;
}

export function getSortedPostsData(): PostData[] {
  // Ensure directory exists
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const matterResult = matter(fileContents);

      return {
        slug,
        title: matterResult.data.title || slug,
        date: matterResult.data.date || "",
        category: matterResult.data.category || "Article",
        readTime: matterResult.data.readTime || "5 min read",
        description: matterResult.data.description || "",
        image: matterResult.data.image,
        mediumLink: matterResult.data.mediumLink,
      } as PostData;
    });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostData(slug: string): Promise<PostData> {
  // Try .mdx first, then fallback to .md
  let fileName = `${slug}.mdx`;
  let fullPath = path.join(postsDirectory, fileName);
  if (!fs.existsSync(fullPath)) {
    fileName = `${slug}.md`;
    fullPath = path.join(postsDirectory, fileName);
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  return {
    slug,
    content: matterResult.content,
    title: matterResult.data.title || slug,
    date: matterResult.data.date || "",
    category: matterResult.data.category || "Article",
    readTime: matterResult.data.readTime || "5 min read",
    description: matterResult.data.description || "",
    image: matterResult.data.image,
    mediumLink: matterResult.data.mediumLink,
  };
}
