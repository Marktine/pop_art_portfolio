'use client'

import Link from "next/link"
import Image from 'next/image';
import { type BlogPostMetaData } from '../../_types/blog';
import BlogTags from "./BlogTags";

interface ISecondaryGridPostItemProp {
  post: BlogPostMetaData,
  shadowEffect?: boolean,
  dotPatternBackground?: boolean,
  customVisual?: React.ReactNode,
}

export default function SecondaryGridPostItem({
  post,
  shadowEffect,
  dotPatternBackground,
  customVisual = <></>,
}: ISecondaryGridPostItemProp) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`p-8 group cursor-pointer hover:bg-surface-container transition-colors relative flex flex-col justify-between border-b-4 lg:border-b-0 border-on-surface`}
    >
      {/* For background benday dot pattern on Post 6 (last post) */}
      {dotPatternBackground && (
        <div className="absolute inset-0 benday-dots-dark opacity-5 pointer-events-none" />
      )}

      <div className="relative z-10">
        {/* Visual Element (Image or Custom Visual) */}
        {post.image ? (
          <div className="mb-6 relative">
            {/* Offset background shadow effect for Post 4 */}
            {shadowEffect && (
              <div className="absolute -top-2 -left-2 w-full h-full bg-primary -z-10 transition-transform group-hover:translate-x-1 group-hover:translate-y-1"></div>
            )}
            <Image
              className="w-full aspect-square object-cover border-4 border-on-surface bg-white"
              src={post.image}
              alt={post.title}
              width={334}
              height={334}
            />
          </div>
        ) : customVisual}

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="label-caps text-xs text-on-surface-variant font-mono">
            {post.date}
          </span>
          <BlogTags tags={post.tags ? post.tags : ""} />
        </div>
        <h3 className="headline-md text-2xl uppercase mb-4 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <p className="body-md text-on-surface-variant mb-6">
          {post.description}
        </p>
      </div>
    </Link>
  );
}
