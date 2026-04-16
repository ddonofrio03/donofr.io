import Link from "next/link";
import { getSortedPostsMetadata } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thoughts — DONOFR.IO",
  description: "Perspectives on AI, marketing, sales, and public affairs from the D'Onofrio family.",
};

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function ThoughtsPage() {
  const posts = getSortedPostsMetadata();

  return (
    <main>
      <div className="thoughts-hero">
        <div className="section-inner">
          <div className="section-label">From the team</div>
          <h1>Thoughts</h1>
        </div>
      </div>

      <div className="thoughts-list">
        <div className="section-inner">
          {posts.length === 0 ? (
            <p style={{ color: "var(--gray)", paddingTop: "2rem" }}>
              No posts yet. Add <code>.md</code> files to the <code>/posts</code> folder to get started.
            </p>
          ) : (
            posts.map((post) => (
              <Link href={`/thoughts/${post.slug}`} key={post.slug} className="post-list-item" style={{ display: "grid" }}>
                <div className="post-list-date">{formatDate(post.date)}</div>
                <div>
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="post-tags">
                      {post.tags.map((tag) => (
                        <span key={tag} className="post-tag">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
