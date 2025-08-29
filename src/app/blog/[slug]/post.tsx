// app/blog/[slug]/page.tsx
import { getAllSlugs, getPost } from "@/lib/posts";
import { notFound } from "next/navigation";

export const dynamic = "force-static";
export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug).catch(() => null);
  if (!post) return notFound();
  return (
    <main className="max-w-prose mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{post.meta.title}</h1>
      {post.meta.date ? (
        <div className="opacity-70 mb-6">{post.meta.date}</div>
      ) : null}
      <article dangerouslySetInnerHTML={{ __html: post.html }} />
    </main>
  );
}
