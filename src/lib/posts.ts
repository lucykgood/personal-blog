// lib/posts.ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDir = path.join(process.cwd(), "src", "content", "posts");

export function getAllSlugs() {
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export async function getPost(slug: string) {
  const file = fs.readFileSync(path.join(postsDir, `${slug}.md`), "utf8");
  const { content, data } = matter(file);
  const processed = await remark().use(html).process(content);
  return {
    slug,
    meta: data as { title: string; date?: string },
    html: processed.toString(),
  };
}

export async function getAllPosts() {
  const slugs = getAllSlugs();
  const posts = await Promise.all(slugs.map(getPost));
  return posts.sort((a, b) =>
    (b.meta.date ?? "").localeCompare(a.meta.date ?? "")
  );
}
