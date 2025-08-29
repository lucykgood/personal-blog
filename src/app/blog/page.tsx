// app/blog/page.tsx
import Link from "next/link";
import { getAllPosts, getAllSlugs } from "@/lib/posts";

export const dynamic = "force-static"; // ensure static output

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function BlogIndex() {
  const posts = await getAllPosts();
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <ul className="space-y-3">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link className="underline" href={`/blog/${p.slug}`}>
              {p.meta.title}
            </Link>
            {p.meta.date ? (
              <div className="text-sm opacity-70">
                {new Date(p.meta.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </main>
  );
}
