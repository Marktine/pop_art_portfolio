'use client'

import Link from "next/link"
import Image from 'next/image'
import { BlogPost } from '../../_types/blog'

interface ISidebarBlogPostItemProp {
  post: BlogPost,
}

export default function SidebarBlogPostItem({ post }: ISidebarBlogPostItemProp) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`flex-1 p-8 group cursor-pointer hover:bg-surface-container transition-colors flex flex-col justify-between`}
    >
      <div>
        <span className="label-caps text-xs text-on-surface-variant block mb-4">
          {post.date} // {post.category}
        </span>
        <h3 className="headline-md text-2xl uppercase mb-4 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <p className="body-md text-on-surface-variant mb-6 line-clamp-2">
          {post.description}
        </p>

        {post.image && (
          <div className="w-full h-40 border-4 border-on-surface mb-4 overflow-hidden bg-white">
            <Image
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              src={post.image}
              alt={post.title}
              width={338}
              height={155}
            />
          </div>
        )}
      </div>

      {!post.image && (
        <div className="flex items-center gap-2 mt-auto">
          <div className="w-3 h-3 bg-primary" />
          <span className="label-caps text-xs font-bold">CONTINUE READING</span>
        </div>
      )}
    </Link>
  );
}
