'use client'

interface IBlogTagsProps {
  tags: string,
}

export default function BlogTags({ tags }: IBlogTagsProps) {
  const tagsList = tags ? tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [];
  return tagsList.length > 0 && (
      <div className="flex flex-wrap gap-1.5">
        {tagsList.map((tag: string) => (
          <span
            key={tag}
            className="font-mono text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 border border-on-surface/20 bg-surface-container-low text-on-surface-variant"
          >
            #{tag}
          </span>
        ))}
      </div>
  );
}
