'use client'

import Link from 'next/link'
import Image from 'next/image';
import { type BlogPost } from '../../_types/blog'

interface IFeaturedPostCardItemProp {
  post: BlogPost,
}

export default function FeaturedPostCardItem({ post }: IFeaturedPostCardItemProp) {
  const { slug, category, date, title, image, description, readingTime } = post;
  return (
    <Link
      href={`/blog/${slug}`}
      className="lg:col-span-8 border-b-4 lg:border-b-0 lg:border-r-4 border-on-surface group cursor-pointer hover:bg-surface-variant transition-colors flex flex-col justify-between"
    >
      <div className="p-8 md:p-12 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className="label-caps text-xs text-primary font-bold">
              {category} // {date}
            </span>
            <div className="h-px grow bg-on-surface opacity-20"></div>
          </div>

          <h2 className="headline-lg text-3xl md:text-5xl uppercase mb-6 group-hover:text-primary transition-colors">
            {title}
          </h2>

          {image && (
            <div className="relative w-full aspect-video border-4 border-on-surface mb-8 overflow-hidden bg-white">
              <Image
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                src={image || ""}
                alt={title}
                height={708}
                width={395}
              />
            </div>
          )}

          <p className="body-lg text-on-surface-variant mb-8 line-clamp-3">
            {description}
          </p>
        </div>

        <div className="flex justify-between items-center mt-auto">
          { readingTime && (
            <span className="label-caps text-xs bg-on-surface text-surface px-4 py-1.5 font-bold">
              READING TIME: {readingTime}
            </span>
          ) }
          <div className="w-12 h-12 border-4 border-on-surface flex items-center justify-center bg-surface group-hover:bg-primary group-hover:text-white transition-colors">
            <span className="font-bold text-xl">→</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
