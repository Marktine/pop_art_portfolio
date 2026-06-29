export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  image?: string;
  author: string;
  description?: string;
  readingTime?: string;
  contentHTML: string;
  customVisual?: React.ReactNode;
}
