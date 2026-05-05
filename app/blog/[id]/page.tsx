import React from "react";
import { blogPosts } from "../data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Image from "next/image";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === parseInt(id));

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <Link
        href="/blog"
        className="flex items-center text-primary mb-8 hover:opacity-80 transition-opacity w-fit"
      >
        <MdArrowBack className="mr-2" size={20} />
        Back to Academy
      </Link>

      <div className="rounded-2xl overflow-hidden mb-8 shadow-sm">
        <Image
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-64 md:h-96 object-cover"
        />
      </div>

      <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
        {post.title}
      </h1>

      <div className="flex items-center space-x-3 text-default-500 mb-10 pb-6 border-b border-divider">
        <span className="font-medium text-default-600">{post.author}</span>
        <span>•</span>
        <span>{post.date}</span>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        {post.content.split("\n\n").map((paragraph, idx) => (
          <p
            key={idx}
            className="mb-6 text-default-700 leading-relaxed text-lg"
          >
            {paragraph}
          </p>
        ))}
      </div>

      {post.id < blogPosts.length && (
        <div className="mt-16 pt-8 border-t border-divider flex justify-between items-center">
          <span className="text-default-500">Ready for the next step?</span>
          <Link
            href={`/blog/${post.id + 1}`}
            className="text-primary font-semibold hover:underline"
          >
            Read Part {post.id + 1} →
          </Link>
        </div>
      )}
    </div>
  );
}
