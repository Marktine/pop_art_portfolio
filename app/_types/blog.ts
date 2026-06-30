export enum BlogPriority {
  NORMAL="NORMAL",
  SIDEBAR="SIDEBAR",
  FEATURED="FEATURED",
}
export type BlogPost = {
  id?: string;
  slug: string;
  date: string;
  tags?: string;
  title: string;
  image?: string;
  author?: string;
  category: string;
  description?: string;
  readingTime?: string;
  contentHTML?: string;
  priority?: BlogPriority;
  customVisual?: React.ReactNode;
}

export type BlogPostMetaData = Omit<BlogPost, 'customVisual' | 'contentHTML'>

