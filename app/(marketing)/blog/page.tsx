import Link from "next/link";
import { blogPosts } from "./data";
import Image from "next/image";

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <div className="flex flex-col items-center justify-center space-y-4 mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Equits Academy
        </h1>
        <p className="text-lg text-default-500 max-w-2xl">
          From zero background to launching your MVP and raising funds. Follow
          our step-by-step guide to building a successful startup.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Link
            href={`/blog/${post.id}`}
            key={post.id}
            className="flex flex-col bg-content1 rounded-2xl shadow-sm border border-divider overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <Image
              src={post.imageUrl}
              alt={post.title}
              width={500}
              height={300}
              className="w-full h-48 object-cover border-b border-divider"
            />
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center justify-between text-small text-default-400 mb-3">
                <span>{post.date}</span>
                <span>{post.author}</span>
              </div>
              <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                {post.title}
              </h2>
              <p className="text-default-500 line-clamp-3 mb-4 flex-grow">
                {post.excerpt}
              </p>
              <span className="text-primary font-medium flex items-center w-fit">
                Read Article
                <span className="ml-1">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
